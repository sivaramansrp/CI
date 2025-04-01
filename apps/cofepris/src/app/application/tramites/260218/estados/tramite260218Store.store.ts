import { DatosSolicitudFormState } from '../../../shared/models/datos-solicitud.model';
import { Destinatario } from '../../../shared/models/terceros-relacionados.model';
import { Fabricante } from '../../../shared/models/terceros-relacionados.model';
import { Facturador } from '../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaForm } from '../../../shared/models/datos-solicitud.model';
import { PRODUCTO_TABLA_DATA } from '../../../shared/constantes/datos-solicitud.enum';
import { PagoDerechosFormState } from '../../../shared/models/terceros-relacionados.model';
import { Proveedor } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TABLA_OPCION_DATA } from '../../../shared/constantes/datos-solicitud.enum';
import { TablaMercanciasDatos } from '../../../shared/models/datos-solicitud.model';
import { TablaOpcionConfig } from '../../../shared/models/datos-solicitud.model';
import { TablaScianConfig } from '../../../shared/models/datos-solicitud.model';

// Definición de la interfaz que representa el estado completo de la solicitud.
export interface Tramite260218State {
  destinatarioFinalTablaDatos: Destinatario[]; // Datos de destinatarios finales.
  facturadorTablaDatos: Facturador[]; // Datos de facturadores.
  proveedorTablaDatos: Proveedor[]; // Datos de proveedores.
  fabricanteTablaDatos: Fabricante[]; // Datos de fabricantes.
  datosSolicitudFormState: DatosSolicitudFormState; // Datos generales de la solicitud.
  mercanciaForm: MercanciaForm; // Información de las mercancías.
  opcionConfigDatos: TablaOpcionConfig[]; // Configuración de las opciones.
  scianConfigDatos: TablaScianConfig[]; // Datos de SCIAN (Sistema de Clasificación de Actividades Económicas).
  tablaMercanciasConfigDatos: TablaMercanciasDatos[]; // Configuración de las mercancías.
  seleccionadoopcionDatos: TablaOpcionConfig[]; // Opciones seleccionadas.
  seleccionadoScianDatos: TablaScianConfig[]; // Datos seleccionados de SCIAN.
  seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[]; // Datos seleccionados de las mercancías.
  opcionesColapsableState: boolean; // Estado de las opciones colapsables en la interfaz.
  pagoDerechos: PagoDerechosFormState; // Datos de pago de derechos.
}

// Función que inicializa el estado de la solicitud.
export function createInitialState(): Tramite260218State {
  return {
    destinatarioFinalTablaDatos: [], // Lista vacía de destinatarios.
    facturadorTablaDatos: [], // Lista vacía de facturadores.
    proveedorTablaDatos: [], // Lista vacía de proveedores.
    fabricanteTablaDatos: [], // Lista vacía de fabricantes.
    datosSolicitudFormState: { // Datos iniciales del formulario de solicitud.
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
    mercanciaForm: { // Datos iniciales para la mercancía.
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
    opcionConfigDatos: TABLA_OPCION_DATA, // Datos iniciales de la tabla de opciones.
    scianConfigDatos: [], // Datos vacíos de la tabla SCIAN.
    tablaMercanciasConfigDatos: PRODUCTO_TABLA_DATA, // Datos iniciales de las mercancías.
    seleccionadoopcionDatos: [], // Opciones seleccionadas vacías.
    seleccionadoScianDatos: [], // Datos seleccionados de SCIAN vacíos.
    seleccionadoTablaMercanciasDatos: [], // Datos seleccionados de mercancías vacíos.
    opcionesColapsableState: false, // Estado inicial de las opciones colapsables.
    pagoDerechos: { // Datos iniciales del pago de derechos.
      claveReferencia: '',
      cadenaDependencia: '',
      estado: '',
      llavePago: '',
      fechaPago: '',
      importePago: '',
    },
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260218', resettable: true })
export class Tramite260218Store extends Store<Tramite260218State> {
  /**
   * @constructor
   * Inicializa el store `Tramite260218Store` con el estado inicial de la solicitud.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @method updateDatosSolicitudFormState
   * @description Actualiza el estado del formulario de solicitud en el store.
   *
   * @param datosSolicitudFormState - Nuevo estado del formulario de solicitud.
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
   * @description Actualiza los datos de los fabricantes en el estado del store.
   * Agrega los nuevos fabricantes a la lista existente.
   *
   * @param newFabricantes - Lista de nuevos fabricantes a agregar.
   */
  public updateFabricanteTablaDatos(newFabricantes: Fabricante[]): void {
    this.update((state) => ({
      ...state,
      fabricanteTablaDatos: [...state.fabricanteTablaDatos, ...newFabricantes],
    }));
  }

  /**
   * @method updateDestinatarioFinalTablaDatos
   * @description Actualiza los datos de los destinatarios finales en el estado del store.
   * Agrega los nuevos destinatarios a la lista existente.
   *
   * @param newDestinatarios - Lista de nuevos destinatarios a agregar.
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
   * @method updateProveedorTablaDatos
   * @description Actualiza los datos de los proveedores en el estado del store.
   * Agrega los nuevos proveedores a la lista existente.
   *
   * @param newProveedores - Lista de nuevos proveedores a agregar.
   */
  public updateProveedorTablaDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  /**
   * @method updateFacturadorTablaDatos
   * @description Actualiza los datos de los facturadores en el estado del store.
   * Agrega los nuevos facturadores a la lista existente.
   *
   * @param newFacturadores - Lista de nuevos facturadores a agregar.
   */
  public updateFacturadorTablaDatos(newFacturadores: Facturador[]): void {
    this.update((state) => ({
      ...state,
      facturadorTablaDatos: [...state.facturadorTablaDatos, ...newFacturadores],
    }));
  }

  /**
   * @method updateOpcionConfigDatos
   * @description Actualiza los datos de configuración de las opciones en el estado del store.
   *
   * @param opcionConfigDatos - Nueva configuración de las opciones.
   */
  public updateOpcionConfigDatos(opcionConfigDatos: TablaOpcionConfig[]): void {
    this.update((state) => ({
      ...state,
      opcionConfigDatos,
    }));
  }

  /**
   * @method updateScianConfigDatos
   * @description Actualiza los datos de configuración de SCIAN en el estado del store.
   *
   * @param scianConfigDatos - Nueva configuración de SCIAN.
   */
  public updateScianConfigDatos(scianConfigDatos: TablaScianConfig[]): void {
    this.update((state) => ({
      ...state,
      scianConfigDatos,
    }));
  }

  /**
   * @method updateTablaMercanciasConfigDatos
   * @description Actualiza los datos de configuración de mercancías en el estado del store.
   *
   * @param tablaMercanciasConfigDatos - Nueva configuración de las mercancías.
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
   * @description Actualiza los datos de pago de derechos en el estado del store.
   *
   * @param nuevoPagoDerechos - Nuevos datos de pago de derechos.
   */
  public updatePagoDerechos(nuevoPagoDerechos: PagoDerechosFormState): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: nuevoPagoDerechos,
    }));
  }
}
