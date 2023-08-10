// Carga de Interfaz
maquinaAWSconectada.style.display = "none";
texto_ayuda_aws.style.display="none";
maquinaAzureconectada.style.display = "none";
texto_ayuda_azure.style.display="none";

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
  if(name==""){
    alert("Parametros incorrectos")
  }
  else{
    crearMVAWS();
    modal_crearmaquina.style.display = "none";
  }
});

crear_maquinaazure_confirmar.addEventListener('click', () => {
  let name = document.getElementById("crear_maquinaazure_name_input").value
  if(name==""){
    alert("Parametros incorrectos")
  }
  else{
    crearMVAzure();
    modal_crearmaquina.style.display = "none";
  }
});





