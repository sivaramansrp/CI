import { CrosslistComponent } from "@libs/shared/data-access-user/src";

/**
 * Interfaz CrosslistBoton
 * Descripción: Define la estructura de un botón utilizado en el componente Crosslist.
 * Cada botón tiene un nombre, una clase CSS y una función asociada.
 */
export interface CrosslistBoton {
  /**
   * Propiedad btnNombre
   * Descripción: Nombre del botón que se mostrará en la interfaz.
   */
  btnNombre: string;

  /**
   * Propiedad class
   * Descripción: Clase CSS que define el estilo del botón.
   */
  class: string;

  /**
   * Propiedad funcion
   * Descripción: Función que se ejecutará al hacer clic en el botón.
   */
  funcion: () => void;
}

/**
 * Función OBTENER_BOTONES_CROSSLIST
 * Descripción: Genera una lista de botones para el componente Crosslist.
 * Cada botón tiene una funcionalidad específica, como agregar o quitar elementos.
 * 
 * Parámetros:
 *   - crosslistComponent: Componente Crosslist al que se asocian las funciones de los botones.
 * 
 * Devuelve:
 *   - Un arreglo de objetos `CrosslistBoton` con las configuraciones de los botones.
 */
export const OBTENER_BOTONES_CROSSLIST = (crosslistComponent: CrosslistComponent): CrosslistBoton[] => [
  {
    /**
     * Botón Agregar
     * Descripción: Permite agregar un elemento específico al componente Crosslist.
     */
    btnNombre: 'Agregar',
    class: 'btn-primary',
    funcion: (): void => {
      if (crosslistComponent) {
        crosslistComponent.agregar('t');
      }
    },
  },
  {
    /**
     * Botón Agregar todo
     * Descripción: Permite agregar todos los elementos al componente Crosslist.
     */
    btnNombre: 'Agregar todo',
    class: 'btn-default',
    funcion: (): void => {
      if (crosslistComponent) {
        crosslistComponent.agregar('');
      }
    },
  },
  {
    /**
     * Botón Remover
     * Descripción: Permite quitar un elemento específico del componente Crosslist.
     */
    btnNombre: 'Remover',
    class: 'btn-danger',
    funcion: (): void => {
      if (crosslistComponent) {
        crosslistComponent.quitar('');
      }
    },
  },
  {
    /**
     * Botón Remover todo
     * Descripción: Permite quitar todos los elementos del componente Crosslist.
     */
    btnNombre: 'Remover todo',
    class: 'btn-default',
    funcion: (): void => {
      if (crosslistComponent) {
        crosslistComponent.quitar('t');
      }
    },
  },
];


/**
 * Matriz de opciones para botones de radio.
 *
 * Cada objeto representa una opción de botón de radio con:
 * - `label`: El texto mostrado a la usuaria.
 * - `value`: El valor correspondiente de la opción.
 */
export const OPCIONES_DE_BOTON_DE_RADIO = [
    {
        label: 'Exento',
        value: '1',
    },
    {
        label: 'Autorización',
        value: '0',
    }
];