var path_aws_scripts = '..\\aws_python_scripts\\'
var path_azure_scripts = '..\\azure_python_scripts\\'

function conectAWS(publickey_temp,secretkey_temp){
    let path = require('path');

    let options = {
        mode: 'text',
        //pythonPath: 'path/to/python',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_aws_scripts),
        args : [publickey_temp,secretkey_temp]
    }

    PythonShell.run('check_credentials.py', options).then(messages=>{
        messages.forEach(element => {
            if(element == "Buena"){
                aws_connected = true;
                publickey = publickey_temp
                secretkey = secretkey_temp
                
                obtener_regionesAWS();
                cuentaAWSconectada.style.display = "block";
                cuentaAWSnoconectada.style.display = "none";
                botonCrearMV.style.display = "block";          
            }
            else if(element == "Mala"){
                return false
            }
            else{
                alert("Error: "+element)
                return false
            }
        });
    });
}
function conectAzure(client_secret_temp,subscription_id_temp, tenant_id_temp, client_id_temp){
    let path = require('path');

    let options = {
        mode: 'text',
        //pythonPath: 'path/to/python',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_azure_scripts),
        args : [client_secret_temp,subscription_id_temp, tenant_id_temp, client_id_temp]
    }

    PythonShell.run('check_credentials.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Azure: "))
                element = element.replace("Azure: ","")
                if(element == "Buena"){
                    azure_connected = true
                    client_secret = client_secret_temp
                    subscription_id = subscription_id_temp
                    tenant_id = tenant_id_temp
                    client_id = client_id_temp
                    
                    obtener_regionesAzure();
                    cuentaAzureconectada.style.display = "block";
                    cuentaAzurenoconectada.style.display = "none";
                    botonCrearMV.style.display = "block";          
                }
                else if(element == "Mala"){
                    return false
                }
                else{
                    alert("Error: "+element)
                    return false
                }
        });
    });
}

function obtener_regionesAWS(){
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_aws_scripts),
        args : [publickey,secretkey]
    }

    PythonShell.run('get_all_regions.py', options).then(messages=>{
        let picklist_region = document.getElementById("asociar_cuentasAWS_region");
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else{
                picklist_region.innerHTML += "<option value=\""+element+"\">"+element+"</option>"
                
            }
        });
        region_aws = document.getElementById("asociar_cuentasAWS_region").value;
    });
}
function obtener_regionesAzure(){
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_azure_scripts),
        args : [client_secret_temp,subscription_id_temp, tenant_id_temp, client_id_temp]
    }

    PythonShell.run('get_all_regions.py', options).then(messages=>{
        let picklist_region = document.getElementById("asociar_cuentasazure_region");
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else{
                picklist_region.innerHTML += "<option value=\""+element+"\">"+element+"</option>"
                
            }
        });
        region_azure = document.getElementById("asociar_cuentasazure_region").value;
    });
}

function obtener_info_maquinasAWS(){
    if(region_aws == ""){
        return false
    }

    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_aws_scripts),
        args : [publickey,secretkey,region_aws]
    }

    PythonShell.run('get_all_instances.py', options).then(messages=>{
        listado_aws = []
        let mv = new MV()
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else if(element.startsWith("architecture")){
                if(mv.ID != ""){
                    listado_aws.push(mv)
                    mv = new MV()
                }
                mv.AsignarValor(element,"aws")
            }
            else{
                mv.AsignarValor(element,"aws")
            }
        });
        if(mv.ID != ""){
            listado_aws.push(mv)
        }
    });
    renderListado();
}
function obtener_info_maquinasAzure(){

    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_azure_scripts),
        args : [client_secret_temp,subscription_id_temp, tenant_id_temp, client_id_temp, region_azure]
    }

    PythonShell.run('get_all_instances.py', options).then(messages=>{
        listado_azure = []
        let mv = new MV()
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else if(element.startsWith("vm_size")){
                if(mv.ID != ""){
                    listado_azure.push(mv)
                    mv = new MV()
                }
                mv.AsignarValor(element,"azure")
            }
            else{
                mv.AsignarValor(element,"azure")
            }
        });
        if(mv.ID != ""){
            listado_azure.push(mv)
        }
    });
    renderListado();
}

function detenerMVAWS(id){
    console.log("ENTRE CON: "+id)
    if(region_aws == ""){
        return false
    }
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_aws_scripts),
        args : [publickey,secretkey,region_aws,id]
    }

    PythonShell.run('stop_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else{
                console.log("MV parada")
                RefrescarInformacionDeMV();
            }
        });

    });
}
function detenerMVAzure(id){
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_azure_scripts),
        args : [client_secret_temp,subscription_id_temp, tenant_id_temp, client_id_temp, id]
    }

    PythonShell.run('stop_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else{
                console.log("MV detenida")
                RefrescarInformacionDeMV();
            }
        });

    });
}

function iniciarMVAWS(id){
    if(region_aws == ""){
        return false
    }
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_aws_scripts),
        args : [publickey,secretkey,region_aws,id]
    }

    PythonShell.run('start_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else{
                console.log("MV iniciada")
                RefrescarInformacionDeMV();
            }
        });

    });
}
function iniciarMVAzure(id){
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_azure_scripts),
        args : [client_secret_temp,subscription_id_temp, tenant_id_temp, client_id_temp, id]
    }

    PythonShell.run('start_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else{
                console.log("MV iniciada")
                RefrescarInformacionDeMV();
            }
        });

    });
}

function terminarMVAWS(id){
    console.log("ENTRE CON: "+id)
    if(region_aws == ""){
        return false
    }
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_aws_scripts),
        args : [publickey,secretkey,region_aws,id]
    }

    PythonShell.run('terminate_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else{
                console.log("MV terminada")
                RefrescarInformacionDeMV();
            }
        });

    });
}
function terminarMVAzure(id){
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_azure_scripts),
        args : [client_secret_temp,subscription_id_temp, tenant_id_temp, client_id_temp, id]
    }

    PythonShell.run('terminate_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false;
            }
            else{
                console.log("MV terminada")
                RefrescarInformacionDeMV();
            }
        });

    });
}

function crearMVAWS(){
    console.log("CREANDO MAQUINA")
    if(region_aws == ""){
        return false
    }
    let path = require('path');
    let ami = document.getElementById("crear_maquinaAWS_ami").value
    let instance_type = document.getElementById("crear_maquinaAWS_tipo").value
    let name = document.getElementById("crear_maquinaAWS_name_input").value
    let size = document.getElementById("crear_maquinaAWS_size_input").value

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, path_aws_scripts),
        args : [publickey,secretkey,region_aws,ami,instance_type,name,size]
    }

    PythonShell.run('create_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                alert("Error: "+element)
                return false; 
            }
            else{
                console.log("MV creada")
                RefrescarInformacionDeMV();
                
            }
        });

    });
}

