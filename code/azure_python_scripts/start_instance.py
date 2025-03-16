import sys
from azure.identity import ClientSecretCredential
from azure.mgmt.compute import ComputeManagementClient

try:
    client_secret = sys.argv[1]
    subscription_id = sys.argv[2]
    tenant_id = sys.argv[3]
    client_id = sys.argv[4]
    nameVM = sys.argv[5]
    RESOURCE_GROUP_NAME = sys.argv[6]

    credential = ClientSecretCredential(tenant_id, client_id, client_secret)

    compute_client = ComputeManagementClient(credential, subscription_id)

    vm_result = compute_client.virtual_machines.begin_start(
        RESOURCE_GROUP_NAME, nameVM
    )
    print("Máquina virtual reanudada")
except Exception as error:
    print("Error: "+str(error))