import boto3,sys

access_key = sys.argv[1]
secret_key = sys.argv[2]

try:
    session = boto3.Session(
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
    )
    ec2_client = session.client('ec2', region_name='us-east-1')
    images = ec2_client.describe_images(Owners=['self'])
    print("Buena")
except Exception as e:
    if str(e).find("AuthFailure"):
        print("Mala")
    else:
        print("Error: "+str(e))