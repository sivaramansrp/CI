/**
 * Representa los datos de una persona que desea recibir notificaciones.
 */
export interface RecibirNotificaciones {
  /** Registro Federal de Contribuyentes */
  rfc: string;

  /** Clave Única de Registro de Población */
  curp: string;

  /** Nombre del solicitante */
  nombre: string;

  /** Apellido paterno del solicitante */
  apellidoPaterno: string;

  /** Apellido materno del solicitante */
  apellidoMaterno: string;
}

export interface EnlaceOperativo {
  rfc: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  claveCiudad: string;
  ciudad: string;
  cargo: string;
  telefono: string;
  correo: string;
  suplente: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  colonia: string;
  codigoPostal: string;
  localidad: string;
  delegacionMunicipio: string;
}

export interface RepresentanteLegal {
  idPersonaSolicitud?: string;
  rfcTercero: string;
  rfc: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  correoElectronico: string;
}
