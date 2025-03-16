class MV {
    constructor() {
      this.Arquitectura = '';
      this.ID = '';
      this.DireccionMAC = '';
      this.Region = '';
      this.SistemaOperativo = '';
      this.TipoMaquina = '';
      this.DireccionPrivada = '';
      this.DireccionPublica = '';
      this.Estado = '';
      this.Nombre = '';
      this.GrupoDeRecurso = '';
    }
  
    AsignarValor(mensaje,from){
        try {
            let indice = mensaje.indexOf(":")
            let nombre;
            if(from == "aws"){
                nombre = aws_traduccion[mensaje.substring(0,indice).trimStart()];
            }
            else if(from == "azure"){
                nombre = azure_traduccion[mensaje.substring(0,indice).trimStart()];
            }
            let valor = mensaje.substring(indice+1).trimStart();
            
            if (this.hasOwnProperty(nombre)) {
                this[nombre] = valor;
            }
        } catch (error) {
            console.error('Error al asignar valores desde la cadena:', error);
        }
    }
    
  }