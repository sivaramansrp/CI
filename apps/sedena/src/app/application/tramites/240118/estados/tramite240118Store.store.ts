import { DatosDelTramiteFormState } from '../../../shared/models/datos-del-tramite.model';
import { DestinoFinal } from '../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaDetalle } from '../../../shared/models/datos-del-tramite.model';
import { PagoDerechosFormState } from '../../../shared/models/pago-de-derechos.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * @interface Tramite240118State
 * @description Representa el estado de la aplicación para el trámite 240118.
 * Contiene información sobre las pestañas seleccionadas, datos de destinatarios,
 * proveedores, pagos, mercancías y otros detalles relacionados con el trámite.
 * 
 * @property {number} [tabSeleccionado] - Número de la pestaña actualmente seleccionada.
 * @property {DestinoFinal[]} destinatarioFinalTablaDatos - Lista de datos de destinatarios finales.
 * @property {Proveedor[]} proveedorTablaDatos - Lista de datos de proveedores.
 * @property {PagoDerechosFormState} pagoDerechos - Información del formulario de pago de derechos.
 * @property {MercanciaDetalle[]} merccancialTablaDatos - Lista de detalles de mercancías.
 * @property {DatosDelTramiteFormState} datosDelTramite - Información del formulario de datos del trámite.
 * @property {DestinoFinal | null} [modificarDestinarioDatos] - Datos del destinatario a modificar (opcional).
 * @property {Proveedor | null} [modificarProveedorDatos] - Datos del proveedor a modificar (opcional).
 * 
 * @command Este estado se utiliza para gestionar y almacenar los datos relacionados con el trámite 240118.
 */
export interface Tramite240118State {
  tabSeleccionado?: number;
  destinatarioFinalTablaDatos: DestinoFinal[];
  proveedorTablaDatos: Proveedor[];
  pagoDerechos: PagoDerechosFormState;
  merccancialTablaDatos: MercanciaDetalle[];
  datosDelTramite: DatosDelTramiteFormState;
  modificarDestinarioDatos?: DestinoFinal | null;
  modificarProveedorDatos?: Proveedor | null;
  modificarMercanciasDatos?: MercanciaDetalle | null;
  
}

/**
 * Crea el estado inicial para el trámite 240118.
 *
 * @function createInitialState
 * @returns {Tramite240118State} El estado inicial del store.
 */
export function createInitialState(): Tramite240118State {
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
 * Store que maneja el estado del trámite 240118.
 * Utiliza Akita para el control reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite240118', resettable: true })
export class Tramite240118Store extends Store<Tramite240118State> {
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
  
    /**
   * Actualiza los datos de un destinatario final específico.
   *
   * @method actualizarDatosDestinatario
   * @param {MercanciaDetalle} datos - Datos del destinatario final a modificar.
   * @returns {void}
   */
    public actualizarMercancias(datos: MercanciaDetalle): void {
      this.update((state) => ({
        ...state,
        modificarMercanciasDatos: datos,
      }));
    }

  /**
   * Actualiza los datos de un destinatario final específico.
   *
   * @method actualizarDatosDestinatario
   * @param {DestinoFinal} datos - Datos del destinatario final a modificar.
   * @returns {void}
   */
  public actualizarDatosDestinatario(datos: DestinoFinal): void {
    this.update((state) => ({
      ...state,
      modificarDestinarioDatos: datos,
      modificarProveedorDatos: null
    }));
  }

  /**
   * Actualiza los datos de un proveedor específico.
   *
   * @method actualizarDatosProveedor
   * @param {Proveedor} datos - Datos del proveedor a modificar.
   * @returns {void}
   */
  public actualizarDatosProveedor(datos: Proveedor): void {
    this.update((state) => ({
      ...state,
      modificarProveedorDatos: datos,
      modificarDestinarioDatos: null
    }));
  }
    /**
   * Elimina un destinatario de la tabla de destinatarios.
   *
   * @param destinatarioFinal - El destinatario que se eliminará de la tabla de destinatarios.
   * @returns void
   */
    eliminarDestinatarioFinal(destinatarioFinal: DestinoFinal): void {
      this.update(state => {
        const INDICE_A_ELIMINAR = state.destinatarioFinalTablaDatos.findIndex(ele => 
          Object.keys(destinatarioFinal).some(key => destinatarioFinal[key as keyof DestinoFinal] === ele[key as keyof DestinoFinal])
        );
    
        if (INDICE_A_ELIMINAR !== -1) {
          state.destinatarioFinalTablaDatos.splice(INDICE_A_ELIMINAR, 1);
        }
    
        return {
          ...state,
          destinatarioFinalTablaDatos: [...state.destinatarioFinalTablaDatos],
        };
      });
    }

     /**
   * Elimina un Proveedor de la tabla de Proveedor.
   *
   * @param proveedorFinal - El Proveedor que se eliminará de la tabla de Proveedor.
   * @returns void
   */
     eliminareliminarProveedorFinal(proveedorFinal: Proveedor): void {
      this.update(state => {
        const INDICE_A_ELIMINAR = state.proveedorTablaDatos.findIndex(ele => 
          Object.keys(proveedorFinal).some(key => proveedorFinal[key as keyof Proveedor] === ele[key as keyof Proveedor])
        );
    
        if (INDICE_A_ELIMINAR !== -1) {
          state.proveedorTablaDatos.splice(INDICE_A_ELIMINAR, 1);
        }
    
        return {
          ...state,
          proveedorTablaDatos: [...state.proveedorTablaDatos],
        };
      });
    }
}