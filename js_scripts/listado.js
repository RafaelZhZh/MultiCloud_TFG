function renderListado() {
  listado_mv.innerHTML = '';
  listado_aws.forEach((objeto, index) => {
    let elemento = document.createElement('div');
    elemento.classList.add('index_mv_container');
    elemento.innerHTML = "<span>ID: "+objeto.id+"</span>"+
                         "<span>Estado: "+objeto.state+"</span>"+
                         "<div class=\"index_mv_actions\">"
    if(objeto.state.indexOf("running")!=-1){
      elemento2.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_detener\" onclick=\"detenerMV('"+objeto.id+"')\">Detener</button>"
    }
    else if(objeto.state.indexOf("stopped")!=-1){
      elemento2.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_iniciar\" onclick=\"iniciarMV('"+objeto.id+"')\">Iniciar</button>"
      elemento2.innerHTML += "<button class=\"index_mv_buttons\" id=\"index_btn_terminar\" onclick=\"terminar('"+objeto.id+"')\">Terminar</button>"
    }
    elemento.innerHTML += "</div>";

    listado_mv.appendChild(elemento);
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
  