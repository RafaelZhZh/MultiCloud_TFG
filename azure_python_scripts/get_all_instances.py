import sys
from azure.identity import ClientSecretCredential
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.resource import ResourceManagementClient

client_secret = sys.argv[1]
subscription_id = sys.argv[2]
tenant_id = sys.argv[3]
client_id = sys.argv[4]

RESOURCE_GROUP_NAME = "PruebaMultiCloud3"

credential = ClientSecretCredential(tenant_id, client_id, client_secret)

compute_client = ComputeManagementClient(credential, subscription_id)

vm_list = compute_client.virtual_machines.list(
    RESOURCE_GROUP_NAME
)
i= 0
for vm in vm_list:
    array = vm.id.split("/")
    resource_group = array[4]
    vm_name = array[-1]
    info = compute_client.virtual_machines.get(resource_group, vm_name)
    for attribute_name in dir(info):
        if(not(attribute_name.startswith("_"))):
            attribute_value = getattr(info, attribute_name)
            if(not(str(attribute_value).startswith("<bound"))):
                print(f"{attribute_name}: {attribute_value}")
    statuses = compute_client.virtual_machines.instance_view(resource_group, vm_name).statuses
    status = len(statuses) >= 2 and statuses[1]
    print("status: "+status.code)

