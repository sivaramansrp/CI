import { DatosSolicitudFormState } from '../../../shared/models/datos-solicitud.model';
import { Destinatario } from '../../../shared/models/terceros-relacionados.model';
import { Fabricante } from '../../../shared/models/terceros-relacionados.model';
import { Facturador } from '../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaForm } from '../../../shared/models/datos-solicitud.model';
import { PagoDerechosFormState } from '../../../shared/models/terceros-relacionados.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TABLA_OPCION_DATA } from '../../../shared/constantes/datos-solicitud.enum';
import { TablaMercanciasDatos } from '../../../shared/models/datos-solicitud.model';
import { TablaOpcionConfig } from '../../../shared/models/datos-solicitud.model';
import { TablaScianConfig } from '../../../shared/models/datos-solicitud.model';

/**
 * Representa el estado del trámite 260210 en la aplicación.
 *
 * @interface Tramite260210State
 *
 * @property {Destinatario[]} destinatarioFinalTablaDatos - Lista de destinatarios finales.
 * @property {Facturador[]} facturadorTablaDatos - Lista de facturadores.
 * @property {Proveedor[]} proveedorTablaDatos - Lista de proveedores.
 * @property {Fabricante[]} fabricanteTablaDatos - Lista de fabricantes.
 * @property {DatosSolicitudFormState} datosSolicitudFormState - Información del formulario de solicitud.
 * @property {MercanciaForm} mercanciaForm - Datos del formulario de mercancías.
 * @property {TablaOpcionConfig[]} opcionConfigDatos - Opciones de configuración de tabla.
 * @property {TablaScianConfig[]} scianConfigDatos - Configuraciones SCIAN disponibles.
 * @property {TablaMercanciasDatos[]} tablaMercanciasConfigDatos - Configuración de tabla de mercancías.
 * @property {TablaOpcionConfig[]} seleccionadoopcionDatos - Opciones seleccionadas.
 * @property {TablaScianConfig[]} seleccionadoScianDatos - Configuraciones SCIAN seleccionadas.
 * @property {TablaMercanciasDatos[]} seleccionadoTablaMercanciasDatos - Mercancías seleccionadas.
 * @property {boolean} opcionesColapsableState - Estado del panel colapsable.
 * @property {PagoDerechosFormState} pagoDerechos - Estado del formulario de pago de derechos.
 * @property {number} [tabSeleccionado] - Pestaña seleccionada actualmente.
 */
export interface Tramite260210State {
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
 * Crea el estado inicial para el trámite 260210.
 *
 * @returns {Tramite260210State} El estado inicial del store.
 */
export function createInitialState(): Tramite260210State {
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
    scianConfigDatos: [],
    tablaMercanciasConfigDatos: [],
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

/**
 * Store que maneja el estado del trámite 260210.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260210', resettable: true })
export class Tramite260214Store extends Store<Tramite260210State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del formulario de solicitud.
   *
   * @param datosSolicitudFormState - Estado actualizado del formulario.
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
   * Agrega nuevos fabricantes a la lista existente.
   *
   * @param newFabricantes - Arreglo de objetos `Fabricante` a añadir.
   */
  public updateFabricanteTablaDatos(newFabricantes: Fabricante[]): void {
    this.update((state) => ({
      ...state,
      fabricanteTablaDatos: [...state.fabricanteTablaDatos, ...newFabricantes],
    }));
  }

  /**
   * Agrega nuevos destinatarios finales a la lista existente.
   *
   * @param newDestinatarios - Arreglo de objetos `Destinatario` a añadir.
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
   * Agrega nuevos proveedores a la lista existente.
   *
   * @param newProveedores - Arreglo de objetos `Proveedor` a añadir.
   */
  public updateProveedorTablaDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  /**
   * Agrega nuevos facturadores a la lista existente.
   *
   * @param newFacturadores - Arreglo de objetos `Facturador` a añadir.
   */
  public updateFacturadorTablaDatos(newFacturadores: Facturador[]): void {
    this.update((state) => ({
      ...state,
      facturadorTablaDatos: [...state.facturadorTablaDatos, ...newFacturadores],
    }));
  }

  /**
   * Actualiza las opciones de configuración disponibles.
   *
   * @param opcionConfigDatos - Arreglo actualizado de `TablaOpcionConfig`.
   */
  public updateOpcionConfigDatos(opcionConfigDatos: TablaOpcionConfig[]): void {
    this.update((state) => ({
      ...state,
      opcionConfigDatos,
    }));
  }

  /**
   * Actualiza las configuraciones SCIAN disponibles.
   *
   * @param scianConfigDatos - Arreglo actualizado de `TablaScianConfig`.
   */
  public updateScianConfigDatos(scianConfigDatos: TablaScianConfig[]): void {
    this.update((state) => ({
      ...state,
      scianConfigDatos,
    }));
  }

  /**
   * Actualiza la configuración de la tabla de mercancías.
   *
   * @param tablaMercanciasConfigDatos - Arreglo actualizado de `TablaMercanciasDatos`.
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
   * Actualiza la información del formulario de pago de derechos.
   *
   * @param nuevoPagoDerechos - Nuevo objeto de tipo `PagoDerechosFormState`.
   */
  public updatePagoDerechos(nuevoPagoDerechos: PagoDerechosFormState): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: nuevoPagoDerechos,
    }));
  }

  /**
   * Cambia la pestaña actualmente seleccionada.
   *
   * @param tabSeleccionado - Índice de la nueva pestaña seleccionada.
   */
  public updateTabSeleccionado(tabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      tabSeleccionado: tabSeleccionado,
    }));
  }
}
