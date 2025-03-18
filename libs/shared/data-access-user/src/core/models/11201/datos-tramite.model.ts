export interface Aduanas {
    nombre: string;
    id: number;
  }
  export interface Contenedores {
    tipo: string;
    id: number;
  }
  
  export interface DatosDelContenedor {
    id: number;
    inicialesEquipo: string;
    numeroEquipo: number;
    digitoVerificador: number;
    tipoEquipo: string;
    aduana: number;
    fechaIngreso: string;
    vigencia: string;
    estadoConstancia: string;
    existeEnVUCEM: string;
    idConstancia: string;
    numeroManifiesto: string;
    idSolicitud: string;
    fechaInicio: string;
  }
  export interface RespuestaContenedor {
    success: boolean;
    datos: DatosDelContenedor
    message: string;
  }
  