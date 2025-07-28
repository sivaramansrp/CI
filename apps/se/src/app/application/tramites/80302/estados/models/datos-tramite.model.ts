export interface Aduanas {
  descripcion: string;
  id: number;
}
export interface Contenedores {
  tipo: string;
  id: string;
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
export interface RespuestaApi {
  success: boolean;
  message: string;
}
export interface RespuestaContenedores {
  code: number;
  data: Contenedores[]
  message: string;
}
export interface RespuestaAduanas {
  code: number;
  data: Aduanas[]
  message: string;
}

export interface DatosSolicitante {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
}

export interface DatosModificacion {
  rfc: string;
  federal: string;
  tipo: string;
  programa: string;
}

export interface DatosDelServicios {
  id?: number;
  desEstatus?: string;
  descripcion?: string;
  tipoDeServicio?: string;
  testado?: string;
}

export interface DatosDelModificacion {
  id?: number;
  calle?: string;
  numeroExterior?: number;
  numeroInterior?: number;
  codigoPosta?: number;
  colonia?: string;
  municipioOAlcaldia?: string;
  entidadFederativa?: string;
  pais?: string;
  telefono?: string;
  desEstatus?: string;
}

export interface DatosDelModificaciondos {
  id?: number;
  desEstatus?: string;
  descripcion?: string;
  tipoDeServicio?: string;
}