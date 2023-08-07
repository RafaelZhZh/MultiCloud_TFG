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

# Show the groups in formatted output
column_width = 40

print("Resource Group".ljust(column_width) + "Location")
print("-" * (column_width * 2))

for group in list(group_list):
    print(f"{group.name:<{column_width}}{group.location}")
#runcmd = compute_client.virtual_machine_run_commands.begin_create_or_update(rg_name, vm_name, run_command_name, run_command)