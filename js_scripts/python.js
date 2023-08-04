function conectAWS(publickey_temp,secretkey_temp){
    let path = require('path');
    //const PythonShell = require('python-shell').PythonShell;

    let options = {
        mode: 'text',
        //pythonPath: 'path/to/python',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, '..\\python_scripts\\'),
        args : [publickey_temp,secretkey_temp]
    }

    PythonShell.run('check_credentials.py', options).then(messages=>{
        messages.forEach(element => {
            if(element == "Buena"){
                publickey = publickey_temp
                secretkey = secretkey_temp
                
                obtener_regiones();
                cuentaAWSconectada.style.display = "block";
                cuentaAWSnoconectada.style.display = "none";
                botonCrearMV.style.display = "block";          
            }
            else if(element == "Mala"){
                return false
            }
            else{
                return false
            }
        });
    });
}

function obtener_regiones(){
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, '..\\python_scripts\\'),
        args : [publickey,secretkey]
    }

    PythonShell.run('get_all_regions.py', options).then(messages=>{
        let picklist_region = document.getElementById("asociar_cuentasAWS_region");
        messages.forEach(element => {
            if(element.startsWith("Error")){
                return false;
            }
            else{
                picklist_region.innerHTML += "<option value=\""+element+"\">"+element+"</option>"
                region_aws = element;
            }
        });
    });
}

function obtener_info_maquinas(){
    console.log("HOLA2");
    if(region_aws == ""){
        return false
    }

    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, '..\\python_scripts\\'),
        args : [publickey,secretkey,region_aws]
    }

    PythonShell.run('get_all_instances.py', options).then(messages=>{
        listado_aws = []
        let mv = new MV()
        messages.forEach(element => {
            if(element.startsWith("Error")){
                return false;
            }
            else if(element.startsWith("_id")){
                if(mv.id != ""){
                    listado_aws.push(mv)
                    mv = new MV()
                }
                mv.AsignarValor(element)
            }
            else{
                mv.AsignarValor(element)
            }
        });
        if(mv.id != ""){
            listado_aws.push(mv)
        }
        renderListado();
    });
}

function detenerMV(id){
    console.log("ENTRE CON: "+id)
    if(region_aws == ""){
        return false
    }
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, '..\\python_scripts\\'),
        args : [publickey,secretkey,region_aws,id]
    }

    PythonShell.run('stop_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                console.log("Error: "+element)
                return false;
            }
            else{
                console.log("MV parada")
                obtener_info_maquinas();
            }
        });

    });
}

function iniciarMV(id){
    if(region_aws == ""){
        return false
    }
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, '..\\python_scripts\\'),
        args : [publickey,secretkey,region_aws,id]
    }

    PythonShell.run('start_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                console.log("Error: "+element)
                return false;
            }
            else{
                console.log("MV iniciada")
                obtener_info_maquinas();
            }
        });

    });
}

function terminarMV(id){
    console.log("ENTRE CON: "+id)
    if(region_aws == ""){
        return false
    }
    let path = require('path');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, '..\\python_scripts\\'),
        args : [publickey,secretkey,region_aws,id]
    }

    PythonShell.run('terminate_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                console.log("Error: "+element)
                return false;
            }
            else{
                console.log("MV terminada")
                obtener_info_maquinas();
            }
        });

    });
}

function crearMV(){
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
        scriptPath: path.join(__dirname, '..\\python_scripts\\'),
        args : [publickey,secretkey,region_aws,ami,instance_type,name,size]
    }

    PythonShell.run('create_instance.py', options).then(messages=>{
        messages.forEach(element => {
            if(element.startsWith("Error")){
                console.log("Error: "+element)
                return false; 
            }
            else{
                console.log("MV creada")
                obtener_info_maquinas();
                
            }
        });

    });
}
