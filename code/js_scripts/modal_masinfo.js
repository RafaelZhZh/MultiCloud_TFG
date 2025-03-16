mas_info_span.onclick = function() {
  mas_info_modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == mas_info_modal) {
    mas_info_modal.style.display = "none";
  }
}

function moreInfo(id,from){
  let objetoBuscado
  if(from=="aws")objetoBuscado = listado_aws.find((elemento) => elemento.ID === id);
  else if(from=="azure")objetoBuscado = listado_azure.find((elemento) => elemento.ID === id);
  titulo_mas_info.innerHTML += objetoBuscado.ID;
  body_mas_info.innerHTML = "<hr>"
  for (let atributo in objetoBuscado) {
    body_mas_info.innerHTML += 
    "<div>"+atributo+":</div>"+
    "<div>"+objetoBuscado[atributo]+"</div><hr>"
  }
  mas_info_modal.style.display = "block";
}

