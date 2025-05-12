import { CrosslistComponent } from "@libs/shared/data-access-user/src";

/**
 * Interfaz que define la estructura de un botón utilizado en el componente Crosslist.
 * Cada botón tiene un nombre, una clase CSS y una función asociada.
 */
export interface CrosslistBoton {
  /**
   * Nombre del botón que se mostrará en la interfaz.
   */
  btnNombre: string;

  /**
   * Clase CSS que define el estilo del botón.
   */
  class: string;

  /**
   * Función que se ejecutará al hacer clic en el botón.
   */
  funcion: () => void;
}

/**
 * Función que genera una lista de botones para el componente Crosslist.
 * Cada botón tiene una funcionalidad específica, como agregar o quitar elementos.
 * 
 * crosslistComponent Componente Crosslist al que se asocian las funciones de los botones.
 * Devuelve un arreglo de objetos `CrosslistBoton` con las configuraciones de los botones.
 */
export const OBTENER_BOTONES_CROSSLIST = (crosslistComponent: CrosslistComponent): CrosslistBoton[] => [
  {
    btnNombre: 'Agregar todos',
    class: 'btn-default',
    funcion: (): void => {
      if (crosslistComponent) {
        crosslistComponent.agregar('t');
      }
    },
  },
  {
    btnNombre: 'Agregar selección',
    class: 'btn-primary',
    funcion: (): void => {
      if (crosslistComponent) {
        crosslistComponent.agregar('');
      }
    },
  },
  {
    btnNombre: 'Restar selección',
    class: 'btn-primary',
    funcion: (): void => {
      if (crosslistComponent) {
        crosslistComponent.quitar('');
      }
    },
  },
  {
    btnNombre: 'Restar todos',
    class: 'btn-default',
    funcion: (): void => {
      if (crosslistComponent) {
        crosslistComponent.quitar('t');
      }
    },
  },
];