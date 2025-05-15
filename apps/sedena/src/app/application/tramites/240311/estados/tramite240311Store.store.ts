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
 *
 * @property {number} [tabSeleccionado] - Pestaña actualmente activa en el flujo del trámite.
 * @property {DestinoFinal[]} destinatarioFinalTablaDatos - Lista de destinatarios finales registrados en la tabla.
 * @property {Proveedor[]} proveedorTablaDatos - Lista de proveedores registrados en la tabla.
 * @property {PagoDerechosFormState} pagoDerechos - Información del formulario de pago de derechos.
 * @property {MercanciaDetalle[]} merccancialTablaDatos - Lista de mercancías registradas en la tabla.
 * @property {DatosDelTramiteFormState} datosDelTramite - Información general del formulario de datos del trámite.
 * @property {JustificacionTramiteFormState} justificacionTramiteFormState - Información del formulario de justificación del trámite.
 */
export interface Tramite240311State {
  tabSeleccionado?: number;
  destinatarioFinalTablaDatos: DestinoFinal[];
  proveedorTablaDatos: Proveedor[];
  pagoDerechos: PagoDerechosFormState;
  merccancialTablaDatos: MercanciaDetalle[];
  datosDelTramite: DatosDelTramiteFormState;
  justificacionTramiteFormState: JustificacionTramiteFormState;
}

/**
 * Crea el estado inicial para el trámite 240311.
 * Este estado inicializa todas las propiedades necesarias para manejar el flujo del trámite.
 *
 * @returns {Tramite240311State} El estado inicial del store.
 * 
 * Propiedades inicializadas:
 * - `tabSeleccionado`: Número de la pestaña actualmente activa en el flujo del trámite. Por defecto, es 1.
 * - `destinatarioFinalTablaDatos`: Lista vacía que almacenará los destinatarios finales registrados.
 * - `proveedorTablaDatos`: Lista vacía que almacenará los proveedores registrados.
 * - `pagoDerechos`: Objeto que contiene los datos iniciales del formulario de pago de derechos:
 *    - `claveReferencia`: Clave de referencia del pago (cadena vacía por defecto).
 *    - `cadenaDependencia`: Cadena de dependencia asociada al pago (cadena vacía por defecto).
 *    - `banco`: Nombre del banco asociado al pago (cadena vacía por defecto).
 *    - `llavePago`: Llave única del pago (cadena vacía por defecto).
 *    - `fechaPago`: Fecha en la que se realizó el pago (cadena vacía por defecto).
 *    - `importePago`: Importe total del pago (cadena vacía por defecto).
 * - `merccancialTablaDatos`: Lista vacía que almacenará los detalles de las mercancías registradas.
 * - `datosDelTramite`: Objeto que contiene los datos generales del trámite:
 *    - `permisoGeneral`: Permiso general asociado al trámite (cadena vacía por defecto).
 *    - `usoFinal`: Uso final del trámite (cadena vacía por defecto).
 *    - `aduanasSeleccionadas`: Lista vacía que almacenará las aduanas seleccionadas.
 *    - `paisDestino`: País de destino del trámite (cadena vacía por defecto).
 * - `justificacionTramiteFormState`: Objeto que contiene el estado inicial del formulario de justificación:
 *    - `justificacion`: Justificación del trámite (cadena vacía por defecto).
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
 * Store que maneja el estado del trámite 240311.
 * Utiliza Akita para el control reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite240311', resettable: true })
export class Tramite240311Store extends Store<Tramite240311State> {
  constructor() {
    super(createInitialState());
  }
  
  /**
   * Actualiza los datos generales del formulario de trámite.
   *
   * @method updateDatosDelTramiteFormState
   * @param {DatosDelTramiteFormState} datosDelTramiteFormState - Estado actualizado del formulario.
   * @returns {void}
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
 * @method updateJustificacionFormulario
 * @description Actualiza el estado del formulario de justificación del trámite.
 * Permite modificar los datos capturados en el formulario de justificación.
 * 
 * @param {JustificacionTramiteFormState} justificacionTramiteFormState - Estado actualizado del formulario de justificación.
 * @returns {void}
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
   *
   * @method updatePagoDerechosFormState
   * @param {PagoDerechosFormState} pagoDerechosFormState - Estado actualizado del formulario de pago.
   * @returns {void}
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
   *
   * @method updateDestinatarioFinalTablaDatos
   * @param {DestinoFinal[]} newDestinatarios - Nuevos destinatarios a agregar.
   * @returns {void}
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
   *
   * @method updateProveedorTablaDatos
   * @param {Proveedor[]} newProveedores - Nuevos proveedores a agregar.
   * @returns {void}
   */
  public updateProveedorTablaDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  /**
   * Agrega nuevos registros a la tabla de mercancías.
   *
   * @method updateMercanciaTablaDatos
   * @param {MercanciaDetalle[]} newMercancia - Nuevas mercancías a agregar.
   * @returns {void}
   */
  public updateMercanciaTablaDatos(newMercancia: MercanciaDetalle[]): void {
    this.update((state) => ({
      ...state,
      merccancialTablaDatos: [...state.merccancialTablaDatos, ...newMercancia],
    }));
  }
}
