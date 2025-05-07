import { CROSLISTA_DE_DATOS } from '../constants/proveedores.enum';
import { DatosDelRegistrarManual } from '../models/proveedores.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Tramite420101State {

  registroFederalContribuyente: string;
  razonSocial: string;
  domicilioFiscal: string;

  /**
   * @type {number | undefined}
   * Índice de la pestaña seleccionada
   */
  tabSeleccionado?: number;
  usoCrossListDatos: string[];
  datosProveedoresManual: DatosDelRegistrarManual[];

}

/**
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial para la tienda del trámite 420101.
 * @returns {Tramite420101State} Estado inicial.
 */
export function createInitialState(): Tramite420101State {
  return {
    tabSeleccionado: 1,
    datosProveedoresManual: [],
    registroFederalContribuyente: '',
    razonSocial: '',
    domicilioFiscal: '',
    usoCrossListDatos: CROSLISTA_DE_DATOS,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite420101', resettable: true })
/**
 * @class
 * @name Tramite420101Store
 * @description
 * Tienda para manejar el estado del trámite 420101. Proporciona métodos para actualizar
 * diferentes partes del estado.
 * @extends {Store<Tramite420101State>}
 */
export class Tramite420101Store extends Store<Tramite420101State> {
  constructor() {
    super(createInitialState());
  }


  public updateProveedoresTabla(datosProveedoresManual: DatosDelRegistrarManual[]): void {
    this.update((state) => ({
      ...state,
      datosProveedoresManual
    }));
  }

  public updateCrossListDatos(usoNormaDatos: string[]): void {
    this.update((state) => ({
      ...state,
      usoNormaDatos
    }));
  }
  /**
   * @method updateTabSeleccionado
   * @description Actualiza el índice de la pestaña seleccionada.
   * @param {number} tabSeleccionado - Nuevo índice de la pestaña.
   */
  public updateTabSeleccionado(tabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      tabSeleccionado: tabSeleccionado,
    }));
  }


  public updateRegistroFederalContribuyente(registroFederalContribuyente: string): void {
    this.update((state) => ({
      ...state,
      registroFederalContribuyente,
    }));
  }


  public updateRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  public updateDomicilioFiscal(domicilioFiscal: string): void {
    this.update((state) => ({
      ...state,
      domicilioFiscal,
    }));
  }
}
