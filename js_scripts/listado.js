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
    datos.innerHTML += "<div class=\"index_contenedor_estado\">"+objeto.state.Name+"</div><span>"+objeto.tags[0].Value+"</span><hr>"
    informacion_resumen.forEach((objeto2,index2)=>{
      datos.innerHTML += "<span>"+objeto2+": "+objeto[objeto2]+"</span><br>"
    })
    row.appendChild(datos)

    let botones = document.createElement('div');   
    botones.style.textAlign = "right";         
    if(objeto.state.Name == "running"){
      botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_detener\" onclick=\"confirmar('"+objeto.id+"','detener')\">Detener</button>"
    }
    else if(objeto.state.Name == "stopped"){
      botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_iniciar\" onclick=\"confirmar('"+objeto.id+"','iniciar')\">Iniciar</button>"
      botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_terminar\" onclick=\"confirmar('"+objeto.id+"','terminar')\">Terminar</button>"
    }
    botones.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_moreinfo\" onclick=\"moreInfo('"+objeto.id+"')\">Mas info</button>"
    row.appendChild(botones);
    listado_mv.appendChild(row);
  });
}

function moreInfo(id){
  let objetoBuscado = listado_aws.find((elemento) => elemento.id === id);
  titulo_mas_info.innerHTML += objetoBuscado.id;
  body_mas_info.innerHTML = "<hr>"
  for (let atributo in objetoBuscado) {
    body_mas_info.innerHTML += 
    "<div>"+atributo+":</div>"+
    "<div>"+objetoBuscado[atributo]+"</div><hr>"
  }
  mas_info_modal.style.display = "block";
}



renderListado();
cuentaAWSconectada.style.display = "none";
  