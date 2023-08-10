import boto3,sys

access_key = sys.argv[1]
secret_key = sys.argv[2]
region = sys.argv[3]

session = boto3.Session(
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
)

atributos = ["architecture", "id", "platform_details", "private_ip_address", "public_ip_address","instance_type"]

ec2 = session.resource('ec2', region_name=region)
for instance in ec2.instances.all():
    for attribute_name in dir(instance):
        if(attribute_name.startswith("__")):
            continue
        attribute_value = getattr(instance, attribute_name)
        if(str(attribute_value).startswith("<bound")):
            continue
        if(attribute_name in atributos):
            print(f"{attribute_name}: {attribute_value}")
        elif(attribute_name == "network_interfaces_attribute"):
            if(len(attribute_value)>0):
                print(f"mac: {attribute_value[0]['MacAddress']}")
        elif(attribute_name == "placement"):
            print(f"region: {attribute_value['AvailabilityZone']}")
        elif(attribute_name == "state"):
            print(f"state: {attribute_value['Name']}")
        elif(attribute_name == "tags"):
            for item in attribute_value:
                if item["Key"]=="Name":
                    print(f"Name: {item['Value']}")
