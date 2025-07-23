import { CatalogosSelect } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que representa los datos de un destinatario.
 */
export interface Destinatario {

  tipoPersona: number;

  /** Registro Federal de Contribuyentes (RFC) del destinatario. */
  rfc: string;

  denominacion: string;

   /** Nombre completo del destinatario. */
  nombre: string;

  apellidoPaterno: string;

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

  paisNombre?: string;

  /** Colonia del domicilio del destinatario. */
  colonia: number;

  coloniaNombre?: string;

  /** Municipio donde reside el destinatario. */
  municipio: number;

  municipioNombre?: string;

  /** Localidad específica del domicilio del destinatario. */
  localidad: number;

  localidadNombre?: string;

  lada: string;

  /** Estado asociado al domicilio del destinatario. */
  estado: number;

  estadoNombre?: string;

  /** Estado alternativo (o subdivisión administrativa) asociado al domicilio del destinatario, si aplica. */
  estado2: string;

  /** Código postal del domicilio del destinatario. */
  codigo: number;

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
