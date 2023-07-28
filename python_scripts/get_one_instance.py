import boto3,sys

access_key = sys.argv[1]
secret_key = sys.argv[2]
region = sys.argv[3]
instance_id = sys.argv[4]

session = boto3.Session(
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
)

ec2 = session.client('ec2', region_name=region)

# Obtén la información de una instancia existente (reemplaza 'INSTANCE_ID' con el ID de tu instancia EC2)
response = ec2.describe_instances(InstanceIds=[instance_id])

# Extrae la instancia de la respuesta
instance = response['Reservations'][0]['Instances'][0]

for attr, value in instance.items():
    print(f"{attr}: {value}")
    
