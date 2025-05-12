import { DatosSolicitudFormState } from '../../../../shared/models/datos-solicitud.model';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaForm } from '../../../../shared/models/datos-solicitud.model';
import { PRODUCTO_TABLA_DATA } from '../../../../shared/constantes/datos-solicitud.enum';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TABLA_OPCION_DATA } from '../../../../shared/constantes/datos-solicitud.enum';
import { TablaMercanciasDatos } from '../../../../shared/models/datos-solicitud.model';
import { TablaOpcionConfig } from '../../../../shared/models/datos-solicitud.model';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';

/**
 * Modelo de datos para el estado de la solicitud del trámite 260102.
 * @export
 * @interface Tramite260102State
 *
 * @property {Destinatario[]} destinatarioFinalTablaDatos - Lista de destinatarios finales registrados.
 * @property {Facturador[]} facturadorTablaDatos - Lista de facturadores registrados.
 * @property {Proveedor[]} proveedorTablaDatos - Lista de proveedores registrados.
 * @property {Fabricante[]} fabricanteTablaDatos - Lista de fabricantes registrados.
 * @property {DatosSolicitudFormState} datosSolicitudFormState - Datos generales del formulario de solicitud.
 * @property {MercanciaForm} mercanciaForm - Información relacionada con el formulario de mercancías.
 * @property {TablaOpcionConfig[]} opcionConfigDatos - Configuración y datos para la tabla de opciones.
 * @property {TablaScianConfig[]} scianConfigDatos - Datos de la tabla SCIAN (clasificación económica).
 * @property {TablaMercanciasDatos[]} tablaMercanciasConfigDatos - Configuración y datos de la tabla de mercancías.
 * @property {TablaOpcionConfig[]} seleccionadoopcionDatos - Opciones seleccionadas en la tabla de opciones.
 * @property {TablaScianConfig[]} seleccionadoScianDatos - Elementos SCIAN seleccionados en la tabla correspondiente.
 * @property {TablaMercanciasDatos[]} seleccionadoTablaMercanciasDatos - Elementos seleccionados en la tabla de mercancías.
 * @property {boolean} opcionesColapsableState - Indica si la sección de opciones está colapsada (true) o desplegada (false).
 * @property {PagoDerechosFormState} pagoDerechos - Información del formulario de pago de derechos.
 */
export interface Tramite260102State {
  destinatarioFinalTablaDatos: Destinatario[];
  facturadorTablaDatos: Facturador[];
  proveedorTablaDatos: Proveedor[];
  fabricanteTablaDatos: Fabricante[];
  datosSolicitudFormState: DatosSolicitudFormState;
  mercanciaForm: MercanciaForm;
  opcionConfigDatos: TablaOpcionConfig[];
  scianConfigDatos: TablaScianConfig[];
  tablaMercanciasConfigDatos: TablaMercanciasDatos[];
  seleccionadoopcionDatos: TablaOpcionConfig[];
  seleccionadoScianDatos: TablaScianConfig[];
  seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[];
  opcionesColapsableState: boolean;
  pagoDerechos: PagoDerechosFormState;
}

/**
 * @function createInitialState
 * @description Crea y devuelve el estado inicial para el trámite 260102.
 * @returns {Tramite260102State} El estado inicial del trámite.
 */
export function createInitialState(): Tramite260102State {
  return {
    destinatarioFinalTablaDatos: [],
    facturadorTablaDatos: [],
    proveedorTablaDatos: [],
    fabricanteTablaDatos: [],
    datosSolicitudFormState: {
      rfcSanitario: '',
      denominacionRazon: '',
      correoElectronico: '',
      codigoPostal: '',
      estado: '',
      municipioAlcaldia: '',
      localidad: '',
      colonia: '',
      calle: '',
      lada: '',
      telefono: '',
      aviso: '',
      licenciaSanitaria: '',
      regimen: '',
      adunasDeEntradas: '',
      aeropuerto: false,
      publico: 'si',
      representanteRfc: '',
      representanteNombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      marca: '',
      especifique: '',
      claveDeLos: '',
      fechaDeFabricacio: '',
      fechaDeCaducidad: '',
    },
    mercanciaForm: {
      clasificacionProducto: '',
      especificarClasificacionProducto: '',
      denominacionEspecificaProducto: '',
      denominacionDistintiva: '',
      denominacionComun: '',
      tipoProducto: '',
      formaFarmaceutica: '',
      estadoFisico: '',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUmtValor: '',
      cantidadUmt: '',
      cantidadUmcValor: '',
      cantidadUmc: '',
      presentacion: '',
      numeroRegistroSanitario: '',
      fechaCaducidad: '',
      paisDeOriginDatos: [],
      paisDeProcedenciaDatos: [],
    },
    opcionConfigDatos: TABLA_OPCION_DATA,
    scianConfigDatos: [], // SCIAN_TABLA_DATA
    tablaMercanciasConfigDatos: PRODUCTO_TABLA_DATA,
    seleccionadoopcionDatos: [],
    seleccionadoScianDatos: [],
    seleccionadoTablaMercanciasDatos: [],
    opcionesColapsableState: false,
    pagoDerechos: {
      claveReferencia: '',
      cadenaDependencia: '',
      estado: '',
      llavePago: '',
      fechaPago: '',
      importePago: '',
    },
  };
}
/**
 * @export
 * @class Tramite260102Store
 * @extends {Store<Tramite260102State>}
 * @description Clase que gestiona el estado (Store) del trámite 260102.
 * Almacena y actualiza los datos definidos en `Tramite260102State`,
 * permitiendo la manipulación y suscripción a dichos datos.
 **/
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Tramite260102', resettable: true })
export class Tramite260102Store extends Store<Tramite260102State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * @function updateDatosSolicitudFormState
   * @description Actualiza el estado del formulario de datos de la solicitud.
   * @param {DatosSolicitudFormState} datosSolicitudFormState - El nuevo estado del formulario.
   * @returns {void}
   */
  public updateDatosSolicitudFormState(
    datosSolicitudFormState: DatosSolicitudFormState
  ): void {
    this.update((state) => ({
      ...state,
      datosSolicitudFormState,
    }));
  }

  /**
   * @function updateFabricanteTablaDatos
   * @description Actualiza la tabla de datos de fabricantes, agregando nuevos fabricantes.
   * @param {Fabricante[]} newFabricantes - El array de nuevos fabricantes a agregar.
   * @returns {void}
   */
  public updateFabricanteTablaDatos(newFabricantes: Fabricante[]): void {
    this.update((state) => ({
      ...state,
      fabricanteTablaDatos: [...state.fabricanteTablaDatos, ...newFabricantes],
    }));
  }

  /**
   * @function updateDestinatarioFinalTablaDatos
   * @description Actualiza la tabla de datos de destinatarios finales, agregando nuevos destinatarios.
   * @param {Destinatario[]} newDestinatarios - El array de nuevos destinatarios a agregar.
   * @returns {void}
   */
  public updateDestinatarioFinalTablaDatos(
    newDestinatarios: Destinatario[]
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
   * @function updateProveedorTablaDatos
   * @description Actualiza la tabla de datos de proveedores, agregando nuevos proveedores.
   * @param {Proveedor[]} newProveedores - El array de nuevos proveedores a agregar.
   * @returns {void}
   */
  public updateProveedorTablaDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  /**
   * @function updateFacturadorTablaDatos
   * @description Actualiza la tabla de datos de facturadores, agregando nuevos facturadores.
   * @param {Facturador[]} newFacturadores - El array de nuevos facturadores a agregar.
   * @returns {void}
   */
  public updateFacturadorTablaDatos(newFacturadores: Facturador[]): void {
    this.update((state) => ({
      ...state,
      facturadorTablaDatos: [...state.facturadorTablaDatos, ...newFacturadores],
    }));
  }

  /**
   * @function updateOpcionConfigDatos
   * @description Actualiza la configuración de opciones para la tabla.
   * @param {TablaOpcionConfig[]} opcionConfigDatos - El nuevo array de configuraciones de opciones.
   * @returns {void}
   */
  public updateOpcionConfigDatos(opcionConfigDatos: TablaOpcionConfig[]): void {
    this.update((state) => ({
      ...state,
      opcionConfigDatos,
    }));
  }

  /**
   * @function updateScianConfigDatos
   * @description Actualiza la configuración de datos SCIAN para la tabla.
   * @param {TablaScianConfig[]} scianConfigDatos - El nuevo array de configuraciones de datos SCIAN.
   * @returns {void}
   */
  public updateScianConfigDatos(scianConfigDatos: TablaScianConfig[]): void {
    this.update((state) => ({
      ...state,
      scianConfigDatos,
    }));
  }

  /**
   * @function updateTablaMercanciasConfigDatos
   * @description Actualiza la configuración de datos de mercancías para la tabla.
   * @param {TablaMercanciasDatos[]} tablaMercanciasConfigDatos - El nuevo array de configuraciones de datos de mercancías.
   * @returns {void}
   */
  public updateTablaMercanciasConfigDatos(
    tablaMercanciasConfigDatos: TablaMercanciasDatos[]
  ): void {
    this.update((state) => ({
      ...state,
      tablaMercanciasConfigDatos,
    }));
  }

  /**
   * @function updatePagoDerechos
   * @description Actualiza el estado del formulario de pago de derechos.
   * @param {PagoDerechosFormState} nuevoPagoDerechos - El nuevo estado del formulario de pago de derechos.
   * @returns {void}
   */
  public updatePagoDerechos(nuevoPagoDerechos: PagoDerechosFormState): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: nuevoPagoDerechos,
    }));
  }
}
