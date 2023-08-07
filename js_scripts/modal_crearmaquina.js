index_crear_maquina.addEventListener('click', () => {
  modal_crearmaquina.style.display = "block";
});

span_crearmaquina.onclick = function() {
  modal_crearmaquina.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal_crearmaquina) {
    modal_crearmaquina.style.display = "none";
  }
}

crear_maquinaAWS_confirmar.addEventListener('click', () => {
  let name = document.getElementById("crear_maquinaAWS_name_input").value
  let size = document.getElementById("crear_maquinaAWS_size_input").value
  if(name=="" || size == "" || size <=0){
    alert("Parametros incorrectos")
  }
  else{
    crearMVAWS();
    modal_crearmaquina.style.display = "none";
  }
});




