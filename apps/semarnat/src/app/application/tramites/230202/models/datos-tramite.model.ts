
export interface DatosSolicitud {

  id: number;
  fraccionArancelaria: number;
  cantidad: number;
  cantidadLetra: string;

}

export interface RespuestaSolicitud {
 
  success: boolean;
  datos: DatosSolicitud;
  message: string;
}

export interface DatosDetalle {

  id: number;
  nombreCientifico: string;
  nombreComunDetalle: string;
  
}

export interface RespuestaDetalle {

  success: boolean;
  datos: DatosDetalle;
  message: string;
}