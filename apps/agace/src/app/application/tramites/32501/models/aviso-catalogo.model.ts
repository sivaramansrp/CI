import { CatalogosSelect } from '@libs/shared/data-access-user/src';

/**  
 * Representa un aviso de catálogo con diversas opciones seleccionables.  
 */
export interface AvisoCatalogo {
  /** Clave de fracción arancelaria seleccionada. */
  cveFraccionArancelaria: CatalogosSelect;
  
  /** Entidad federativa seleccionada. */
  entidadFederativa: CatalogosSelect;
  
  /** Delegación o municipio seleccionado. */
  delegacionMunicipio: CatalogosSelect;
  
  /** Colonia seleccionada. */
  colonia: CatalogosSelect;
  
  /** Aduana de importación seleccionada. */
  aduanaDeImportacion: CatalogosSelect;
  
  /** Opción de tipo de documento seleccionado. */
  opcionTipoDeDocumento: CatalogosSelect;
}

/**  
 * Representa una operación de importación con datos esenciales.  
 */
export interface OperacionDeImportacion {
  /** Nombre del agente aduanal. */
  agenteAduanal: string;
  
  /** RFC del importador. */
  rfc: string;
  
  /** Número de pedimento asociado a la importación. */
  numeroDePedimento: string;
  
  /** Aduana donde se realiza la importación. */
  aduanaDeImportacion: string;
}

/**  
 * Representa los requisitos obligatorios de un proceso de importación.  
 */
export interface RequisitosObligatorios {
  /** Número de serie del producto. */
  numeroDeSerie: number;
  
  /** Valor asociado al requisito obligatorio. */
  valor: string;
}
