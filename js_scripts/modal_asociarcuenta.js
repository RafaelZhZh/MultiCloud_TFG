cuentaAWSconectada.style.display = "none";

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




