function terminar(id){
  modal_confirmar_terminate.style.display="block";
  let boton_terminate_MV = document.getElementById("confirmar_terminate_confirmar");
  boton_terminate_MV.onclick = function() {
    terminarMV(id);
    console.log("TERMINANDO INSTANCIA")
    modal_confirmar_terminate.style.display = "none";
    boton_terminate_MV.removeAttribute("onclick");
  }
}

span_terminate_MV.onclick = function() {
  modal_confirmar_terminate.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal_confirmar_terminate) {
    modal_confirmar_terminate.style.display = "none";
  }
}




