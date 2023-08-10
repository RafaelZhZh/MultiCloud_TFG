// Listado Index
var listado_mv = document.getElementById('index_listado_mv');
var listado_aws = []
var listado_azure = []
var informacion_resumen = ["ID","TipoMaquina","DireccionPublica"]

// AWS KEYS
var publickey = "";
var secretkey = "";
var publickey_temp = ""
var secretkey_temp = ""
var region_aws = ""

//AZURE KEYS
var client_secret = ""
var subscription_id = ""
var tenant_id = ""
var client_id = ""
var client_secret_temp = ""
var subscription_id_temp = ""
var tenant_id_temp = ""
var client_id_temp = ""
var region_azure = ""

// MODALES
var modal_asociarcuenta = document.getElementById("asociar_cuentas_modal");
var modal_crearmaquina = document.getElementById("crear_maquina_modal");
var modal_confirmar_accion = document.getElementById("confirmar_accion_modal");

// SPANS
var span = document.getElementById("asociar_cuentas_span");
var span_confirmar_accion_MV = document.getElementById("confirmar_accion_span");
var span_crearmaquina = document.getElementById("crear_maquina_span");

// AWS
var cuentaAWSnoconectada = document.getElementById("asociar_cuentasAWS_form");
var cuentaAWSconectada = document.getElementById("asociar_cuentasAWS_conectada");
var texto_ayuda_aws=document.getElementById("asociar_cuentasAWS_tutorial_text")
var aws_connected = false;
var maquinaAWSconectada = document.getElementById("crear_maquinaAWS_form");
var maquinaAWSnoconectada = document.getElementById("crear_maquinaAWS_noconectada");

// Azure Cuenta Conectada
var cuentaAzurenoconectada = document.getElementById("asociar_cuentasazure_form");
var cuentaAzureconectada = document.getElementById("asociar_cuentasazure_conectada");
var texto_ayuda_azure=document.getElementById("asociar_cuentasazure_tutorial_text")
var azure_connected = false;
var maquinaAzureconectada = document.getElementById("crear_maquinaazure_form");
var maquinaAzurenoconectada = document.getElementById("crear_maquinaazure_noconectada");


var botonCrearMV = document.getElementById("index_crear_maquina");

// Modal de Más Info
var titulo_mas_info = document.getElementById("mas_info_titulo");
var body_mas_info = document.getElementById("mas_info_contenido");

// Tabs de asociar cuenta
var tabButtons_asociarcuenta = document.querySelectorAll('.asociar_cuentas_tab_btn');
var tabContents_asociarcuenta = document.querySelectorAll('.asociar_cuentas_tab_content');

// Tabs de crear maquina
var tabButtons_crearmaquina = document.querySelectorAll('.crear_maquina_tab_btn');
var tabContents_crearmaquina = document.querySelectorAll('.crear_maquina_tab_content');


var PythonShell = require('python-shell').PythonShell;
aws_traduccion = {
    "architecture": "Arquitectura",
    "id": "ID",
    "mac": "DireccionMAC",
    "region": "Region",
    "platform_details": "SistemaOperativo",
    "private_ip_address": "DireccionPrivada",
    "instance_type": "TipoMaquina",
    "public_ip_address": "DireccionPublica",
    "state": "Estado",
    "Name": "Nombre"
};
azure_traduccion = {
    "architecture": "Arquitectura",
    "vm_id": "ID",
    "mac_address": "DireccionMAC",
    "location": "region",
    "vm_size": "TipoMaquina",
    "operating_system": "SistemaOperativo",
    "private_ip_address": "DireccionPrivada",
    "public_ip_address": "DireccionPublica",
    "status": "Estado",
    "name": "Nombre",
    "resourcegroup": "GrupoDeRecurso"
};