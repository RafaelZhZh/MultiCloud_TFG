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
  crearMV();
});




