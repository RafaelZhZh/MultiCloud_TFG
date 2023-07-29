var listado_aws = []
var listado_azure = []
var publickey = "";
var secretkey = "";
var publickey_temp = ""
var secretkey_temp = ""
var region_aws = ""
var modal_asociarcuenta = document.getElementById("asociar_cuentas_modal");
var span = document.getElementById("asociar_cuentas_span");
var cuentaAWSnoconectada = document.getElementById("asociar_cuentasAWS_form");
var cuentaAWSconectada = document.getElementById("asociar_cuentasAWS_conectada");
const tabButtons = document.querySelectorAll('.asociar_cuentas_tab_btn');
const tabContents = document.querySelectorAll('.asociar_cuentas_tab_content');
const PythonShell = require('python-shell').PythonShell;

const listado_mv = document.getElementById('index_listado_mv');
var informacion_resumen = ["id","instance_type","private_ip_address"]

const crearObjetoBtn = document.getElementById('crear-objeto');

