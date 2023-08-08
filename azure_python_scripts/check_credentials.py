import sys
from azure.mgmt.resource import ResourceManagementClient
from azure.identity import ClientSecretCredential

client_secret = sys.argv[1]
subscription_id = sys.argv[2]
tenant_id = sys.argv[3]
client_id = sys.argv[4]

credentials = ClientSecretCredential(tenant_id, client_id, client_secret)

resource_client = ResourceManagementClient(credentials, subscription_id)

group_list = resource_client.resource_groups.list()

try:
    for group in list(group_list):
        a = group.name
    print("Azure: Buena")
except:
    print("Azure: Mala")
