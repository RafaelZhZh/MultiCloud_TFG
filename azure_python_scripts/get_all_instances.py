import sys,json
from azure.identity import ClientSecretCredential
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.resource import ResourceManagementClient

try:
    client_secret = sys.argv[1]
    subscription_id = sys.argv[2]
    tenant_id = sys.argv[3]
    client_id = sys.argv[4]
    region = sys.argv[5]

    credential = ClientSecretCredential(tenant_id, client_id, client_secret)

    resource_client = ResourceManagementClient(credential, subscription_id)
    compute_client = ComputeManagementClient(credential, subscription_id)
    network_client = NetworkManagementClient(credential, subscription_id)

    LOCATION = region

    # Retrieve the list of resource groups
    group_list = resource_client.resource_groups.list()
    group_resources = []
    for group in list(group_list):
        if(group.location == LOCATION):
            group_resources.append(group.name)

    atributos = ["vm_size", "location", "name", "operating_system", "architecture", "os_disk_size", "vm_id", "mac_address", "private_ip_address", "public_ip_address", "status"]

    for RESOURCE_GROUP_NAME in group_resources:
        vm_list = compute_client.virtual_machines.list(
            RESOURCE_GROUP_NAME
        )

        i= 0
        for vm in vm_list:
            try:
                array = vm.id.split("/")
                vm_name = array[-1]
                info = compute_client.virtual_machines.get(RESOURCE_GROUP_NAME, vm_name)
                for attribute_name in dir(info):
                    if(attribute_name.startswith("_")):
                        continue

                    attribute_value = getattr(info, attribute_name)
                    
                    if(str(attribute_value).startswith("<bound")):
                        continue

                    if(attribute_name == "hardware_profile"):
                        print(f"vm_size: {attribute_value.vm_size}")
                    elif(attribute_name == "storage_profile"):
                        image = compute_client.virtual_machine_images.get(LOCATION,attribute_value.image_reference.publisher,attribute_value.image_reference.offer,attribute_value.image_reference.sku,attribute_value.image_reference.exact_version)
                        print(f"operating_system: {image.os_disk_image.operating_system}")
                        print(f"architecture: {image.architecture}")
                        #print(f"os_disk_size: {attribute_value.os_disk.disk_size_gb}")
                    elif(attribute_name in atributos):
                        print(f"{attribute_name}: {attribute_value}")

                nic_name = getattr(info, 'network_profile').network_interfaces[0].id
                nic_name = nic_name[nic_name.rindex('/')+1:]
                nic = network_client.network_interfaces.get(RESOURCE_GROUP_NAME,nic_name)
                print("mac_address: "+nic.mac_address)
                print("private_ip_address: "+str(nic.ip_configurations[0].private_ip_address))
                ip_name = nic.ip_configurations[0].public_ip_address.id
                ip_name = ip_name[ip_name.rindex('/')+1:]
                ip_public = network_client.public_ip_addresses.get(RESOURCE_GROUP_NAME,ip_name)
                print("public_ip_address: "+str(ip_public.ip_address))
                statuses_list = compute_client.virtual_machines.instance_view(RESOURCE_GROUP_NAME, vm_name).statuses
                statuses = statuses_list[len(statuses_list)-1]
                status = statuses.code[statuses.code.rindex('/')+1:]
                print("status: "+status)
                print("resourcegroup: "+RESOURCE_GROUP_NAME)
            except:
                print("Error")
                continue
except Exception as error:
    print("Error: "+str(error))


