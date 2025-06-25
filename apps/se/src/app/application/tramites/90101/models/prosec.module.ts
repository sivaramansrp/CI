/**
 * @interface LISTAPASOWIZARD
 * @description Interfaz que representa un paso en el asistente (wizard).
 */
export interface LISTAPASOWIZARD {
  /**
   * @property {number} indice
   * @description Índice del paso.
   */
  indice: number;

  /**
   * @property {string} titulo
   * @description Título del paso.
   */
  titulo: string;

  /**
   * @property {boolean} activo
   * @description Indica si el paso está activo.
   */
  activo: boolean;

  /**
   * @property {boolean} completado
   * @description Indica si el paso está completado.
   */
  completado: boolean;
}

/**
 * @interface ACCIONBOTON
 * @description Interfaz que representa un botón de acción.
 */
export interface ACCIONBOTON {
  /**
   * @property {string} accion
   * @description Acción que se debe realizar.
   */
  accion: string;

  /**
   * @property {number} valor
   * @description Valor asociado a la acción.
   */
  valor: number;
}

/**
 * @interface Plantas
 * @description Interfaz que representa una planta.
 */
export interface Plantas {
  /**
   * @property {string} modalidad
   * @description Modalidad de la planta.
   */
  modalidad: string;

  /**
   * @property {string} Estado
   * @description Estado donde se encuentra la planta.
   */
  Estado: string;

  /**
   * @property {string} RepresentacionFederal
   * @description Representación federal de la planta.
   */
  RepresentacionFederal: string;

  /**
   * @property {string} ActividadProductiva
   * @description Actividad productiva de la planta.
   */
  ActividadProductiva: string;
}

/**
 * @interface FilaPlantas
 * @description Interfaz que representa una fila de datos de plantas.
 */
export interface FilaPlantas {
  /**
   * @property {string} calle
   * @description Calle de la planta.
   */
  calle: string;

  /**
   * @property {string} numeroExterior
   * @description Número exterior de la planta.
   */
  numeroExterior: string;

  /**
   * @property {string} numeroInterior
   * @description Número interior de la planta.
   */
  numeroInterior: string;

  /**
   * @property {number} codigoPostal
   * @description Código postal de la planta.
   */
  codigoPostal: number;

  /**
   * @property {string} colonia
   * @description Colonia de la planta.
   */
  colonia: string;

  /**
   * @property {string} municipioOAlcaldia
   * @description Municipio o alcaldía de la planta.
   */
  municipioOAlcaldia: string;
}

/**
 * @interface FilaProductos
 * @description Interfaz que representa una fila de datos de productos.
 */
export interface FilaProductos {
  /**
   * @property {string} contribuyentes
   * @description Registro federal de contribuyentes.
   */
  contribuyentes: string;

  /**
   * @property {string} razonSocial
   * @description Denominación o razón social.
   */
  razonSocial: string;

  /**
   * @property {string} Correo
   * @description Correo electrónico del contribuyente.
   */
  Correo: string;
}

/**
 * @interface FilaSectors
 * @description Interfaz que representa una fila de sectores económicos.
 */
export interface FilaSectors {
  /**
   * @property {string} sectorLista
   * @description Nombre del sector listado.
   */
  sectorLista: string;

  /**
   * @property {string} sectorClave
   * @description Clave del sector económico.
   */
  sectorClave: string;
}

/**
 * @interface SectoresYMercancias
 * @description Interfaz que representa los sectores y sus mercancías asociadas.
 */
export interface SectoresYMercancias {
  /**
   * @property {string} sector
   * @description Nombre del sector correspondiente.
   */
  sector: string;

  /**
   * @property {string} Fraccion_arancelaria
   * @description Fracción arancelaria asignada a la mercancía.
   */
  Fraccion_arancelaria: string;
}

/**
 * @interface ListaDeDatosFinal
 * @description Interfaz que representa la lista final consolidada de datos de trámite.
 */
export interface ListaDeDatosFinal {
  /**
   * @property {Plantas[]} plantas
   * @description Lista de plantas registradas.
   */
  plantas: Plantas[];

  /**
   * @property {SectoresYMercancias[]} sectoresYMercancias
   * @description Lista de sectores y mercancías seleccionadas.
   */
  sectoresYMercancias: SectoresYMercancias[];
}

/**
 * @function createDatosState
 * @method createDatosState
 * @description
 * Función para generar el estado inicial de los datos del formulario a partir de parámetros opcionales.
 *
 * @param {Partial<ListaDeDatosFinal>} params - Objeto parcial con datos iniciales (puede estar vacío).
 * @returns {ListaDeDatosFinal} Estado inicializado con datos por defecto o proporcionados.
 */
export function createDatosState(params: Partial<ListaDeDatosFinal> = {}): ListaDeDatosFinal {
  return {
    plantas: params.plantas || [],
    sectoresYMercancias: params.sectoresYMercancias || [],
  };
}

/**
 * @interface PlantasDatosResponse
 * @description Interfaz que representa la respuesta del servicio para datos de plantas.
 */
export interface PlantasDatosResponse {
  /**
   * @property {FilaPlantas[]} plantasDatos
   * @description Arreglo de filas de información de plantas.
   */
  plantasDatos: FilaPlantas[];

  /**
   * @property {unknown} [key]
   * @description Propiedades adicionales opcionales contenidas en la respuesta.
   */
  [key: string]: unknown;
}
