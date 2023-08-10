# Import the needed credential and management objects from the libraries.
import sys
from azure.identity import ClientSecretCredential
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.resource import ResourceManagementClient

azure_images={
    "Ubuntu Server 20.04 LTS - Gen2" : {
        "publisher": "canonical",
        "offer": "0001-com-ubuntu-server-focal",
        "sku": "20_04-lts-gen2",
        "version": "latest",
    },
    "Ubuntu Server 16.04 LTS" : {
        "publisher": "canonical",
        "offer": "0001-com-ubuntu-server-focal",
        "sku": "20_04-lts-gen2",
        "version": "latest",
    },
    "Windows Server 2019 Datacenter - x64 Gen2" : {
        "publisher": "MicrosoftWindowsServer",
        "offer": "WindowsServer",
        "sku": "2019-datacenter-gensecond",
        "version": "latest",
    }
}


client_secret = sys.argv[1]
subscription_id = sys.argv[2]
tenant_id = sys.argv[3]
client_id = sys.argv[4]
nameVM = sys.argv[5].replace(" ","-")
vmSize = sys.argv[6]
region = sys.argv[7]
image = sys.argv[8]


credential = ClientSecretCredential(tenant_id, client_id, client_secret)

resource_client = ResourceManagementClient(credential, subscription_id)
network_client = NetworkManagementClient(credential, subscription_id)
compute_client = ComputeManagementClient(credential, subscription_id)


RESOURCE_GROUP_NAME = "MultiCloudPlatform_"+region
LOCATION = region

rg_result = resource_client.resource_groups.create_or_update(
    RESOURCE_GROUP_NAME, {"location": LOCATION}
)

VNET_NAME = nameVM+"-vnet"
SUBNET_NAME = nameVM+"-subnet"
IP_NAME = nameVM+"-ip"
IP_CONFIG_NAME = nameVM+"-ip-config"
NIC_NAME = nameVM+"-nic"

try:
    poller = network_client.virtual_networks.get(
        RESOURCE_GROUP_NAME,
        VNET_NAME,
    )
    vnet_result = poller

    print("Error: Ya existe una máquina con ese nombre")
    exit(0)
except Exception as error:
    poller = network_client.virtual_networks.begin_create_or_update(
        RESOURCE_GROUP_NAME,
        VNET_NAME,
        {
            "location": LOCATION,
            "address_space": {"address_prefixes": ["10.0.0.0/16"]},
        }
    )
    vnet_result = poller.result()

poller = network_client.subnets.begin_create_or_update(
    RESOURCE_GROUP_NAME,
    VNET_NAME,
    SUBNET_NAME,
    {"address_prefix": "10.0.0.0/24"},
)
subnet_result = poller.result()

poller = network_client.public_ip_addresses.begin_create_or_update(
    RESOURCE_GROUP_NAME,
    IP_NAME,
    {
        "location": LOCATION,
        "sku": {"name": "Standard"},
        "public_ip_allocation_method": "Static",
        "public_ip_address_version": "IPV4",
    },
)
ip_address_result = poller.result()

poller = network_client.network_interfaces.begin_create_or_update(
    RESOURCE_GROUP_NAME,
    NIC_NAME,
    {
        "location": LOCATION,
        "ip_configurations": [
            {
                "name": IP_CONFIG_NAME,
                "subnet": {"id": subnet_result.id},
                "public_ip_address": {"id": ip_address_result.id},
            }
        ],
    },
)
nic_result = poller.result()

VM_NAME = nameVM
USERNAME = "multicloud"
PASSWORD = client_secret

poller = compute_client.virtual_machines.begin_create_or_update(
    RESOURCE_GROUP_NAME,
    VM_NAME,
    {
        "location": LOCATION,
        "storage_profile": {
            "image_reference": {
                "publisher": azure_images[image]['publisher'],
                "offer": azure_images[image]['offer'],
                "sku": azure_images[image]['sku'],
                "version": "latest",
            }
        },
        "hardware_profile": {"vm_size": vmSize},
        "os_profile": {
            "computer_name": VM_NAME,
            "admin_username": USERNAME,
            "admin_password": PASSWORD,
        },
        "network_profile": {
            "network_interfaces": [
                {
                    "id": nic_result.id,
                }
            ]
        },
    },
)

vm_result = poller.result()

print(f"Provisioned virtual machine {vm_result.name}")