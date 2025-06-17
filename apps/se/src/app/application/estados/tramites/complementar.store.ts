import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interface que representa el estado de la solicitud para el trámite 90201.
 * Este estado contiene la información relacionada con los datos de la solicitud.
 * @interface ComplementarState complementar.store.ts
 */
export interface ComplementarState {

   permanecera: string;
  tipo: string;
  fechaDeFirma: string;
  fetchaDeFinDeVigencia: string;
}

/**
 * Función para crear el estado inicial de la solicitud.
 * @returns {ComplementarState} El estado inicial con valores vacíos para cada propiedad.
 */
export function createInitialState(): ComplementarState {
  return {
    permanecera: '',
    tipo: '',
    fechaDeFirma: '',
    fetchaDeFinDeVigencia: ''
  };
}

/**
 * Store para la gestión del estado de la solicitud del trámite 221602.
 * Utiliza Akita para la gestión de estado y permite actualizar los valores relacionados con el trámite.
 * @class Tramite221602Store
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Complementar', resettable: true })
export class ComplementarStore extends Store<ComplementarState> {
  /**
   * Constructor del store que inicializa el estado con el estado inicial creado.
   */
  constructor() {
    super(createInitialState());
  }
public setPermanecera(permanecera: string): void {
  this.update((state) => ({
    ...state,
    permanecera,
  }));
}

public setTipo(tipo: string): void {
  this.update((state) => ({
    ...state,
    tipo,
  }));
}

public setFechaDeFirma(fechaDeFirma: string): void {
  this.update((state) => ({
    ...state,
    fechaDeFirma,
  }));
}

public setFetchaDeFinDeVigencia(fetchaDeFinDeVigencia: string): void {
  this.update((state) => ({
    ...state,
    fetchaDeFinDeVigencia,
  }));
}


}
