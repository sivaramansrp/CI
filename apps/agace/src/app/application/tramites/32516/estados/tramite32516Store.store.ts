
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que representa el estado completo del trámite 32516.
 *
 * @property {number} [tabSeleccionado] - Pestaña actualmente activa en el flujo.
 * @property {DestinoFinal[]} destinatarioFinalTablaDatos - Lista de destinatarios finales registrados.
 * @property {Proveedor[]} proveedorTablaDatos - Lista de proveedores registrados.
 * @property {PagoDerechosFormState} pagoDerechos - Información del formulario de pago de derechos.
 * @property {MercanciaDetalle[]} merccancialTablaDatos - Lista de mercancías registradas.
 * @property {DatosDelTramiteFormState} datosDelTramite - Información general del formulario de datos del trámite.
 * @property {DestinoFinal | null} [modificarDestinarioDatos] - Datos del destinatario que se están modificando.
 * @property {Proveedor | null} [modificarProveedorDatos] - Datos del proveedor que se están modificando.
 */

export interface Tramite32516State {
  tabSeleccionado?: number;
}

/**
 * Crea el estado inicial para el trámite 32516.
 *
 * @function createInitialState
 * @returns {Tramite32516State} El estado inicial del store.
 */
export function createInitialState(): Tramite32516State {
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
    modificarDestinarioDatos: null,
    modificarProveedorDatos: null
  };
}

/**
 * Store que maneja el estado del trámite 32516.
 * Utiliza Akita para el control reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32516', resettable: true })
export class Tramite32516Store extends Store<Tramite32516State> {
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
      modificarDestinarioDatos: null
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
 * Actualiza los datos del destinatario en el estado de la tienda.
 *
 * @param datos - Objeto de tipo `DestinoFinal` que contiene la información del destinatario
 *                que se debe actualizar en el estado.
 *
 * @remarks
 * Este método también establece `modificarProveedorDatos` como `null` en el estado.
 */
    public actualizarDatosDestinatario(datos: DestinoFinal): void {
      this.update((state) => ({
        ...state,
        modificarDestinarioDatos: datos,
        modificarProveedorDatos: null
      }));
    }
  
    /**
     * Actualiza los datos del proveedor en el estado de la tienda.
     * 
     * @param datos - Objeto de tipo `Proveedor` que contiene la información actualizada del proveedor.
     * 
     * Este método modifica el estado actual de la tienda, asignando los nuevos datos del proveedor
     * y estableciendo los datos del destinatario como `null`.
     */
    public actualizarDatosProveedor(datos: Proveedor): void {
      this.update((state) => ({
        ...state,
        modificarDestinarioDatos: null,
        modificarProveedorDatos: datos,
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
