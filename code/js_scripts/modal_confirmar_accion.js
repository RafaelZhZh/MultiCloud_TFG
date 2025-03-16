span_confirmar_accion_MV.onclick = function() {
  modal_confirmar_accion.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal_confirmar_accion) {
    modal_confirmar_accion.style.display = "none";
  }
}

function confirmar(id,accion,from){
  modal_confirmar_accion.style.display="block";
  let titulo = document.getElementById("confirmar_accion_titulo");
  let texto = document.getElementById("confirmar_accion_texto");
  let boton = document.getElementById("confirmar_accion_confirmar");
  if(accion == "terminar"){
    titulo.innerHTML = "¿Desea terminar con la máquina virtual?"
    texto.innerHTML = "Esta accion borrará TODOS los datos de la misma y no se puede revertir."
    boton.onclick = function() {
      if(from=="aws")terminarMVAWS(id);
      else if (from=="azure"){
        objetoBuscado = listado_azure.find((elemento) => elemento.ID === id);
        terminarMVAzure(objetoBuscado.Nombre,objetoBuscado.GrupoDeRecurso)
      }
      console.log("TERMINANDO INSTANCIA")
      modal_confirmar_accion.style.display = "none";
      boton.removeAttribute("onclick");
    } 
  }
  else if(accion == "iniciar"){
    titulo.innerHTML = "¿Desea encender la máquina virtual?"
    texto.innerHTML = ""
    boton.onclick = function() {
      if(from=="aws")iniciarMVAWS(id);
      else if (from=="azure"){
        objetoBuscado = listado_azure.find((elemento) => elemento.ID === id);
        iniciarMVAzure(objetoBuscado.Nombre,objetoBuscado.GrupoDeRecurso)
      }
      console.log("INICIANDO INSTANCIA")
      modal_confirmar_accion.style.display = "none";
      boton.removeAttribute("onclick");
    } 
  }
  else if(accion == "detener"){
    titulo.innerHTML = "¿Desea apagar la máquina virtual?"
    texto.innerHTML = "Asegurese de que no necesita la máquina y es la correcta. Al apagar la máquina todos los procesos internos serán apagados también."
    boton.onclick = function() {
      if(from=="aws")detenerMVAWS(id);
      else if (from=="azure"){
        objetoBuscado = listado_azure.find((elemento) => elemento.ID === id);
        detenerMVAzure(objetoBuscado.Nombre,objetoBuscado.GrupoDeRecurso)
      }
      console.log("DETENIENDO INSTANCIA")
      modal_confirmar_accion.style.display = "none";
      boton.removeAttribute("onclick");
    } 
  }
}




