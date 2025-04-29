import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que representa el estado completo del trámite 240102.
 *
 * @property {number} [tabSeleccionado] - Pestaña actualmente activa en el flujo.
 * @property {DestinoFinal[]} destinatarioFinalTablaDatos - Lista de destinatarios finales registrados.
 * @property {Proveedor[]} proveedorTablaDatos - Lista de proveedores registrados.
 * @property {PagoDerechosFormState} pagoDerechos - Información del formulario de pago de derechos.
 * @property {MercanciaDetalle[]} merccancialTablaDatos - Lista de mercancías registradas.
 * @property {DatosDelTramiteFormState} datosDelTramite - Información general del formulario de datos del trámite.
 */
export interface Tramite80303State {
  tabSeleccionado?: number;
}

/**
 * Crea el estado inicial para el trámite 240102.
 *
 * @function createInitialState
 * @returns {Tramite240102State} El estado inicial del store.
 */
export function createInitialState(): Tramite80303State {
  return {
    tabSeleccionado: 1,
  };
}

/**
 * Store que maneja el estado del trámite 240102.
 * Utiliza Akita para el control reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite80303', resettable: true })
export class Tramite80303Store extends Store<Tramite80303State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Cambia la pestaña actualmente seleccionada.
   *
   * @method updateTabSeleccionado
   * @param {number} tabSeleccionado - Índice de la nueva pestaña seleccionada.
   * @returns {void}
   */
  public updateTabSeleccionado(tabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      tabSeleccionado: tabSeleccionado,
    }));
  }
}
