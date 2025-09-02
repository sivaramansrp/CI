import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { MateriaPrima } from '../../models/datos.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Creacion del estado inicial para la interfaz de tramite 5701
 */
export interface Solicitud231001State {
  numeroRegistroAmbiental: string;
  descripcionGenerica1: string;
  nombreDeLaMateriaPrima: string;
  cantidad: string;
  numeroProgramaImmex: Catalogo | null;
  aduanas: Catalogo | null;
  unidadMedidaComercial: Catalogo | null;
  capituloFraccion: Catalogo | null;
  partidaFraccion: Catalogo | null;
  subPartidaFraccion: Catalogo | null;
  fraccion: Catalogo | null;
  cantidadEnLetra?: string;
  mercanciasTablaDatos:MateriaPrima[];
 
}

export function createInitialState(): Solicitud231001State {
  return {
    numeroRegistroAmbiental: '',
    descripcionGenerica1: '',
    nombreDeLaMateriaPrima: '',
    cantidad:'',
    numeroProgramaImmex: null,
    aduanas: null,
    unidadMedidaComercial: null,
    capituloFraccion: null,
    partidaFraccion: null,
    subPartidaFraccion: null,
    fraccion: null,
    cantidadEnLetra: '100',
    mercanciasTablaDatos:[]
  }
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