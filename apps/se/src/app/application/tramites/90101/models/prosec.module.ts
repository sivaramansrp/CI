/**
 * @descripcion
 * Interfaz que representa un paso en el asistente (wizard).
 */
export interface LISTAPASOWIZARD {
  /**
   * @descripcion Índice del paso.
   */
  indice: number;
  /**
   * @descripcion Título del paso.
   */
  titulo: string;
  /**
   * @descripcion Indica si el paso está activo.
   */
  activo: boolean;
  /**
   * @descripcion Indica si el paso está completado.
   */
  completado: boolean;
}

/**
 * @descripcion
 * Interfaz que representa un botón de acción.
 */
export interface ACCIONBOTON {
  /**
   * @descripcion Acción que se debe realizar.
   */
  accion: string;
  /**
   * @descripcion Valor asociado a la acción.
   */
  valor: number;
}

/**
 * @descripcion
 * Interfaz que representa una planta.
 */
export interface Plantas {
  /**
   * @descripcion Modalidad de la planta.
   */
  modalidad: string;
  /**
   * @descripcion Estado donde se encuentra la planta.
   */
  Estado: string;
  /**
   * @descripcion Representación federal de la planta.
   */
  RepresentacionFederal: string;
  /**
   * @descripcion Actividad productiva de la planta.
   */
  ActividadProductiva: string;
}

/**
 * @descripcion
 * Interfaz que representa una fila de datos de plantas.
 */
export interface FilaPlantas {
  /**
   * @descripcion Calle de la planta.
   */
  calle: string;
  /**
   * @descripcion Número exterior de la planta.
   */
  numeroExterior: string;
  /**
   * @descripcion Número interior de la planta.
   */
  numeroInterior: string;
  /**
   * @descripcion Código postal de la planta.
   */
  codigoPostal: number;
  /**
   * @descripcion Colonia de la planta.
   */
  colonia: string;
  /**
   * @descripcion Municipio o alcaldía de la planta.
   */
  municipioOAlcaldia: string;
}

/**
 * @descripcion
 * Interfaz que representa una fila de datos de productos.
 */
export interface FilaProductos {
  /**
   * @descripcion Registro federal de contribuyentes.
   */
  contribuyentes: string;
  /**
   * @descripcion Denominación o razón social.
   */
  razonSocial: string;
  /**
   * @descripcion Correo electrónico.
   */
  Correo: string;
}

/**
 * @descripcion
 * Interfaz que representa una fila de sectores.
 */
export interface FilaSectors {
  /**
   * @descripcion Nombre del sector.
   */
  sectorLista: string;
  /**
   * @descripcion Clave del sector.
   */
  sectorClave: string;
}

/**
 * @descripcion
 * Interfaz que representa los sectores y mercancías.
 */
export interface SectoresYMercancias {
  /**
   * @descripcion Sector de la mercancía.
   */
  sector: string;
  /**
   * @descripcion Fracción arancelaria de la mercancía.
   */
  Fraccion_arancelaria: string;
}

/**
 * @descripcion
 * Interfaz que representa la lista final de datos.
 */
export interface ListaDeDatosFinal {
  /**
   * @descripcion Lista de plantas.
   */
  plantas: Plantas[];
  /**
   * @descripcion Lista de sectores y mercancías.
   */
  sectoresYMercancias: SectoresYMercancias[];
}

/**
 * @descripcion
 * Función para crear el estado de los datos.
 * @param params Parámetros parciales para inicializar el estado.
 * @returns El estado inicializado.
 */
export function createDatosState(params: Partial<ListaDeDatosFinal> = {}): ListaDeDatosFinal {
  return {
    plantas: params.plantas || [],
    sectoresYMercancias: params.sectoresYMercancias || [],
  };
}

/**
 * @descripcion
 * Interfaz para la respuesta de datos de plantas.
 */
export interface PlantasDatosResponse {
  /**
   * @descripcion Arreglo de datos de plantas.
   */
  plantasDatos: FilaPlantas[];
  [key: string]: unknown;
}