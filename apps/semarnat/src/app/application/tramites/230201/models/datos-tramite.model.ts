
export interface DatosSolicitud {

  id: number;
  fraccionArancelaria: number;
  cantidad: number;
  cantidadLetra: string;
  descripcion: string

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
  descripcion: string;
  
}

export interface RespuestaDetalle {

  success: boolean;
  datos: DatosDetalle;
  message: string;
}

export interface MetaInfo {
  nacionalidad: string;
  tipoPersona: string;
  nacional: string;
  extranjero: string;
  denominacion: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  codigoPostal: string;
  pais: string;
  ciudad: string;
  domicilio: string;
}

export interface Respuesta<T> {
  success: boolean;
  datos: T;
  message: string;
}