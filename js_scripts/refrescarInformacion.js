// Función para verificar la variable y actualizar la pantalla
function VerificarSiCuentaConectada() {
    console.log("COMPROBANDO CUENTA")
    let aws = document.getElementById('index_cuentaAWS');
    // AWS
    if (publickey !== '' && secretkey !== '') {
        aws.innerHTML = '&#10004;AWS';
        aws.style.color = 'green';
        aws_connected = true;
        
    } else{
       aws.innerHTML = '&times;AWS';
       aws.style.color = 'red';
       aws_connected = false;
    }

    // Refrescar Info de MV
    RefrescarInformacionDeMV();
}


function RefrescarInformacionDeMV(){
    if(aws_connected|| azure_connected){
        obtener_info_maquinas()
        document.getElementById('index_sin_conexion').style.display = "none";
        document.getElementById('index_listado_mv').style.display = "block";
    }
    else{
        document.getElementById('index_sin_conexion').style.display = "block";
        document.getElementById('index_listado_mv').style.display = "none";
    }
}


// Verificación inicial al cargar la página
VerificarSiCuentaConectada();

// Función para verificar la variable cada 5 minutos
setInterval(VerificarSiCuentaConectada, 10 * 1000); // 5 minutos = 5 * 60 segundos * 1000 milisegundos