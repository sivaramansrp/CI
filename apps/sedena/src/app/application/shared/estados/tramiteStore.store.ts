import { DatosDelTramiteFormState, MercanciaDetalle } from '../models/datos-del-tramite.model';
import { DestinoFinal } from '../models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { PagoDerechosFormState } from '../models/pago-de-derechos.model';
import { Proveedor } from '../models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que representa el estado completo del trámite .
 *
 * @property {number} [tabSeleccionado] - Pestaña actualmente activa en el flujo.
 * @property {DestinoFinal[]} destinatarioFinalTablaDatos - Lista de destinatarios finales registrados.
 * @property {Proveedor[]} proveedorTablaDatos - Lista de proveedores registrados.
 * @property {PagoDerechosFormState} pagoDerechos - Información del formulario de pago de derechos.
 * @property {MercanciaDetalle[]} merccancialTablaDatos - Lista de mercancías registradas.
 * @property {DatosDelTramiteFormState} datosDelTramite - Información general del formulario de datos del trámite.
 */
export interface TramiteSedenaSharedState {
  tabSeleccionado?: number;
  destinatarioFinalTablaDatos: DestinoFinal[];
  proveedorTablaDatos: Proveedor[];
  pagoDerechos: PagoDerechosFormState;
  merccancialTablaDatos: MercanciaDetalle[];
  editMerccancialTablaDatos: MercanciaDetalle[];
  editSingleMerccancialTablaDatos: MercanciaDetalle;
  editSingleMerccancialTablaDatosConfig: null;
  datosDelTramite: DatosDelTramiteFormState;
  modificarDestinarioDatos?: DestinoFinal | null;
  modificarProveedorDatos?: Proveedor | null;
}

/**
 * Crea el estado inicial para el trámite .
 *
 * @function createInitialState
 * @returns {TramiteSedenaSharedState} El estado inicial del store.
 */
export function createInitialState(): TramiteSedenaSharedState {
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
    editMerccancialTablaDatos: [],
    editSingleMerccancialTablaDatos: {
      fraccionArancelaria: '',
      descripcionFraccion: '',
      unidadMedidaTarifa: '',
      umc: '',
      cantidadUMT: 0,
      valorComercial: 0,
      tipoMoneda: '',
      descripcion: '',
      paisOrigen: '',
    },
    editSingleMerccancialTablaDatosConfig: null,
    datosDelTramite: {
      permisoGeneral: '',
      usoFinal: '',
      aduanasSeleccionadas: [],
      paisDestino: '',
    },
    modificarDestinarioDatos: null,
    modificarProveedorDatos: null,
  };
}

/**
 * Store que maneja el estado del trámite .
 * Utiliza Akita para el control reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramiteSedenaStore', resettable: true })
export class TramiteSedenaSharedStore extends Store<TramiteSedenaSharedState> {
  constructor() {
    super(createInitialState());
  }

  /**
 * Actualiza la configuración de edición de una sola mercancía en el estado.
 *
 * @method updateEditSingleMerccancialTablaDatosConfig
 * @param {any} config - Valor de configuración a almacenar (por ejemplo, datos filtrados).
 * @returns {void}
 */
public updateEditSingleMerccancialTablaDatosConfig(config: any): void {
  this.update((state) => ({
    ...state,
    editSingleMerccancialTablaDatosConfig: config,
  }));
}
}
