function renderListado() {
  listado_mv.innerHTML = '';
  listado_aws.forEach((objeto, index) => {
    let elemento = document.createElement('div');
    elemento.classList.add('index_mv_container');
    elemento.innerHTML = "<span>"+objeto.id+"</span>"+
                         "<div class=\"index_mv_actions\">"+
                         "<button class=\"btn-borrar\">Borrar</button>"+
                         "<button class=\"btn-clonar\">Clonar</button>"+
                         "</div>";

    //const btnBorrar = elemento.querySelector('.btn-borrar');
    //btnBorrar.addEventListener('click', () => borrarObjeto(index));

    //const btnClonar = elemento.querySelector('.btn-clonar');
    //btnClonar.addEventListener('click', () => clonarObjeto(index));

    listado_mv.appendChild(elemento);
  });
}
  
function borrarObjeto(index) {
  objetos.splice(index, 1);
  renderListado();
}

function clonarObjeto(index) {
  const objetoClonado = { ...objetos[index] };
  objetos.push(objetoClonado);
  renderListado();
}
/*
crearObjetoBtn.addEventListener('click', () => {
  objetos.push({});
  renderListado();
});
*/
renderListado();
cuentaAWSconectada.style.display = "none";
  