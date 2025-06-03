import {
  Catalogo} from '@ng-mf/data-access-user';
/**
 * Representa la información relacionada con un cupo o asignación.
 */
export interface DatoCupo {
  /**
   * Descripción detallada del cupo o asignación.
   */
  description: string;

  /**
   * Tipo de asignación que se aplica al cupo.
   */
  assignmentType: string;

  /**
   * Códigos asociados al cupo, que pueden ser un arreglo de cadenas o una sola cadena.
   */
  codes: string[] | string;

  /**
   * Cuota asignada expresada como cadena (por ejemplo, porcentaje o cantidad).
   */
  quota: string;
}


/**
 * Interface que representa una fila dentro de la tabla de cupos.
 */
export interface FilaCupo {
  /**
   * Descripción detallada de la fila o del cupo.
   */
  descripcion: string;

  /**
   * Tipo de asignación asociado a esta fila.
   */
  tipoAsignacion: string;

  /**
   * Fracciones relacionadas con la fila, que pueden ser un arreglo de cadenas o una sola cadena.
   */
  fracciones: string[] | string;

  /**
   * Tipo de cupo representado en la fila.
   */
  tipoCupo: string;
}


/**
 * Evento que ocurre al hacer clic en una acción dentro de la tabla.
 */
export interface EventoAccionTabla {
  /**
   * Fila de la tabla sobre la cual se realizó la acción.
   */
  row: FilaCupo;

  /**
   * Nombre o identificador de la columna donde se hizo clic.
   */
  column: string;
}


/**
 * Representa la respuesta que contiene un arreglo de elementos del catálogo.
 */
export interface RespuestaDataArray {
  /**
   * Arreglo de objetos tipo `Catalogo` que contiene los datos de la respuesta.
   */
  data: Catalogo[];
}


/**
 * Representa la respuesta que contiene un arreglo de tratados.
 */
export interface RespuestaTratado {
  /**
   * Arreglo de objetos tipo `Catalogo` que representan los tratados.
   */
  tratado: Catalogo[];
}
