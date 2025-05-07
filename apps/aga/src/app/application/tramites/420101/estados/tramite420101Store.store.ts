import { CROSLISTA_DE_DATOS } from '../constants/proveedores.enum';
import { DatosDelRegistrarManual } from '../models/proveedores.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Tramite420101State {

  /**
   * @type {string}
   * RFC del contribuyente
   */
  registroFederalContribuyente: string;

  /**
   * @type {string}
   * Razón social del contribuyente
   */
  razonSocial: string;

  /**
   * @type {string}
   * Domicilio fiscal del contribuyente
   */
  domicilioFiscal: string;

  /**
   * @type {number | undefined}
   * Índice de la pestaña seleccionada
   */
  tabSeleccionado?: number;

  /**
   * @type {string[]}
   * Lista de datos de uso de norma
   */
  usoCrossListDatos: string[];

  /**
   * @type {DatosDelRegistrarManual[]}
   * Datos de los proveedores registrados manualmente
   */
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

  /**
   * @constructor
   * @description
   * Constructor de la tienda del trámite 420101. Inicializa el estado con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @method updateProveedoresTabla
   * @description Actualiza la lista de proveedores registrados manualmente en la tabla.
   * @param {DatosDelRegistrarManual[]} datosProveedoresManual - Nuevos datos de los proveedores.
   */
  public updateProveedoresTabla(datosProveedoresManual: DatosDelRegistrarManual[]): void {
    this.update((state) => ({
      ...state,
      datosProveedoresManual
    }));
  }

  /**
   * @method updateCrossListDatos
   * @description Actualiza la lista de datos de uso de norma.
   * @param {string[]} usoNormaDatos - Nuevos datos de uso de norma.
   */
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

  /**
   * @method updateRegistroFederalContribuyente
   * @description Actualiza el RFC del contribuyente.
   * @param {string} registroFederalContribuyente - Nuevo RFC del contribuyente.
   */
  public updateRegistroFederalContribuyente(registroFederalContribuyente: string): void {
    this.update((state) => ({
      ...state,
      registroFederalContribuyente,
    }));
  }

  /**
   * @method updateRazonSocial
   * @description Actualiza la razón social del contribuyente.
   * @param {string} razonSocial - Nueva razón social del contribuyente.
   */
  public updateRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  /**
   * @method updateDomicilioFiscal
   * @description Actualiza el domicilio fiscal del contribuyente.
   * @param {string} domicilioFiscal - Nuevo domicilio fiscal del contribuyente.
   */
  public updateDomicilioFiscal(domicilioFiscal: string): void {
    this.update((state) => ({
      ...state,
      domicilioFiscal,
    }));
  }
}
