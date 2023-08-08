// Carga de Interfaz
cuentaAWSconectada.style.display = "none";
texto_ayuda_aws.style.display="none";
cuentaAzureconectada.style.display = "none";
texto_ayuda_azure.style.display="none";

// Carga de datos de Información Resumen
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

// Boton de cambiar Resumen
asociar_cuentasResumen_cambiarResumen.addEventListener('click', () => {
  let primero_elemento = document.getElementById("asociar_cuentasResumen_primero")
  let segundo_elemento = document.getElementById("asociar_cuentasResumen_segundo")
  let tercero_elemento = document.getElementById("asociar_cuentasResumen_tercero")
  informacion_resumen = [primero_elemento.value, segundo_elemento.value, tercero_elemento.value]
  cargarinformacion_resumen()
  if(aws_connected || azure_connected){
    RefrescarInformacionDeMV();
  }
  modal_asociarcuenta.style.display = "none";
});


// Mostrar tutorial
asociar_cuentasAWS_tutorial.addEventListener('click', () => {
  if (texto_ayuda_aws.style.display == "none") {
    texto_ayuda_aws.style.display = "block";
  } else {
    texto_ayuda_aws.style.display = "none";
  }
});
asociar_cuentasazure_tutorial.addEventListener('click', () => {
  if (texto_ayuda_azure.style.display == "none") {
    texto_ayuda_azure.style.display = "block";
  } else {
    texto_ayuda_azure.style.display = "none";
  }
});

// Cambiar Region
asociar_cuentasAWS_cambiarregion.addEventListener('click', () => {
  RefrescarInformacionDeMV();
  region_aws = document.getElementById("asociar_cuentasAWS_region").value;
  modal_asociarcuenta.style.display = "none";
});
asociar_cuentasazure_cambiarregion.addEventListener('click', () => {
  RefrescarInformacionDeMV();
  region_azure = document.getElementById("asociar_cuentasazure_region").value;
  modal_asociarcuenta.style.display = "none";
});

// Modal Principal
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

// Confirmar asociar cuentas AWS
asociar_cuentasAWS_confirmar.addEventListener('click', () => {
  publickey_temp = document.getElementById("asociar_cuentasAWS_publickey_input").value;
  secretkey_temp = document.getElementById("asociar_cuentasAWS_secretkey_input").value;
  conectAWS(publickey_temp,secretkey_temp);
});

// Confirmar asociar cuentas azure
asociar_cuentasazure_confirmar.addEventListener('click', () => {
  client_secret_temp = document.getElementById("asociar_cuentasazure_clientsecret_input").value;
  subscription_id_temp = document.getElementById("asociar_cuentasazure_subid_input").value;
  tenant_id_temp = document.getElementById("asociar_cuentasazure_tenantid_input").value;
  client_id_temp = document.getElementById("asociar_cuentasazure_clientid_input").value;
  conectAzure(client_secret_temp,subscription_id_temp, tenant_id_temp, client_id_temp);
});




