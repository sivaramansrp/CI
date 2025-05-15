import { DatosSolicitudFormState } from '../../../../shared/models/datos-solicitud.model';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaForm } from '../../../../shared/models/datos-solicitud.model';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TABLA_OPCION_DATA } from '../../../../shared/constantes/datos-solicitud.enum';
import { TablaMercanciasDatos } from '../../../../shared/models/datos-solicitud.model';
import { TablaOpcionConfig } from '../../../../shared/models/datos-solicitud.model';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';

/**
 * Representa el estado de la aplicación para el trámite 260206.
 * Contiene las propiedades necesarias para gestionar los datos y configuraciones
 * relacionadas con el trámite, incluyendo tablas de datos, formularios, configuraciones
 * y estados seleccionados.
 *
 * Propiedades:
 * - `destinatarioFinalTablaDatos`: Lista de destinatarios finales.
 * - `facturadorTablaDatos`: Lista de facturadores.
 * - `proveedorTablaDatos`: Lista de proveedores.
 * - `fabricanteTablaDatos`: Lista de fabricantes.
 * - `datosSolicitudFormState`: Estado del formulario de datos de la solicitud.
 * - `mercanciaForm`: Información del formulario de mercancías.
 * - `opcionConfigDatos`: Configuración de opciones para la tabla.
 * - `scianConfigDatos`: Configuración de SCIAN para la tabla.
 * - `tablaMercanciasConfigDatos`: Configuración de datos para la tabla de mercancías.
 * - `seleccionadoopcionDatos`: Opciones seleccionadas de la tabla de configuración.
 * - `seleccionadoScianDatos`: Configuración SCIAN seleccionada.
 * - `seleccionadoTablaMercanciasDatos`: Datos seleccionados de la tabla de mercancías.
 * - `opcionesColapsableState`: Estado de colapsabilidad de las opciones.
 * - `pagoDerechos`: Estado del formulario de pago de derechos.
 * - `tabSeleccionado`: Identificador de la pestaña seleccionada (opcional).
 */
export interface Tramite260206State {
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
  tabSeleccionado?: number;
}


/**
 * Crea y devuelve el estado inicial para el trámite 260206.
 * 
 * @returns {Tramite260206State} El estado inicial del trámite, que incluye:
 * - `destinatarioFinalTablaDatos`: Lista inicial vacía para los datos del destinatario final.
 * - `facturadorTablaDatos`: Lista inicial vacía para los datos del facturador.
 * - `proveedorTablaDatos`: Lista inicial vacía para los datos del proveedor.
 * - `fabricanteTablaDatos`: Lista inicial vacía para los datos del fabricante.
 * - `datosSolicitudFormState`: Objeto que contiene los datos iniciales del formulario de solicitud.
 * - `mercanciaForm`: Objeto que contiene los datos iniciales del formulario de mercancías.
 * - `opcionConfigDatos`: Configuración inicial para las opciones de tabla.
 * - `scianConfigDatos`: Configuración inicial para los datos SCIAN.
 * - `tablaMercanciasConfigDatos`: Configuración inicial para los datos de la tabla de mercancías.
 * - `seleccionadoopcionDatos`: Lista inicial vacía para las opciones seleccionadas.
 * - `seleccionadoScianDatos`: Lista inicial vacía para los datos SCIAN seleccionados.
 * - `seleccionadoTablaMercanciasDatos`: Lista inicial vacía para los datos de la tabla de mercancías seleccionados.
 * - `opcionesColapsableState`: Estado inicial del colapsable de opciones (por defecto `false`).
 * - `pagoDerechos`: Objeto que contiene los datos iniciales del pago de derechos.
 * - `tabSeleccionado`: Número de la pestaña seleccionada inicialmente (por defecto `1`).
 */
export function createInitialState(): Tramite260206State {
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
    tablaMercanciasConfigDatos: [], //PRODUCTO_TABLA_DATA,
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
    tabSeleccionado: 1,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Tramite260206', resettable: true })
export class Tramite260206Store extends Store<Tramite260206State> {
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
    seleccionadoTablaMercanciasDatos:[]
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

/**
   * @method updateTabSeleccionado
   * @description Actualiza el índice de la pestaña seleccionada.
   * @param {number} tabSeleccionado - Nuevo índice de la pestaña.
   */
public updateTabSeleccionado(tabSeleccionado: number): void {
  this.update((state) => ({
    ...state,
    tabSeleccionado: tabSeleccionado,
  }));
}
}
