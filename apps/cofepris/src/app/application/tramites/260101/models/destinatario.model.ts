import { CatalogosSelect } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que representa los datos de un destinatario.
 */
export interface Destinatario {
  /** Identificador único del destinatario. */
  tipoPersona: number;

  /** Registro Federal de Contribuyentes (RFC) del destinatario. */
  rfc: string;

  /** Denominación o razón social del destinatario. */
  denominacion: string;

  /** Nombre completo del destinatario. */
  nombre: string;

  /** Apellido paterno del destinatario. */
  apellidoPaterno: string;

  /** Apellido materno del destinatario. */
  apellidoMaterno: string;

  /** Clave Única de Registro de Población (CURP) del destinatario. */
  curp: string;

  /** Número telefónico de contacto del destinatario. */
  telefono: string;

  /** Correo electrónico del destinatario. */
  correoElectronico: string;

  /** Calle correspondiente al domicilio del destinatario. */
  calle: string;

  /** Número exterior del domicilio del destinatario. */
  numeroExterior: string;

  /** Número interior del domicilio del destinatario, si aplica. */
  numeroInterior: string;

  /** País donde reside el destinatario. */
  pais: number;

  /** Nombre del país donde reside el destinatario. */
  paisNombre?: string;

  /** Colonia del domicilio del destinatario. */
  colonia: number;

  /** Nombre de la colonia donde reside el destinatario. */
  coloniaNombre?: string;

  /** Municipio donde reside el destinatario. */
  municipio: number;

  /** Nombre del municipio donde reside el destinatario. */
  municipioNombre?: string;

  /** Localidad específica del domicilio del destinatario. */
  localidad: number;

  /** Nombre de la localidad donde reside el destinatario. */
  localidadNombre?: string;

  /** Clave LADA del teléfono del destinatario. */
  lada: string;

  /** Estado asociado al domicilio del destinatario. */
  estado: number;

  /** Nombre del estado asociado al domicilio del destinatario. */
  estadoNombre?: string;

  /** Estado alternativo (o subdivisión administrativa) asociado al domicilio del destinatario, si aplica. */
  estado2: string;

  /** Código postal del domicilio del destinatario. */
  codigo: number;

  /** Nombre del código postal del domicilio del destinatario. */
  codigoNombre?: string;
}

/**
 * Interfaz que agrupa los catálogos relacionados con la información de un destinatario.
 */
export interface DestinatarioCatalogos {
  /** Catálogo de países disponibles para el domicilio del destinatario. */
  paisCatalogo: CatalogosSelect;

  /** Catálogo de estados disponibles para el domicilio del destinatario. */
  estadoCatalogo: CatalogosSelect;

  /** Catálogo de municipios disponibles para el domicilio del destinatario. */
  municipioCatalogo: CatalogosSelect;

  /** Catálogo de localidades disponibles para el domicilio del destinatario. */
  localidadCatalogo: CatalogosSelect;

  /** Catálogo de códigos postales disponibles para el domicilio del destinatario. */
  codigoCatalogo: CatalogosSelect;

  /** Catálogo de colonias disponibles para el domicilio del destinatario. */
  coloniaCatalogo: CatalogosSelect;
}
