import {
  DatosSolicitudFormState,
  MercanciaFormEstupefacientes,
} from '../../../shared/models/datos-solicitud.model';
import { Destinatario } from '../../../shared/models/terceros-relacionados.model';
import { Facturador } from '../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { PagoDerechosFormState } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TABLA_OPCION_DATA } from '../../../shared/constantes/datos-solicitud.enum';
import { TablaMercanciasDatos } from '../../../shared/models/datos-solicitud.model';
import { TablaOpcionConfig } from '../../../shared/models/datos-solicitud.model';
import { TablaScianConfig } from '../../../shared/models/datos-solicitud.model';

/**
 * Estado que representa los datos de un trámite 260301, incluyendo tablas de datos, formularios y configuraciones.
 * 
 * @interface Tramite260301State
 * @property {Destinatario[]} certificadoTablaDatos - Datos de destinatarios para la tabla de certificados.
 * @property {Facturador[]} facturadorTablaDatos - Datos de facturadores para la tabla de facturadores.
 * @property {Facturador[]} proveedorTablaDatos - Datos de proveedores para la tabla de proveedores.
 * @property {Facturador[]} fabricanteTablaDatos - Datos de fabricantes para la tabla de fabricantes.
 * @property {Facturador[]} otrosTablaDatos - Datos de otros para la tabla de otros.
 * @property {DatosSolicitudFormState} datosSolicitudFormState - Estado del formulario de solicitud de datos.
 * @property {MercanciaFormEstupefacientes} mercanciaForm - Formulario relacionado con la mercancía de estupefacientes.
 * @property {TablaOpcionConfig[]} opcionConfigDatos - Datos de configuración de opciones.
 * @property {TablaScianConfig[]} scianConfigDatos - Datos de configuración SCIAN.
 * @property {TablaMercanciasDatos[]} tablaMercanciasConfigDatos - Datos de configuración de mercancías.
 * @property {TablaOpcionConfig[]} seleccionadoopcionDatos - Datos de selección de opciones.
 * @property {TablaScianConfig[]} seleccionadoScianDatos - Datos de selección SCIAN.
 * @property {TablaMercanciasDatos[]} seleccionadoTablaMercanciasDatos - Datos de selección de mercancías.
 * @property {boolean} opcionesColapsableState - Estado de las opciones colapsables (si están expandidas o colapsadas).
 * @property {PagoDerechosFormState} pagoDerechos - Estado del formulario de pago de derechos.
 * @property {number} [tabSeleccionado] - Índice del tab seleccionado (opcional).
 */
export interface Tramite260301State {
  certificadoTablaDatos: Destinatario[];
  facturadorTablaDatos: Facturador[];
  proveedorTablaDatos: Facturador[];
  fabricanteTablaDatos: Facturador[];
  otrosTablaDatos: Facturador[];

  datosSolicitudFormState: DatosSolicitudFormState;
  mercanciaForm: MercanciaFormEstupefacientes;
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
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial para la tienda del trámite 260301.
 * @returns {Tramite260301State} Estado inicial.
 */
export function createInitialState(): Tramite260301State {
  return {
    otrosTablaDatos:[],
    certificadoTablaDatos: [],
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
      regimenLaMercancia: '',
      aduana: '',
    },
    mercanciaForm: {
      clasificacionProducto: '',
      especificarClasificacionProducto: '',
      marcaComercialDenominacion: '',
      denominacionCumonInternacional: '',
      tipoProducto: '',
      formaFarmaceutica: '',
      estadoFisico: '',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUmtValor: '',
      cantidadUmt: '',
      cantidadUmcValor: '',
      cantidadUmc: '',
      numeroCAS: '',
      cantidadDeLotes: '',
      kgPorLote: '',
      paisDeDestino:'',
      paisDeProcedencia: '',
      detallarUsoEspecifico:'',
      numeroDePiezasAFabricar:'',
      descripcionNumeroDePiezas:'',
      presentacion: '',
      numeroRegistroSanitario: '',
      usoEspecifico: '',
      paisOrigen:''
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

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260301', resettable: true })
/**
 * @class
 * @name Tramite260301Store
 * @description
 * Tienda para manejar el estado del trámite 260301. Proporciona métodos para actualizar
 * diferentes partes del estado.
 * @extends {Store<Tramite260301State>}
 */
export class Tramite260301Store extends Store<Tramite260301State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * @method updateDatosSolicitudFormState
   * @description Actualiza el estado del formulario de datos de la solicitud.
   * @param {DatosSolicitudFormState} datosSolicitudFormState - Nuevo estado del formulario.
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
   * @method updateFabricanteTablaDatos
   * @description Agrega nuevos fabricantes a la lista existente.
   * @param {Facturador[]} newFabricantes - Lista de nuevos fabricantes.
   */
  public updateFabricanteTablaDatos(newFabricantes: Facturador[]): void {
    this.update((state) => ({
      ...state,
      fabricanteTablaDatos: [...state.fabricanteTablaDatos, ...newFabricantes],
    }));
  }

  /**
   * @method updateDestinatarioFinalTablaDatos
   * @description Agrega nuevos destinatarios finales a la lista existente.
   * @param {Facturador[]} newDestinatarios - Lista de nuevos destinatarios.
   */
  public updateCertificadoTablaDatos(
    certificadoTablaDatos: Facturador[]
  ): void {
    this.update((state) => ({
      ...state,
      certificadoTablaDatos: [
        ...state.certificadoTablaDatos,
        ...certificadoTablaDatos,
      ],
    }));
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Agrega nuevos proveedores a la lista existente.
   * @param {Facturador[]} newProveedores - Lista de nuevos proveedores.
   */
  public updateProveedorTablaDatos(newProveedores: Facturador[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  /**
   * @method updateFacturadorTablaDatos
   * @description Agrega nuevos facturadores a la lista existente.
   * @param {Facturador[]} newFacturadores - Lista de nuevos facturadores.
   */
  public updateFacturadorTablaDatos(newFacturadores: Facturador[]): void {
    this.update((state) => ({
      ...state,
      facturadorTablaDatos: [...state.facturadorTablaDatos, ...newFacturadores],
    }));
  }

  /**
   * @method updateOtrosTablaDatos
   * @description Agrega nuevos facturadores a la lista existente.
   * @param {Facturador[]} otrosTablaDatos - Lista de nuevos Otros.
   */
  public updateOtrosTablaDatos(otrosTablaDatos: Facturador[]): void {
    this.update((state) => ({
      ...state,
      otrosTablaDatos: [...state.otrosTablaDatos, ...otrosTablaDatos],
    }));
  }

  /**
   * @method updateOpcionConfigDatos
   * @description
   * Actualiza la configuración de opciones de la tabla en el estado.
   *
   * @param {TablaOpcionConfig[]} opcionConfigDatos - Nueva configuración de opciones de la tabla.
   */
  public updateOpcionConfigDatos(opcionConfigDatos: TablaOpcionConfig[]): void {
    this.update((state) => ({
      ...state,
      opcionConfigDatos,
    }));
  }

  /**
   * @method updateSeleccionadoOpcionDatos
   * @description Actualiza la opción seleccionada en el estado.
   * @param {TablaOpcionConfig[]} seleccionadoOpcionDatos - Nueva opción seleccionada.
   */
  public updateScianConfigDatos(scianConfigDatos: TablaScianConfig[]): void {
    this.update((state) => ({
      ...state,
      scianConfigDatos,
    }));
  }

  /**
   * @method updateSeleccionadoOpcionDatos
   * @description Actualiza la opción seleccionada en el estado.
   * @param {TablaOpcionConfig[]} seleccionadoOpcionDatos - Nueva opción seleccionada.
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
   * @method updatePagoDerechos
   * @description Actualiza el estado del formulario de pago de derechos.
   * @param {PagoDerechosFormState} nuevoPagoDerechos - Nuevo estado del formulario.
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
