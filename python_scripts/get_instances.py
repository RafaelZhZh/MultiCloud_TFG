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
    print(
        "Id: {0}\nPlatform: {1}\nType: {2}\nPublic IPv4: {3}\nAMI: {4}\nState: {5}\n".format(
        instance.id, instance.platform, instance.instance_type, instance.public_ip_address, instance.image.id, instance.state
        )
    )