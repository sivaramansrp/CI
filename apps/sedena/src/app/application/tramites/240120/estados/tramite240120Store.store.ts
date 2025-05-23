import { DatosDelTramiteFormState } from '../../../shared/models/datos-del-tramite.model';
import { DestinoFinal } from '../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaDetalle } from '../../../shared/models/datos-del-tramite.model';
import { PagoDerechosFormState } from '../../../shared/models/pago-de-derechos.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que representa el estado completo del trámite 240120.
 *
 * @property {number} [tabSeleccionado] - Pestaña actualmente activa en el flujo.
 * @property {DestinoFinal[]} destinatarioFinalTablaDatos - Lista de destinatarios finales registrados.
 * @property {Proveedor[]} proveedorTablaDatos - Lista de proveedores registrados.
 * @property {PagoDerechosFormState} pagoDerechos - Información del formulario de pago de derechos.
 * @property {MercanciaDetalle[]} merccancialTablaDatos - Lista de mercancías registradas.
 * @property {DatosDelTramiteFormState} datosDelTramite - Información general del formulario de datos del trámite.
 */
export interface Tramite240120State {
  tabSeleccionado?: number;
  destinatarioFinalTablaDatos: DestinoFinal[];
  proveedorTablaDatos: Proveedor[];
  pagoDerechos: PagoDerechosFormState;
  merccancialTablaDatos: MercanciaDetalle[];
  datosDelTramite: DatosDelTramiteFormState;
  modificarDestinarioDatos?: DestinoFinal | null;
  modificarProveedorDatos?: Proveedor | null;
}

/**
 * Crea el estado inicial para el trámite 240120.
 *
 * @function createInitialState
 * @returns {Tramite240120State} El estado inicial del store.
 */
export function createInitialState(): Tramite240120State {
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
 * Store que maneja el estado del trámite 240120.
 * Utiliza Akita para el control reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite240120', resettable: true })
export class Tramite240120Store extends Store<Tramite240120State> {
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
      const DESTINATARIOS_ACTUALIZADOS = state.destinatarioFinalTablaDatos.filter(ele =>
        !Object.keys(destinatarioFinal).every(
          key => destinatarioFinal[key as keyof DestinoFinal] === ele[key as keyof DestinoFinal]
        )
      );
      return {
        ...state,
        destinatarioFinalTablaDatos: DESTINATARIOS_ACTUALIZADOS,
      };
    });
  }
    

  /**
   * Elimina uno o varios destinatarios de la tabla de datos de destinatarios finales.
   *
   * @param destinatarioFinal - Un destinatario o un arreglo de destinatarios a eliminar.
   *
   * @returns void
   *
   * @memberof NombreDeLaClase
   *
   * @description
   * Busca y elimina los destinatarios especificados del estado actual. La comparación se realiza
   * preferentemente por la propiedad `tableindex` si está disponible, de lo contrario se comparan todas las claves del objeto.
   */
  eliminarDestinatarioMultiple(destinatarioFinal: DestinoFinal[] | DestinoFinal): void {
    this.update(state => {
      const TO_DELETE_ARRAY: DestinoFinal[] = Array.isArray(destinatarioFinal) ? destinatarioFinal : [destinatarioFinal];
      const UPDATEDDESTINARIOS = state.destinatarioFinalTablaDatos.filter(itemState => {
        // Try to find a match in toDeleteArray
        const MATCH = TO_DELETE_ARRAY.find(itemToDelete => {
          // Prefer tableindex if available
          if (
            itemToDelete.tableindex !== undefined &&
            itemState.tableindex !== undefined
          ) {
            return itemToDelete.tableindex === itemState.tableindex;
          }
          // Fallback: compare all keys
          return Object.keys(itemToDelete).every(
            key =>
              itemToDelete[key as keyof DestinoFinal] ===
              itemState[key as keyof DestinoFinal]
          );
        });
        // Keep if not matched for deletion
        return !MATCH;
      });
      return {
        ...state,
        destinatarioFinalTablaDatos: UPDATEDDESTINARIOS,
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

    /**
   * Elimina múltiples mercancías de la lista merccancialTablaDatos comparando los objetos.
   *
   * @param {MercanciaDetalle[]} mercancias - Array de mercancías a eliminar.
   * @returns {void}
   */
  public eliminarMultiplesPorComparacion(mercancias: MercanciaDetalle[]): void {
    this.update(state => {
      const FILTERED_ARRAY = state.merccancialTablaDatos.filter(itemState =>
        !mercancias.some(itemToDelete =>
          Object.keys(itemToDelete).every(
            key => itemToDelete[key as keyof MercanciaDetalle] === itemState[key as keyof MercanciaDetalle]
          )
        )
      );
      return {
        ...state,
        merccancialTablaDatos: FILTERED_ARRAY,
      };
    });
  }
  /**
   * @method actualizaExistenteEnDestinatarioDatos
   * @description
   * Actualiza un destinatario existente en la lista de destinatarios finales, reemplazando el elemento que coincide con el `tableindex` del nuevo destinatario proporcionado.
   * Después de la actualización, restablece el estado de modificación del destinatario a `null`.
   *
   * @param {DestinoFinal[]} newDestinatarios - Arreglo que contiene el destinatario actualizado. Se utiliza el primer elemento para realizar la comparación y actualización.
   *
   * @returns {void}
   */
  public actualizaExistenteEnDestinatarioDatos(
    newDestinatarios: DestinoFinal[]
  ): void {
    this.update((state) => ({
      ...state,
      destinatarioFinalTablaDatos: state.destinatarioFinalTablaDatos.map(
        (item) => item.tableindex === newDestinatarios[0].tableindex
      ? newDestinatarios[0]
      : item
      ),
    }));
    this.setModificarDestinarioDatos(null);
  }

  /**
   * Reemplaza la lista completa de destinatarios finales en el estado.
   *
   * @method setDestinatarioFinalTablaDatos
   * @param {DestinoFinal[]} destinatarios - Nueva lista de destinatarios finales.
   * @returns {void}
   */
  public setDestinatarioFinalTablaDatos(destinatarios: DestinoFinal[]): void {
    this.update(state => ({
      ...state,
      destinatarioFinalTablaDatos: [...destinatarios],
    }));
  }

  /**
   * Establece el valor de modificarDestinarioDatos en el estado.
   *
   * @param {DestinoFinal | null} destinatario - El destinatario a establecer o null.
   * @returns {void}
   */
  public setModificarDestinarioDatos(destinatario: DestinoFinal | null): void {
    this.update(state => ({
      ...state,
      modificarDestinarioDatos: destinatario,
    }));
  }
}
