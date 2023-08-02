var listado_aws = []
var listado_azure = []

var publickey = "";
var secretkey = "";
var publickey_temp = ""
var secretkey_temp = ""
var region_aws = ""

var modal_asociarcuenta = document.getElementById("asociar_cuentas_modal");
var modal_crearmaquina = document.getElementById("crear_maquina_modal");
var modal_confirmar_terminate = document.getElementById("confirmar_terminate_modal");


var span = document.getElementById("asociar_cuentas_span");
var span_terminate_MV = document.getElementById("confirmar_terminate_span");
var span_crearmaquina = document.getElementById("crear_maquina_span");


var cuentaAWSnoconectada = document.getElementById("asociar_cuentasAWS_form");
var cuentaAWSconectada = document.getElementById("asociar_cuentasAWS_conectada");
var botonCrearMV = document.getElementById("index_crear_maquina");

var titulo_mas_info = document.getElementById("mas_info_titulo");
var body_mas_info = document.getElementById("mas_info_contenido");


var tabButtons_asociarcuenta = document.querySelectorAll('.asociar_cuentas_tab_btn');
var tabContents_asociarcuenta = document.querySelectorAll('.asociar_cuentas_tab_content');

var tabButtons_crearmaquina = document.querySelectorAll('.crear_maquina_tab_btn');
var tabContents_crearmaquina = document.querySelectorAll('.crear_maquina_tab_content');

var PythonShell = require('python-shell').PythonShell;

var listado_mv = document.getElementById('index_listado_mv');

var informacion_resumen = ["id","instance_type","private_ip_address"]

var aws_connected = false;
var azure_connected = false;



