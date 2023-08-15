import boto3,sys
try:
    access_key = sys.argv[1]
    secret_key = sys.argv[2]
    region = sys.argv[3]
    instance_id = sys.argv[4]

    session = boto3.Session(
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
    )

    ec2 = session.client('ec2', region_name=region)

    # Reanuda la instancia
    response = ec2.start_instances(InstanceIds=[instance_id])

    # Imprime el resultado de la operación
    print("Máquina virtual reanudada")
except Exception as error:
    print("Error: "+str(error))