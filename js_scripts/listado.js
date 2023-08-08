function renderListado() {
  listado_mv.innerHTML = '';
  listado_aws.forEach((objeto, index) => {
    let row = document.createElement('div');
    row.classList.add('index_mv_container');
    // Parte Izquierda (IMAGEN)
    let imagen = document.createElement('div');
    imagen.innerHTML = '<img class="index_imagen_proveedor" src="../images/aws.png" alt="Logo de AWS"></img>'
    row.appendChild(imagen)
    // Parte Izquierda
    let datos = document.createElement('div');
    datos.innerHTML += "<div class=\"index_contenedor_estado\">"+objeto.Estado+"</div><span>"+objeto.Nombre+"</span><hr>"
    informacion_resumen.forEach((objeto2,index2)=>{
      datos.innerHTML += "<span>"+objeto2+": "+objeto[objeto2]+"</span><br>"
    })
    row.appendChild(datos)

    let botones = document.createElement('div');   
    botones.style.textAlign = "right";         
    if(objeto.Estado == "running"){
      botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_detener\" onclick=\"confirmar('"+objeto.ID+"','detener','aws')\">Detener</button>"
    }
    else if(objeto.Estado == "stopped"){
      botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_iniciar\" onclick=\"confirmar('"+objeto.ID+"','iniciar','aws')\">Iniciar</button>"
      botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_terminar\" onclick=\"confirmar('"+objeto.ID+"','terminar','aws')\">Terminar</button>"
    }
    botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_moreinfo\" onclick=\"moreInfo('"+objeto.ID+"','aws')\">Mas info</button>"
    row.appendChild(botones);
    listado_mv.appendChild(row);
  });
  listado_azure.forEach((objeto, index) => {
    let row = document.createElement('div');
    row.classList.add('index_mv_container');
    // Parte Izquierda (IMAGEN)
    let imagen = document.createElement('div');
    imagen.innerHTML = '<img class="index_imagen_proveedor" src="../images/azure.png" alt="Logo de Azure"></img>'
    row.appendChild(imagen)
    // Parte Izquierda
    let datos = document.createElement('div');
    datos.innerHTML += "<div class=\"index_contenedor_estado\">"+objeto.Estado+"</div><span>"+objeto.Nombre+"</span><hr>"
    informacion_resumen.forEach((objeto2,index2)=>{
      datos.innerHTML += "<span>"+objeto2+": "+objeto[objeto2]+"</span><br>"
    })
    row.appendChild(datos)

    let botones = document.createElement('div');   
    botones.style.textAlign = "right";         
    if(objeto.Estado == "running"){
      botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_detener\" onclick=\"confirmar('"+objeto.Nombre+"','detener','azure')\">Detener</button>"
    }
    else if(objeto.Estado == "deallocated"){
      botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_iniciar\" onclick=\"confirmar('"+objeto.Nombre+"','iniciar','azure')\">Iniciar</button>"
      botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_terminar\" onclick=\"confirmar('"+objeto.Nombre+"','terminar','azure')\">Terminar</button>"
    }
    botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_moreinfo\" onclick=\"moreInfo('"+objeto.ID+"','azure')\">Mas info</button>"
    row.appendChild(botones);
    listado_mv.appendChild(row);
  });
}

renderListado();
  