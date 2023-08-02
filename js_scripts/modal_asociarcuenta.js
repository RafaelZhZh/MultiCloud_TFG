cuentaAWSconectada.style.display = "none";
let select = ""
let MV_AUX = new MV();
for (let atributo in MV_AUX){
  if (MV_AUX.hasOwnProperty(atributo)) {
    select += "<option value=\""+atributo+"\">"+atributo+"</option>"
  }
}
let primero_elemento = document.getElementById("asociar_cuentasResumen_primero")
primero_elemento.innerHTML = select
let segundo_elemento = document.getElementById("asociar_cuentasResumen_segundo")
segundo_elemento.innerHTML = select
let tercero_elemento = document.getElementById("asociar_cuentasResumen_tercero")
tercero_elemento.innerHTML = select
cargarinformacion_resumen()

function cargarinformacion_resumen(){
  let primero_elemento = document.getElementById("asociar_cuentasResumen_primero")
  primero_elemento.value = informacion_resumen[0]
  let segundo_elemento = document.getElementById("asociar_cuentasResumen_segundo")
  segundo_elemento.value = informacion_resumen[1]
  let tercero_elemento = document.getElementById("asociar_cuentasResumen_tercero")
  tercero_elemento.value = informacion_resumen[2]
}

asociar_cuentasResumen_cambiarResumen.addEventListener('click', () => {
  let primero_elemento = document.getElementById("asociar_cuentasResumen_primero")
  let segundo_elemento = document.getElementById("asociar_cuentasResumen_segundo")
  let tercero_elemento = document.getElementById("asociar_cuentasResumen_tercero")
  informacion_resumen = [primero_elemento.value, segundo_elemento.value, tercero_elemento.value]
  cargarinformacion_resumen()
  if(aws_connected || azure_connected){
    obtener_info_maquinas()
  }
  modal_asociarcuenta.style.display = "none";
});

asociar_cuentasAWS_cambiarregion.addEventListener('click', () => {
  region_aws = document.getElementById("asociar_cuentasAWS_region").value;
  obtener_info_maquinas();
  modal_asociarcuenta.style.display = "none";
});

asociar_cuentas.addEventListener('click', () => {
  modal_asociarcuenta.style.display = "block";
});

span.onclick = function() {
  modal_asociarcuenta.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal_asociarcuenta) {
    modal_asociarcuenta.style.display = "none";
  }
}

asociar_cuentasAWS_confirmar.addEventListener('click', () => {
  publickey_temp = document.getElementById("asociar_cuentasAWS_publickey_input").value;
  secretkey_temp = document.getElementById("asociar_cuentasAWS_secretkey_input").value;
  conectAWS(publickey_temp,secretkey_temp);
});




