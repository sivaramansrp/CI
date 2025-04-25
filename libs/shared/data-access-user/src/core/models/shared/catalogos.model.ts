export interface CatalogoResponse {
  id: number;
  descripcion: string;
}

export interface JSONResponse {
  id: number;
  descripcion: string;
  codigo: string;
  data: string;
}

export interface RespuestaCatalogos {
  code: number;
  data: Catalogo[];
  message: string;
}

/**
 * Representa un catálogo genérico utilizado en el sistema.
 * 
 * @interface Catalogo
 * 
 * @property {number} id - Identificador único del catálogo.
 * @property {string} descripcion - Descripción del catálogo.
 * @property {string} [clave] - Clave opcional asociada al catálogo pais.
 * @property {number} [relacionadaUmtId] - Identificador opcional relacionado con una unidad de medida y tipo (UMT).
 * @property {number} [relacionadaAcotacionId] - Identificador opcional relacionado con una acotación específica.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
  clave?: string;
  relacionadaUmtId?: number;
  relacionadaAcotacionId?: number;
}

/**
 * Representa un catálogo de documentos que extiende las propiedades de un catálogo genérico.
 *
 * @interface CatalogoDocumento
 * @extends {Catalogo}
 *
 * @property {string} [tam] - Tamaño del documento, especificado como una cadena de texto.
 * @property {string} [dpi] - Resolución del documento en puntos por pulgada (DPI).
 * @property {boolean} [nuevo] - Indica si el documento es nuevo.
 * @property {string} [uniqueId] - Identificador único del documento.
 * @property {CatalogoDocumento[]} [adicionales] - Lista de documentos adicionales relacionados.
 * @property {boolean} [cargado] - Indica si el documento ha sido cargado.
 */
export interface CatalogoDocumento extends Catalogo {
  tam?: string;
  dpi?: string;
  nuevo?: boolean;
  uniqueId?: string;
  adicionales?: CatalogoDocumento[];
  cargado?: boolean;
}

export interface CatalogoPaises {
  id: number;
  codigoIso: string;
  nombre: string;
}

export interface HeaderTablaAcuse {
  key: keyof BodyTablaAcuse;
  valor: string;
}

export interface BodyTablaAcuse {
  id: number;
  idDocumento: string;
  documento: string;
  urlPdf: string;
}

export interface RespuestaDocuemntosRequeridos {
  id: number;
  requerido: boolean;
  tipoDocumento: string;
  nombreArchivo: string;
  estatus: string;
}


