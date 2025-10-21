import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { MateriaResiduo } from './materia-residuo.model';

/**
 * Representa un aviso de catálogo con diversas opciones seleccionables.
 */
export interface AvisoCatalogo {
  /**
   * Clave de fracción arancelaria seleccionada.
   *
   * @type {CatalogosSelect}
   */
  cveFraccionArancelaria: CatalogosSelect;

  /**
   * Entidad federativa seleccionada.
   *
   * @type {CatalogosSelect}
   */
  entidadFederativa: CatalogosSelect;

  /**
   * Delegación o municipio seleccionado.
   *
   * @type {CatalogosSelect}
   */
  delegacionMunicipio: CatalogosSelect;

  /**
   * Colonia seleccionada.
   *
   * @type {CatalogosSelect}
   */
  colonia: CatalogosSelect;

  /**
   * Aduana de importación seleccionada.
   *
   * @type {CatalogosSelect}
   */
  aduanaDeImportacion: CatalogosSelect;

  /**
   * Opción de tipo de documento seleccionado.
   *
   * @type {CatalogosSelect}
   */
  opcionTipoDeDocumento: CatalogosSelect;
}

/**
 * Representa una operación de importación con datos esenciales.
 */
export interface OperacionDeImportacion {
  /**
   * Nombre del agente aduanal.
   *
   * @type {string}
   */
  agenteAduanal: string;

  /**
   * RFC del importador.
   *
   * @type {string}
   */
  rfc: string;

  /**
   * Número de pedimento asociado a la importación.
   *
   * @type {string}
   */
  numeroDePedimento: string;

  /**
   * Aduana donde se realiza la importación.
   *
   * @type {string}
   */
  aduanaDeImportacion: string;
}

/**
 * Representa los requisitos obligatorios de un proceso de importación.
 */
export interface RequisitosObligatorios {
  /**
   * Número de serie del producto.
   *
   * @type {number}
   */
  numeroDeSerie: number;

  /**
   * Valor asociado al requisito obligatorio.
   *
   * @type {string}
   */
  valor: string;
}

/**
 * Representa un aviso con opciones de radio y su estado de selección.
 */
export interface AvisoOpcionesDeRadio {
  /**
   * Título del aviso.
   *
   * @type {OpcionesDeRadio[]}
   */
  opcionesDeRadio: OpcionesDeRadio[];

  /**
   * Opción seleccionada por el usuario.
   *
   * @type {boolean}
   */
  required: boolean;
}

/**
 * Representa una opción de radio con su etiqueta y valor asociado.
 */
export interface OpcionesDeRadio {
  /**
   * Etiqueta de la opción de radio.
   *
   * @type {string}
   */
  label: string;

  /**
   * Valor asociado a la opción de radio.
   *
   * @type {string | number}
   */
  value: string | number;
}

/**
 * Interface para los datos recibidos al agregar un residuo peligroso
 */
export interface ResiduoAgregadoData {
  acotacion?: string;
  cantidad?: string;
  cantidadLetra?: string;
  nombre?: string;
  descripcion?: string;
  manifiesto?: string;
  capacidad?: string;
}

/**
 * Interface para los datos de residuo peligroso en la tabla
 */
export interface ResiduoPeligroso
  extends DatosResiduos,
    CaracteristicasResiduos {
  id?: number;
  origenResiduoGeneracion: string;
  nombreResiduo: string;
  acotacion: string;
  cantidad: string;
  cantidadLetra: string;
  numeroManifiesto: string;
  capacidad: string;
  materiasPrimasRelacionadas?: MateriaResiduo[];
}

export interface DatosResiduos {
  fraccionCve: string;
  fraccionDesc: string;
  nicoCve: string;
  nicoDesc: string;
  unidadMedidaCve: string;
  unidadMedidaDesc: string;
  residuoCve: string;
  residuoDesc: string;
  residuoNombre: string;
  residuoNombreDesc: string;
  residuoDescCve: string;
  residuoDescDesc: string;
  residuoOtro: string;
}

export interface CaracteristicasResiduos {
  cretiCve: string;
  cretiDesc: string;
  estadoFisicoCve: string;
  estadoFisicoDesc: string;
  estadoFisicoOtro: string;
  tipoContenedorCve: string;
  tipoContenedorDesc: string;
  tipoContenedorOtro: string;
}

export interface ResiduoPeligrosoFormulario {
  origenResiduoGeneracion: string;
  fraccionArancelaria: string;
  nombreResiduo: string;
  nico: string;
  acotacion: string;
  nombreResiduoPeligroso: string;
  cantidad: string;
  cantidadLetra: string;
  unidadMedida: string;
  claveClasificacion: string;
  nombreClasificacion: string;
  descripcionClasificacion: string;
  descripcionOtraClasificacion: string;
  creti: string;
  estadoFisico: string;
  descripcionOtroEstadoFisico: string;
  numeroManifiesto: string;
  tipoContenedor: string;
  descripcionOtroContenedor: string;
  capacidad: string;
  fraccionName: string;
  nicoName: string;
  unidadMedidaName: string;
  claveClasificacionDesc: string;
  nameClasificacion: string;
  descClasificacion: string;
  cretiDesc: string;
  estadoFisicoDesc: string;
  tipoContenedorDesc: string;
}
