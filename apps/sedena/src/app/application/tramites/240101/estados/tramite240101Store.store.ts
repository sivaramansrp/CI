import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {
  DestinoFinal,
  Proveedor,
} from '../../../shared/models/terceros-relacionados.model';
import { PagoDerechosFormState } from '../../../shared/models/pago-de-derechos.model';
import {
  DatosDelTramiteFormState,
  MercanciaDetalle,
} from '../../../shared/models/datos-del-tramite.model';

export interface Tramite240101State {
  tabSeleccionado?: number;
  destinatarioFinalTablaDatos: DestinoFinal[];
  proveedorTablaDatos: Proveedor[];
  pagoDerechos: PagoDerechosFormState;
  merccancialTablaDatos: MercanciaDetalle[];
  datosDelTramite: DatosDelTramiteFormState;
}

/**
 * Crea el estado inicial para el trámite 240101.
 *
 * @returns {Tramite240101State} El estado inicial del store.
 */
export function createInitialState(): Tramite240101State {
  return {
    tabSeleccionado: 1,
    destinatarioFinalTablaDatos: [],
    proveedorTablaDatos: [],
    pagoDerechos: {
      claveReferencia: '',
      cadenaDependencia: '',
      banco: '',
      llavePago: '',
      fechaPago: '',
      importePago: '',
    },
    merccancialTablaDatos: [],
    datosDelTramite: {
      permisoGeneral: '',
      usoFinal: '',
      aduanasSeleccionadas: [],
      paisDestino: '',
    },
  };
}

/**
 * Store que maneja el estado del trámite 240101.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite240101', resettable: true })
export class Tramite240101Store extends Store<Tramite240101State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Cambia la pestaña actualmente seleccionada.
   *
   * @param tabSeleccionado - Índice de la nueva pestaña seleccionada.
   */
  public updateTabSeleccionado(tabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      tabSeleccionado: tabSeleccionado,
    }));
  }

  public updateDatosDelTramiteFormState(
    datosDelTramiteFormState: DatosDelTramiteFormState
  ): void {
    this.update((state) => ({
      ...state,
      datosDelTramite: datosDelTramiteFormState,
    }));
  }

  public updatePagoDerechosFormState(
    pagoDerechosFormState: PagoDerechosFormState
  ): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: pagoDerechosFormState,
    }));
  }

  public updateDestinatarioFinalTablaDatos(
    newDestinatarios: DestinoFinal[]
  ): void {
    this.update((state) => ({
      ...state,
      destinatarioFinalTablaDatos: [
        ...state.destinatarioFinalTablaDatos,
        ...newDestinatarios,
      ],
    }));
  }

  public updateProveedorTablaDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  public updateMercanciaTablaDatos(newMercancia: MercanciaDetalle[]): void {
    this.update((state) => ({
      ...state,
      merccancialTablaDatos: [...state.merccancialTablaDatos, ...newMercancia],
    }));
  }
}
