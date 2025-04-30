export interface RespuestaSolicitud {
  codigo: number;
  data: string;
  descripcion: string;
  message: string;
}

export interface DatosGenerales {
  curp?: string;
  rfc?: string;
  nombreRazonSocial: string;
  primerApellido?: string;
  segundoApellido?: string;
  actEconomica: string;
  correo: string;
}
export interface DomicilioFiscal {
  pais: string;
  codigoPostal: string;
  entidadFederativa: string;
  municipio: string;
  localidad: string;
  colonia: string;
  calle: string;
  nExt: string;
  nInt: string;
  lada: string;
  telefono: string;
}
export interface PersonaTerceros {
  nombre: string;
  correo: string;
}







/** Hasta aqui terminan las interfaces de la solicitud */

export interface Personas {
  razonSocial: string;
  correo: string;
}

export interface TipoDocumento {
  tipoDocumento: number;
}

export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}
export interface VistaEmergente {
  abierto: boolean;
  indice: number;
}
