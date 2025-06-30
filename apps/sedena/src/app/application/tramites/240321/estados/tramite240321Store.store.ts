import { DatosDelTramiteFormState, JustificacionTramiteFormState } from '../../../shared/models/datos-del-tramite.model';
import { DestinoFinal } from '../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaDetalle } from '../../../shared/models/datos-del-tramite.model';
import { PagoDerechosFormState } from '../../../shared/models/pago-de-derechos.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Representa el estado de la gestión para el trámite 240321.
 */
export interface Tramite240321State {
  /**
   * Índice de la pestaña actualmente seleccionada en la interfaz, si aplica.
   */
  tabSeleccionado?: number;
  /**
   * Lista de destinatarios finales mostrados en la tabla de datos.
   */
  destinatarioFinalTablaDatos: DestinoFinal[];
  /**
   * Lista de proveedores mostrados en la tabla de datos.
   */
  proveedorTablaDatos: Proveedor[];
  /**
   * Estado del formulario relacionado con el pago de derechos.
   */
  pagoDerechos: PagoDerechosFormState;
  /**
   * Lista de detalles de mercancía mostrados en la tabla de datos.
   */
  merccancialTablaDatos: MercanciaDetalle[];
    /**
   * Estado del formulario con los datos generales del trámite.
   */
  datosDelTramite: DatosDelTramiteFormState;
  /**
   * Estado del formulario de justificación del trámite.
   */
  justificacionTramiteFormState: JustificacionTramiteFormState;
  /**
   * Folio asociado al estado del trámite.
   */
  folio: string;
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
