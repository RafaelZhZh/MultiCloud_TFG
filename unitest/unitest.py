import unittest
import subprocess
import datos

class TestMainFunction(unittest.TestCase):
    def setUp(self):
        self.access_key = datos.ACCESS_KEY
        self.secret_key = datos.SECRET_KEY
        self.region = 'us-east-1'
        self.ami = 'ami-0f34c5ae932e6f0e4'
        self.instance_type = 't2.micro'
        self.name = 'TestInstance'
        self.instance_id = 'i-0538e47d006d8380f'   #Crear una instancia para las pruebas y poner su ID aqui

        self.client_secret = datos.CLIENT_SECRET
        self.subscription_id = datos.SUBSCRIPTION_ID
        self.tenant_id = datos.TENANT_ID
        self.client_id = datos.CLIENT_ID
        self.nameVM = 'TestInstance'
        self.vmSize = 'Standard_B1s'
        self.region_azure = 'westeurope'
        self.image = 'Ubuntu Server 16.04 LTS'
        self.resource_group = 'MultiCloudPlatform_westeurope'

        # NO TENER CREAR Y TERMINAR/STARTSTOP A LA VEZ EN TRUE
        self.hacerCrear = False
        self.hacerTerminar = True
        self.hacerStartStop = True

    # GENERALES
    def test_check_credentials_aws_correcto(self):
        result = subprocess.run(["python","./aws_python_scripts/check_credentials.py",self.access_key,self.secret_key],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b''), b'Buena\n')

    def test_check_credentials_aws_incorrecto(self):
        result = subprocess.run(["python","./aws_python_scripts/check_credentials.py",self.access_key[2:],self.secret_key[2:]],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b''), b'Mala\n')

    def test_check_credentials_aws_error(self):
        result = subprocess.run(["python","./aws_python_scripts/check_credentials.py"],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '),True)

    def test_get_all_instances_aws_correcto(self):
        result = subprocess.run(["python","./aws_python_scripts/get_all_instances.py",self.access_key,self.secret_key, self.region],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), False)

    def test_get_all_instances_aws_error(self):
        result = subprocess.run(["python","./aws_python_scripts/get_all_instances.py",self.access_key[2:],self.secret_key[2:], self.region],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)
    
    def test_get_all_regions_aws_correcto(self):
        result = subprocess.run(["python","./aws_python_scripts/get_all_regions.py",self.access_key,self.secret_key],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), False)

    def test_get_all_regions_aws_error(self):
        result = subprocess.run(["python","./aws_python_scripts/get_all_regions.py",self.access_key[2:],self.secret_key[2:]],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)

    def test_check_credentials_azure_correcto(self):
        result = subprocess.run(["python","./azure_python_scripts/check_credentials.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b''), b'Buena\n')

    def test_check_credentials_azure_incorrecto(self):
        result = subprocess.run(["python","./azure_python_scripts/check_credentials.py",self.client_secret[2:], self.subscription_id, self.tenant_id, self.client_id],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b''), b'Mala\n')

    def test_check_credentials_azure_error(self):
        result = subprocess.run(["python","./azure_python_scripts/check_credentials.py"],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '),True)

    def test_get_all_instances_azure_correcto(self):
        result = subprocess.run(["python","./azure_python_scripts/get_all_instances.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id, self.region],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), False)

    def test_get_all_instances_azure_error(self):
        result = subprocess.run(["python","./azure_python_scripts/get_all_instances.py"],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)
    
    def test_get_all_regions_azure_correcto(self):
        result = subprocess.run(["python","./azure_python_scripts/get_all_regions.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), False)

    def test_get_all_regions_azure_error(self):
        result = subprocess.run(["python","./azure_python_scripts/get_all_regions.py"],capture_output=True)
        self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)

    # START/STOP
    def test_start_instances_aws_correcto(self):
        if(self.hacerStartStop):
            result = subprocess.run(["python","./aws_python_scripts/start_instance.py",self.access_key,self.secret_key,self.region,self.instance_id],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b''), b'M\xe1quina virtual reanudada\n')
        else:
            self.assertEqual(True,True)

    def test_start_instances_aws_error(self):
        if(self.hacerStartStop):
            result = subprocess.run(["python","./aws_python_scripts/start_instance.py",self.access_key,self.secret_key,self.region],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)
        else:
            self.assertEqual(True,True)
    
    def test_stop_instances_aws_correcto(self):
        if(self.hacerStartStop):
            result = subprocess.run(["python","./aws_python_scripts/stop_instance.py",self.access_key,self.secret_key,self.region,self.instance_id],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b''), b'M\xe1quina virtual parada\n')
        else:
            self.assertEqual(True,True)
        
    def test_stop_instances_aws_error(self):
        if(self.hacerStartStop):
            result = subprocess.run(["python","./aws_python_scripts/stop_instance.py",self.access_key,self.secret_key,self.region],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)
        else:
            self.assertEqual(True,True)

    def test_start_instances_azure_correcto(self):
        if(self.hacerStartStop):
            result = subprocess.run(["python","./azure_python_scripts/start_instance.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id,self.nameVM,self.resource_group],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b''), b'M\xe1quina virtual reanudada\n')
        else:
            self.assertEqual(True,True)

    def test_start_instances_azure_error(self):
        if(self.hacerStartStop):
            result = subprocess.run(["python","./azure_python_scripts/start_instance.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id,self.region],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)
        else:
            self.assertEqual(True,True)
    
    def test_stop_instances_azure_correcto(self):
        if(self.hacerStartStop):
            result = subprocess.run(["python","./azure_python_scripts/stop_instance.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id,self.nameVM,self.resource_group],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b''), b'M\xe1quina virtual parada\n')
        else:
            self.assertEqual(True,True)

    def test_stop_instances_azure_error(self):
        if(self.hacerStartStop):
            result = subprocess.run(["python","./azure_python_scripts/stop_instance.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id,self.region],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)
        else:
            self.assertEqual(True,True)

    # CREAR INSTANCIAS
    def test_create_instance_aws_correcto(self):
        if(self.hacerCrear):
            result = subprocess.run(["python","./aws_python_scripts/create_instance.py",self.access_key,self.secret_key, self.region, self.ami, self.instance_type, self.name],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b''), b'M\xe1quina creada\n')
        else:
            self.assertEqual(True,True)
        
    def test_create_instance_aws_error(self):
        if(self.hacerCrear):
            result = subprocess.run(["python","./aws_python_scripts/create_instance.py",self.access_key[2:],self.secret_key[2:], self.region, self.ami, self.instance_type, self.name],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '),True)
        else:
            self.assertEqual(True,True)

    def test_create_instance_azure_correcto(self):
        if(self.hacerCrear):
            result = subprocess.run(["python","./azure_python_scripts/create_instance.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id, self.nameVM, self.vmSize, self.region_azure, self.image],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b''), b'M\xe1quina creada\n')
        else:
            self.assertEqual(True,True)
    
    def test_create_instance_azure_error(self):
        if(self.hacerCrear):
            result = subprocess.run(["python","./azure_python_scripts/create_instance.py"],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '),True)
        else:
            self.assertEqual(True,True)

    # TERMINAR INSTANCIAS
    def test_terminate_instances_azure_correcto(self):
        if(self.hacerTerminar):
            result = subprocess.run(["python","./azure_python_scripts/terminate_instance.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id,self.nameVM,self.resource_group],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b''), b'M\xe1quina virtual eliminada\n')
        else:
            self.assertEqual(True,True)


    def test_terminate_instances_azure_error(self):
        if(self.hacerTerminar):
            result = subprocess.run(["python","./azure_python_scripts/terminate_instance.py",self.client_secret, self.subscription_id, self.tenant_id, self.client_id,self.region],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)
        else:
            self.assertEqual(True,True)
    
    def test_terminate_instances_aws_correcto(self):
        if(self.hacerTerminar):
            result = subprocess.run(["python","./aws_python_scripts/terminate_instance.py",self.access_key,self.secret_key,self.region,self.instance_id],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b''), b'M\xe1quina virtual eliminada\n')
        else:
            self.assertEqual(True,True)

    def test_terminate_instances_aws_error(self):
        if(self.hacerTerminar):
            result = subprocess.run(["python","./aws_python_scripts/terminate_instance.py",self.access_key,self.secret_key,self.region],capture_output=True)
            self.assertEqual(result.stdout.replace(b'\r',b'').startswith(b'Error: '), True)
        else:
            self.assertEqual(True,True)

if __name__ == '__main__':
    unittest.main()