import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado inicial del trámite 120404.
 * Contiene propiedades clave para la gestión del trámite.
 */
export interface Tramite120404State{
    asignacionRadio:boolean,
    asignacionsolitud:string,
    numTramite:string  
}

/**
 * Función que establece el estado inicial del trámite.
 * Devuelve los valores predeterminados para cada propiedad.
 */

export function createInitialState(): Tramite120404State {
    return {
        asignacionRadio: false,
        asignacionsolitud: '',
        numTramite: ''
    }
}
/**
 * Tienda Akita para la gestión del estado del trámite 120404.
 * Permite almacenar y actualizar la información del trámite en la aplicación.
 */
@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite120404', resettable: true })
  export class Tramite120404Store extends Store<Tramite120404State> {
    constructor() {
      super(createInitialState());
    }

  /**
     * Método para actualizar datos en la tienda.
     * Recibe un objeto parcial con datos del trámite y los fusiona con el estado actual.
     *
     * @param datos Datos parciales a actualizar en la tienda.
  */
  public establecerDatos(datos: Partial<Tramite120404State>): void {
    this.update((state) => ({
      ...state,
      ...datos,
    }));
}
  }