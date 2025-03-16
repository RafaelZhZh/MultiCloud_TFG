import sys
from azure.identity import ClientSecretCredential
from azure.mgmt.subscription import SubscriptionClient

try:
    client_secret = sys.argv[1]
    subscription_id = sys.argv[2]
    tenant_id = sys.argv[3]
    client_id = sys.argv[4]

    # Acquire a credential object using CLI-based authentication.
    credential = ClientSecretCredential(tenant_id, client_id, client_secret)

    sub_client = SubscriptionClient(credential)
    locations = sub_client.subscriptions.list_locations(subscription_id)
    for location in locations:
        print(location.name)
except Exception as error:
    print("Error: "+str(error))
