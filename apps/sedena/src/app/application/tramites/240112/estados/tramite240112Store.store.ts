import { DatosDelTramiteFormState } from '../../../shared/models/datos-del-tramite.model';
import { DestinoFinal } from '../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaDetalle } from '../../../shared/models/datos-del-tramite.model';
import { PagoDerechosFormState } from '../../../shared/models/pago-de-derechos.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interface que define la estructura del estado para el trámite 240112.
 * Centraliza la información sobre la pestaña activa, tablas de destinatarios, proveedores,
 * datos de pago y detalles generales del trámite.
 */
export interface Tramite240112State {
  /**
   * Índice de la pestaña actualmente seleccionada.
   * Puede ser indefinido al inicio.
   */
  tabSeleccionado?: number;

  /**
   * Arreglo con los datos de los destinatarios finales.
   */
  destinatarioFinalTablaDatos: DestinoFinal[];

  /**
   * Arreglo con los datos de proveedores asociados.
   */
  proveedorTablaDatos: Proveedor[];

  /**
   * Estado del formulario de pago de derechos.
   */
  pagoDerechos: PagoDerechosFormState;

  /**
   * Arreglo con los detalles de la mercancía.
   */
  merccancialTablaDatos: MercanciaDetalle[];

  /**
   * Datos generales del trámite.
   */
  datosDelTramite: DatosDelTramiteFormState;
}

/**
 * Función que crea el estado inicial del store para el trámite 240112.
 * 
 * @returns {Tramite240112State} Estado inicial completo con valores por defecto.
 */
export function createInitialState(): Tramite240112State {
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
 * Store encargado de manejar el estado del trámite 240112.
 * Utiliza la librería Akita para la gestión reactiva y centralizada del estado.
 * 
 * @decorator Injectable - Permite la inyección del store como servicio singleton.
 * @decorator StoreConfig - Configura el nombre del store y habilita la función de reset.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite240112', resettable: true })
export class Tramite240112Store extends Store<Tramite240112State> {
  /**
   * Constructor que inicializa el store con el estado inicial definido.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la pestaña seleccionada en la interfaz de usuario.
   * 
   * @param {number} tabSeleccionado - Índice numérico de la pestaña a activar.
   * @returns {void}
   */
  public updateTabSeleccionado(tabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      tabSeleccionado,
    }));
  }

  /**
   * Actualiza el estado completo de los datos generales del trámite.
   * 
   * @param {DatosDelTramiteFormState} datosDelTramiteFormState - Nuevo estado con los datos actualizados.
   * @returns {void}
   */
  public updateDatosDelTramiteFormState(datosDelTramiteFormState: DatosDelTramiteFormState): void {
    this.update((state) => ({
      ...state,
      datosDelTramite: datosDelTramiteFormState,
    }));
  }

  /**
   * Actualiza el estado del formulario de pago de derechos.
   * 
   * @param {PagoDerechosFormState} pagoDerechosFormState - Nuevos datos de pago.
   * @returns {void}
   */
  public updatePagoDerechosFormState(pagoDerechosFormState: PagoDerechosFormState): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: pagoDerechosFormState,
    }));
  }

  /**
   * Agrega uno o más destinatarios finales a la tabla existente.
   * 
   * @param {DestinoFinal[]} newDestinatarios - Array de nuevos destinatarios a agregar.
   * @returns {void}
   */
  public updateDestinatarioFinalTablaDatos(newDestinatarios: DestinoFinal[]): void {
    this.update((state) => ({
      ...state,
      destinatarioFinalTablaDatos: [...state.destinatarioFinalTablaDatos, ...newDestinatarios],
    }));
  }

  /**
   * Agrega uno o más proveedores a la tabla existente.
   * 
   * @param {Proveedor[]} newProveedores - Array de nuevos proveedores a agregar.
   * @returns {void}
   */
  public updateProveedorTablaDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  /**
   * Agrega uno o más registros de mercancía a la tabla existente.
   * 
   * @param {MercanciaDetalle[]} newMercancia - Array de nuevos detalles de mercancía a agregar.
   * @returns {void}
   */
  public updateMercanciaTablaDatos(newMercancia: MercanciaDetalle[]): void {
    this.update((state) => ({
      ...state,
      merccancialTablaDatos: [...state.merccancialTablaDatos, ...newMercancia],
    }));
  }
}
