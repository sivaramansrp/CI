import { CatalogosSelect } from '@libs/shared/data-access-user/src';

/**
 * 
 * Representa los datos del destinatario.
 * */
export interface Destinatario {
  /**
   * Tipo de persona (física o moral).
   */
  tipoPersona: string;
  /**
   * País donde se encuentra el destinatario.
   */
  pais: string;
  /**
   * Estado o localidad del destinatario.
   */
  estadoLocalidad: string;
  /**
   * Municipio o alcaldía del destinatario.
   */
  municipioAlcaldia: string;
  /**
   * Localidad del destinatario.
   */
  localidad: string;
  /**
   * Entidad federativa del destinatario.
   */
  entidadFederativa: string;
  /**
   * Código postal del destinatario.
   */
  codigoPostaloEquivalente: string;
  /**
   * Colonia del destinatario.
   */
  colonia: string;
  /**
   * Colonia equivalente del destinatario.
   */
  coloniaoEquivalente: string;
  /**
   * Calle del destinatario.
   */
  calle: string;
  /**
   * Número exterior del destinatario.
   */
  numeroExterior: string;
  /**
   * Número interior del destinatario.
   */
  numeroInterior: string;
  /**
   * Lada del teléfono del destinatario.
   */
  lada: string;
  /**
   * Teléfono del destinatario.
   */
  telefono: string;
  /**
   * Correo electrónico del destinatario.
   */
  correoElectronico: string;
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
