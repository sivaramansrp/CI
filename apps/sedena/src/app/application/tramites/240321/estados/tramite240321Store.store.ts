import { DatosDelTramiteFormState, JustificacionTramiteFormState } from '../../../shared/models/datos-del-tramite.model';
import { DestinoFinal } from '../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaDetalle } from '../../../shared/models/datos-del-tramite.model';
import { PagoDerechosFormState } from '../../../shared/models/pago-de-derechos.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que representa el estado completo del trámite 240321.
 *
 * @property {number} [tabSeleccionado] - Pestaña actualmente activa en el flujo.
 * @property {DestinoFinal[]} destinatarioFinalTablaDatos - Lista de destinatarios finales registrados.
 * @property {Proveedor[]} proveedorTablaDatos - Lista de proveedores registrados.
 * @property {PagoDerechosFormState} pagoDerechos - Información del formulario de pago de derechos.
 * @property {MercanciaDetalle[]} merccancialTablaDatos - Lista de mercancías registradas.
 * @property {DatosDelTramiteFormState} datosDelTramite - Información general del formulario de datos del trámite.
 *  @property {JustificacionTramiteFormState} justificacionTramiteFormState - Información del formulario de justificación del trámite.
*/
export interface Tramite240321State {
  tabSeleccionado?: number;
  destinatarioFinalTablaDatos: DestinoFinal[];
  proveedorTablaDatos: Proveedor[];
  pagoDerechos: PagoDerechosFormState;
  merccancialTablaDatos: MercanciaDetalle[];
  datosDelTramite: DatosDelTramiteFormState;
  justificacionTramiteFormState: JustificacionTramiteFormState;
  folio:string;
}

/**
 * Crea el estado inicial para el trámite 240321.
 *
 * @function createInitialState
 * @returns {Tramite240321State} El estado inicial del store.
 */
export function createInitialState(): Tramite240321State {
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
    justificacionTramiteFormState :{
      justificacion:''
    },
    folio:'89900012344556787898'
  };
}

/**
 * Store que maneja el estado del trámite 240321.
 * Utiliza Akita para el control reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite240321', resettable: true })
export class Tramite240321Store extends Store<Tramite240321State> {
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
   * Actualiza un registro existente en la tabla de destinatarios finales.
   *
   * @method actualizaExistenteEnDestinatarioDatos
   * @param {DestinoFinal[]} newDestinatarios - Nuevos destinatarios a agregar.
   * @returns {void}
   */
  public actualizaExistenteEnDestinatarioDatos(
    newDestinatarios: DestinoFinal[]
  ): void {
    this.update((state) => ({
      ...state,
      destinatarioFinalTablaDatos: state.destinatarioFinalTablaDatos.map(
        (item) => item.codigoPostal === newDestinatarios[0].codigoPostal
          ? newDestinatarios[0]
          : item
      ),
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
   * Actualiza un registro existente en la tabla de proveedores.
   *
   * @method actualizaExistenteEnProveedorDatos
   * @param {Proveedor[]} newProveedores - Nuevos proveedores a agregar.
   * @returns {void}
   */
   
  public actualizaExistenteEnProveedorDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: state.proveedorTablaDatos.map((item) =>
        item.numeroInterior === newProveedores[0].numeroInterior ? newProveedores[0] : item
      ),
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
  /**
   * Actualiza un registro existente en la tabla de mercancías.
   *
   * @method actualizaExistenteEnMercanciaDatos
   * @param {MercanciaDetalle[]} newMercancia - Nuevas mercancías a agregar.
   * @returns {void}
   */

  /**
   * Actualiza el valor del folio en el estado de la tienda.
   *
   * @param folio - El nuevo valor de folio a establecer.
   * @remarks
   * Utilice este método para cambiar el folio asociado al estado actual.
   */
  public updateFolio(folio:string): void {
    this.update((state) => ({
      ...state,
      folio: folio,
    }));
  }
  /**
   * Actualiza el estado del store con los valores proporcionados en el nuevo estado.
   * 
   * @param state - El nuevo estado parcial que se fusionará con el estado actual.
   * @remarks
   * Utiliza la función `update` para combinar el estado actual con el nuevo estado.
   */
  public updateState(state: Tramite240321State): void {
    this.update((currentState) => ({
      ...currentState,
      ...state,
    }));
  }
}
