import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { MateriaPrima231001 } from '../../models/datos.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Creacion del estado inicial para la interfaz de tramite 5701
 */
export interface Solicitud231001State {
  idSolicitud?: number | null;
  numeroRegistroAmbiental: string;
  descripcionGenerica1: string;
  numeroProgramaImmex: string;
  aduana: string;
  mercancias: MateriaPrima231001[];
}

export function createInitialState(): Solicitud231001State {
  return {
    numeroRegistroAmbiental: '',
    descripcionGenerica1: '',
    numeroProgramaImmex: '',
    aduana: '',
    mercancias: [],
    idSolicitud: null,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite231001', resettable: true })
export class Tramite231001Store extends Store<Solicitud231001State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores parciales para actualizar el estado.
   */
  public actualizarEstado(valores: Partial<Solicitud231001State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}
