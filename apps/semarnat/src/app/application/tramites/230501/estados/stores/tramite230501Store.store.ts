import { Injectable } from '@angular/core';
import { PagoDerechosState } from '../../models/materiales-peligrosos.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';


/**
 * @interface Tramite230501State
 * @description Define el estado para el trámite 230501, incluyendo datos de tablas, formularios y configuraciones.
 */
export interface Tramite230501State {
    pagoDerechosState: PagoDerechosState;
  opcionesColapsableState: boolean;
}

/**
 * @function createInitialState
 * @description Crea y devuelve el estado inicial para el trámite 230501.
 * @returns {Tramite230501State} El estado inicial del trámite.
 */
export function createInitialState(): Tramite230501State {
  return {
    opcionesColapsableState: false,
    pagoDerechosState: {
      clave: '',
      dependencia: '',
      banco: '',
      llavePago: '',
      fecha: '',
      importePago: ''
    }
}
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Tramite230501', resettable: true })
export class Tramite230501Store extends Store<Tramite230501State> {
  constructor() {
    super(createInitialState());
  }
  /**
   * Establece una propiedad del estado de pago de derechos.
   *
   * @param property - El nombre de la propiedad del estado de pago de derechos que se va a actualizar.
   * @param value - El nuevo valor para la propiedad especificada.
   * @returns void
   */
  public setPagoDerechosStateProperty(property: string, value: string): void {
    this.update((state) => ({
      ...state,
      pagoDerechosState: {
        ...state.pagoDerechosState,
        [property]: value,
      },
    }));
  }
}
