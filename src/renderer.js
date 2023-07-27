window.addEventListener('DOMContentLoaded', () => {
    const objetoListado = document.getElementById('objeto-listado');
    const crearObjetoBtn = document.getElementById('crear-objeto');
  
    let objetos = [];
  
    function renderListado() {
      objetoListado.innerHTML = '';
  
      objetos.forEach((objeto, index) => {
        const elemento = document.createElement('div');
        elemento.classList.add('objeto-container');
        elemento.innerHTML = `
          <span>Objeto ${index + 1}</span>
          <div class="objeto-actions">
            <button class="btn-borrar" data-index="${index}">Borrar</button>
            <button class="btn-clonar" data-index="${index}">Clonar</button>
          </div>
        `;
  
        const btnBorrar = elemento.querySelector('.btn-borrar');
        btnBorrar.addEventListener('click', () => borrarObjeto(index));
  
        const btnClonar = elemento.querySelector('.btn-clonar');
        btnClonar.addEventListener('click', () => clonarObjeto(index));
  
        objetoListado.appendChild(elemento);
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
  
    crearObjetoBtn.addEventListener('click', () => {
      objetos.push({});
      renderListado();
    });
  
    renderListado();
  });
  