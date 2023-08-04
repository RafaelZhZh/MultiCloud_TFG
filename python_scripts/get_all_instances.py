import boto3,sys

access_key = sys.argv[1]
secret_key = sys.argv[2]
region = sys.argv[3]

session = boto3.Session(
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
)

ec2 = session.resource('ec2', region_name=region)
for instance in ec2.instances.all():
    for attribute_name in dir(instance):
        if(not(attribute_name.startswith("__"))):
            attribute_value = getattr(instance, attribute_name)
            if(not(str(attribute_value).startswith("<bound"))):
                print(f"{attribute_name}: {attribute_value}")