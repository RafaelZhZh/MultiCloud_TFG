function renderListado() {
  listado_mv.innerHTML = '';
  listado_aws.forEach((objeto, index) => {
    let elemento = document.createElement('div');
    elemento.classList.add('index_mv_container');
<<<<<<< HEAD
    elemento.innerHTML = "<span>"+objeto.id+"</span>"+
                         "<div class=\"index_mv_actions\">"+
                         "<button class=\"btn-borrar\">Borrar</button>"+
                         "<button class=\"btn-clonar\">Clonar</button>"+
                         "</div>";

    //const btnBorrar = elemento.querySelector('.btn-borrar');
    //btnBorrar.addEventListener('click', () => borrarObjeto(index));

    //const btnClonar = elemento.querySelector('.btn-clonar');
    //btnClonar.addEventListener('click', () => clonarObjeto(index));
=======
    elemento.innerHTML = "<span>ID: "+objeto.id+"</span>"+
                         "<span>Estado: "+objeto.state+"</span>"+
                         "<div class=\"index_mv_actions\">"
    if(objeto.state.indexOf("running")!=-1){
      elemento.innerHTML += "<button class=\"index_btn_detener\" onclick=\"detenerMV('"+objeto.id+"')\">Detener</button>"
    }
    if(objeto.state.indexOf("stopped")!=-1){
      elemento.innerHTML += "<button class=\"index_btn_iniciar\" onclick=\"iniciarMV('"+objeto.id+"')\">Iniciar</button>"
      elemento.innerHTML += "<button class=\"index_btn_terminar\" onclick=\"terminar('"+objeto.id+"')\">Terminar</button>"
    }
    elemento.innerHTML += "</div>";
>>>>>>> 7773e6c (Crear Maquina en AWS)

    listado_mv.appendChild(elemento);
  });
}



/*
crearObjetoBtn.addEventListener('click', () => {
  objetos.push({});
  renderListado();
});
*/
renderListado();
cuentaAWSconectada.style.display = "none";
  