import {
  DatosSolicitudFormState,
  MercanciaForm,
  TablaOpcionConfig,
  TablaScianConfig,
} from '../../../shared/models/datos-solicitud.model';
import { Destinatario, Fabricante, PagoDerechosFormState } from '../../../shared/models/terceros-relacionados.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TABLA_OPCION_DATA } from '../../../shared/constantes/datos-solicitud.enum';
import { TablaMercanciasImportacion } from '../models/importicon-retorno.model';

/**
 * @interface Tramite260103State
 * @description Estado que representa los datos de un trámite 260103, incluyendo tablas de datos, formularios y configuraciones.
 */
export interface Tramite260103State {
  /** Lista de destinatarios registrados */
  destinatarioTableDatos: Destinatario[];

  /** Lista de fabricantes registrados */
  fabricanteTablaDatos: Fabricante[];

  /** Estado del formulario con datos generales de la solicitud */
  datosSolicitudFormState: DatosSolicitudFormState;

  /** Formulario con información de la mercancía a importar */
  mercanciaForm: MercanciaForm;

  /** Configuración de opciones de la tabla (catálogo completo) */
  opcionConfigDatos: TablaOpcionConfig[];

  /** Configuración SCIAN disponible */
  scianConfigDatos: TablaScianConfig[];

  /** Configuración de mercancías disponibles */
  tablaMercanciasConfigDatos: TablaMercanciasImportacion[];

  /** Opciones seleccionadas por el usuario */
  seleccionadoopcionDatos: TablaOpcionConfig[];

  /** Configuración SCIAN seleccionada */
  seleccionadoScianDatos: TablaScianConfig[];

  /** Mercancías seleccionadas para la importación */
  seleccionadoTablaMercanciasImportacion: TablaMercanciasImportacion[];

  /** Indica si las opciones colapsables están expandidas o contraídas */
  opcionesColapsableState: boolean;

  /** Estado del formulario de pago de derechos */
  pagoDerechos: PagoDerechosFormState;

  /** Índice del tab actualmente seleccionado (opcional) */
  tabSeleccionado?: number;
}

/**
 * Crea y retorna el estado inicial para la funcionalidad Tramite260103.
 *
 * @returns {Tramite260103State} El estado inicial con valores por defecto para todas las propiedades,
 * incluyendo formularios, datos de configuración y estado de la interfaz.
 */
export function createInitialState(): Tramite260103State {
  return {
    fabricanteTablaDatos: [],
    destinatarioTableDatos: [],
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
      usoEspecifico: [],
    },
    opcionConfigDatos: TABLA_OPCION_DATA,
    scianConfigDatos: [],
    tablaMercanciasConfigDatos: [],
    seleccionadoopcionDatos: [],
    seleccionadoScianDatos: [],
    seleccionadoTablaMercanciasImportacion: [],
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
@StoreConfig({ name: 'tramite260103', resettable: true })
/**
 * @class Tramite260103Store
 * @description Tienda para manejar el estado del trámite 260103. Proporciona métodos para actualizar el estado del formulario, tablas y configuraciones.
 * @extends {Store<Tramite260103State>}
 */
export class Tramite260103Store extends Store<Tramite260103State> {
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
   * @method updateDestinatarioTablaDatos
   * @description Agrega nuevos destinatarios a la tabla correspondiente.
   * @param {Destinatario[]} newDestinatario - Lista de nuevos destinatarios a agregar.
   */
  public updateDestinatarioTablaDatos(newDestinatario: Destinatario[]): void {
    this.update((state) => ({
      ...state,
      destinatarioTableDatos: [...state.destinatarioTableDatos, ...newDestinatario],
    }));
  }

  /**
   * @method updateFabricanteTablaDatos
   * @description Actualiza o agrega nuevos fabricantes a la tabla de fabricantes.
   * Si se proporciona un `id`, se busca coincidencia para actualizar el registro existente.
   * @param {Fabricante[]} fabricanteTablaDatos - Lista de nuevos o actualizados fabricantes.
   * @param {number} [id] - ID del fabricante a actualizar (opcional).
   */
  public updateFabricanteTablaDatos(fabricanteTablaDatos: Fabricante[], id?: number): void {
    this.update((state) => {
      const UPDATED_LIST = [...state.fabricanteTablaDatos];
      fabricanteTablaDatos.forEach((nuevo) => {
        const INDEX = UPDATED_LIST.findIndex(item => item.id === nuevo.id);
        if (id && nuevo.id === id && INDEX !== -1) {
          UPDATED_LIST[INDEX] = { ...UPDATED_LIST[INDEX], ...nuevo };
        } else if (!id || INDEX === -1) {
          UPDATED_LIST.push(nuevo);
        }
      });

      return {
        ...state,
        fabricanteTablaDatos: UPDATED_LIST
      };
    });
  }

  /**
   * @method updateOpcionConfigDatos
   * @description Actualiza la configuración de opciones en el estado.
   * @param {TablaOpcionConfig[]} opcionConfigDatos - Nuevas configuraciones de opciones.
   */
  public updateOpcionConfigDatos(opcionConfigDatos: TablaOpcionConfig[]): void {
    this.update((state) => ({
      ...state,
      opcionConfigDatos,
    }));
  }

  /**
   * @method updateScianConfigDatos
   * @description Actualiza las configuraciones SCIAN disponibles.
   * @param {TablaScianConfig[]} scianConfigDatos - Nuevas configuraciones SCIAN.
   */
  public updateScianConfigDatos(scianConfigDatos: TablaScianConfig[]): void {
    this.update((state) => ({
      ...state,
      scianConfigDatos,
    }));
  }

  /**
   * @method updateTablaMercanciasConfigDatos
   * @description Actualiza la configuración de mercancías importadas.
   * @param {TablaMercanciasImportacion[]} tablaMercanciasConfigDatos - Nueva configuración de mercancías.
   */
  public updateTablaMercanciasConfigDatos(
    tablaMercanciasConfigDatos: TablaMercanciasImportacion[]
  ): void {
    this.update((state) => ({
      ...state,
      tablaMercanciasConfigDatos,
    }));
  }

  /**
   * @method updatePagoDerechos
   * @description Actualiza el estado del formulario de pago de derechos.
   * @param {PagoDerechosFormState} nuevoPagoDerechos - Nuevo estado del pago.
   */
  public updatePagoDerechos(nuevoPagoDerechos: PagoDerechosFormState): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: nuevoPagoDerechos,
    }));
  }

  /**
   * @method updateTabSeleccionado
   * @description Actualiza el índice del tab seleccionado por el usuario.
   * @param {number} tabSeleccionado - Nuevo índice de pestaña seleccionada.
   */
  public updateTabSeleccionado(tabSeleccionado: number): void {
    this.update((state) => ({
      ...state,
      tabSeleccionado: tabSeleccionado,
    }));
  }
}
