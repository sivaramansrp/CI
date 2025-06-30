import { DatosDelTramiteFormState, JustificacionTramiteFormState } from '../../../shared/models/datos-del-tramite.model';
import { DestinoFinal } from '../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaDetalle } from '../../../shared/models/datos-del-tramite.model';
import { PagoDerechosFormState } from '../../../shared/models/pago-de-derechos.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que representa el estado completo del trámite 240311.
 */
export interface Tramite240311State {
  /** Número de la pestaña actualmente seleccionada en el flujo del trámite. */
  tabSeleccionado?: number;
  /** Lista de destinatarios finales registrados en la tabla. */
  destinatarioFinalTablaDatos: DestinoFinal[];
  /** Lista de proveedores registrados en la tabla. */
  proveedorTablaDatos: Proveedor[];
  /** Estado del formulario de pago de derechos. */
  pagoDerechos: PagoDerechosFormState;
  /** Lista de mercancías registradas en la tabla. */
  merccancialTablaDatos: MercanciaDetalle[];
  /** Estado del formulario de datos generales del trámite. */
  datosDelTramite: DatosDelTramiteFormState;
  /** Estado del formulario de justificación del trámite. */
  justificacionTramiteFormState: JustificacionTramiteFormState;
}

/**
 * Crea el estado inicial para el trámite 240311.
 * @returns {Tramite240311State} Estado inicial del store.
 */
export function createInitialState(): Tramite240311State {
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
    justificacionTramiteFormState: {
      justificacion: ''
    }
  };
}

/**
 * Store que maneja el estado del trámite 240311 usando Akita.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite240311', resettable: true })
export class Tramite240311Store extends Store<Tramite240311State> {
  /**
   * Constructor del store. Inicializa el estado con los valores por defecto definidos en `createInitialState`.
   */
  constructor() {
    super(createInitialState());
  }
  
  /**
   * Actualiza los datos generales del formulario de trámite.
   * @param {DatosDelTramiteFormState} datosDelTramiteFormState - Estado actualizado del formulario.
   */
  public updateDatosDelTramiteFormState(
    datosDelTramiteFormState: DatosDelTramiteFormState
  ): void {
    this.update((state) => ({
      ...state,
      datosDelTramite: datosDelTramiteFormState,
    }));
  }

  /**
   * Actualiza el estado del formulario de justificación del trámite.
   * Permite modificar los datos capturados en el formulario de justificación.
   * @param {JustificacionTramiteFormState} justificacionTramiteFormState - Estado actualizado del formulario de justificación.
   */
  public updateJustificacionFormulario(
    justificacionTramiteFormState: JustificacionTramiteFormState
  ): void {
    this.update((state) => ({
      ...state,
      justificacionTramiteFormState: justificacionTramiteFormState,
    }));
  }

  /**
   * Actualiza los datos del formulario de pago de derechos.
   * @param {PagoDerechosFormState} pagoDerechosFormState - Estado actualizado del formulario de pago.
   */
  public updatePagoDerechosFormState(
    pagoDerechosFormState: PagoDerechosFormState
  ): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: pagoDerechosFormState,
    }));
  }

  /**
   * Agrega nuevos registros a la tabla de destinatarios finales.
   * @param {DestinoFinal[]} newDestinatarios - Nuevos destinatarios a agregar.
   */
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

  /**
   * Agrega nuevos registros a la tabla de proveedores.
   * @param {Proveedor[]} newProveedores - Nuevos proveedores a agregar.
   */
  public updateProveedorTablaDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  /**
   * Agrega nuevos registros a la tabla de mercancías.
   * @param {MercanciaDetalle[]} newMercancia - Nuevas mercancías a agregar.
   */
  public updateMercanciaTablaDatos(newMercancia: MercanciaDetalle[]): void {
    this.update((state) => ({
      ...state,
      merccancialTablaDatos: [...state.merccancialTablaDatos, ...newMercancia],
    }));
  }
}