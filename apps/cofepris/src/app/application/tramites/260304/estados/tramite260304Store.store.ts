import {
  DatosSolicitudFormState,
  MercanciaFormEstupefacientes,
} from '../../../shared/models/datos-solicitud.model';
import {
  Destinatario,
  Fabricante,
  Facturador,
  Proveedor,
} from '../../../shared/models/terceros-relacionados.model';
import { TABLA_OPCION_DATA, TIPO_ACTUALIZACION } from '../../../shared/constantes/datos-solicitud.enum';
import { Injectable } from '@angular/core';
import { Otros } from '../models/medicamentos-contengan.model';
import { PagoDerechosFormState } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TablaMercanciasDatos } from '../../../shared/models/datos-solicitud.model';
import { TablaOpcionConfig } from '../../../shared/models/datos-solicitud.model';
import { TablaScianConfig } from '../../../shared/models/datos-solicitud.model';
export interface Tramite260304State {
  /**
   * @type {Destinatario[]}
   * Lista de datos de destinatarios
   */
  destinatarioTableDatos: Destinatario[];

  /**
   * @type {Otros[]}
   * Lista de datos de otros
   */
  otrosTablaDatos: Otros[];

  /**
   * @type {DatosSolicitudFormState}
   * Estado del formulario de datos de solicitud
   */
  datosSolicitudFormState: DatosSolicitudFormState;

  /**
   * @type {MercanciaFormEstupefacientes}
   * Formulario de mercancías estupefacientes
   */
  mercanciaForm: MercanciaFormEstupefacientes;

  /**
   * @type {TablaOpcionConfig[]}
   * Configuración de opciones para la tabla
   */
  opcionConfigDatos: TablaOpcionConfig[];

  /**
   * @type {TablaScianConfig[]}
   * Configuración de datos SCIAN para la tabla
   */
  scianConfigDatos: TablaScianConfig[];

  /**
   * @type {TablaMercanciasDatos[]}
   * Configuración de datos de mercancías para la tabla
   */
  tablaMercanciasConfigDatos: TablaMercanciasDatos[];

  /**
   * @type {TablaOpcionConfig[]}
   * Opciones seleccionadas para la tabla
   */
  seleccionadoopcionDatos: TablaOpcionConfig[];

  /**
   * @type {TablaScianConfig[]}
   * Datos SCIAN seleccionados para la tabla
   */
  seleccionadoScianDatos: TablaScianConfig[];

  seleccionadoOtrosDatos?: Otros[];
   seleccionadoDestinatarioDatos?: Destinatario[];

  /**
   * @type {TablaMercanciasDatos[]}
   * Datos de mercancías seleccionados para la tabla
   */
  seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[];

  /**
   * @type {boolean}
   * Estado de las opciones colapsables (expandido/colapsado)
   */
  opcionesColapsableState: boolean;

  /**
   * @type {PagoDerechosFormState}
   * Estado del formulario de pago de derechos
   */
  pagoDerechos: PagoDerechosFormState;

  /**
   * @type {number | undefined}
   * Índice de la pestaña seleccionada
   */
  tabSeleccionado?: number;
}

/**
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial para la tienda del trámite 260304.
 * @returns {Tramite260304State} Estado inicial.
 */
export function createInitialState(): Tramite260304State {
  return {
    otrosTablaDatos: [],
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
      paisDeDestino: '',
      paisDeProcedencia: '',
      detallarUsoEspecifico: '',
      numeroDePiezasAFabricar: '',
      descripcionNumeroDePiezas: '',
      presentacion: '',
      numeroRegistroSanitario: '',
      usoEspecifico: '',
      paisOrigen: '',
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
      banco: '',
    },
    tabSeleccionado: 1,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260304', resettable: true })
/**
 * @class
 * @name Tramite260304Store
 * @description
 * Tienda para manejar el estado del trámite 260304. Proporciona métodos para actualizar
 * diferentes partes del estado.
 * @extends {Store<Tramite260304State>}
 */
export class Tramite260304Store extends Store<Tramite260304State> {
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
   * @description Agrega nuevos fabricantes a la lista existente.
   * @param {Destinatario[]} newFabricantes - Lista de nuevos fabricantes.
   */
 public updateDestinatarioTablaDatos(
    newDestinatarios: Destinatario[],
    tipoActualizacion?: string
  ): void {
    this.update((state) => {
      return {
        ...state,
        destinatarioTableDatos:Tramite260304Store.actualizarLista(
          state.destinatarioTableDatos,
          newDestinatarios,
          'nombreRazonSocial',
          tipoActualizacion
        ),
        seleccionadoDestinatarioDatos: [],
      };
    });
  }

  /**
   * @method updateOtrosTablaDatos
   * @description Agrega nuevos facturadores a la lista existente.
   * @param {Otros[]} otrosTablaDatos - Lista de nuevos Otros.
   */
  public updateOtrosTablaDatos(
    newOtros: Otros[],
    tipoActualizacion?: string
  ): void {
    this.update((state) => {
      return {
        ...state,
        otrosTablaDatos: Tramite260304Store.actualizarLista(
          state.otrosTablaDatos,
          newOtros,
          'rfc',
          tipoActualizacion
        ),
        seleccionadoOtrosDatos: [],
      };
    });
  }
   /**
   * @method updateMercanciaForm
   * @description Actualiza el formulario de mercancía.
   */
  public static actualizarLista<
    T extends Fabricante | Destinatario | Proveedor | Facturador | Otros
  >(
    listaOriginal: T[],
    nuevosLista: T[],
    clave: keyof T,
    tipoActualizacion?: string
  ): T[] {
    if (tipoActualizacion === TIPO_ACTUALIZACION.ELIMINAR) {
      let listaActualizada = [...listaOriginal];
      listaActualizada = listaActualizada.filter(
        (item: Fabricante | Destinatario | Proveedor | Facturador | Otros) => {
          return !nuevosLista.some(
            (
              nuevo: Fabricante | Destinatario | Proveedor | Facturador | Otros
            ) =>
              nuevo[clave as keyof typeof nuevo] ===
              item[clave as keyof typeof item]
          );
        }
      );
      return listaActualizada;
    }
    const LISTA_ACTUALIZADA = [...listaOriginal];
    const INDICE_ENCONTRADO = LISTA_ACTUALIZADA.findIndex(
      (item) => item?.[clave] === nuevosLista?.[0]?.[clave]
    );

    if (INDICE_ENCONTRADO !== -1) {
      LISTA_ACTUALIZADA.splice(INDICE_ENCONTRADO, 1, nuevosLista[0]);
    } else {
      LISTA_ACTUALIZADA.push(...nuevosLista);
    }

    return LISTA_ACTUALIZADA;
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
   * @method updateSeleccionadoOtrosDatos
   * @description Actualiza los datos de otros seleccionados.
   */
  public updateSeleccionadoOtrosDatos(neuvoOtros: Otros[]): void {
    this.update((state) => ({
      ...state,
      seleccionadoOtrosDatos: neuvoOtros,
    }));
  }
  /**
   * @method updateSeleccionadoDestinatarioDatos
   * @description Actualiza los datos del destinatario seleccionado.
   */
  public updateSeleccionadoDestinatarioDatos(
    neuvoDestinatario: Destinatario[]
  ): void {
    this.update((state) => ({
      ...state,
      seleccionadoDestinatarioDatos: neuvoDestinatario,
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
      seleccionadoTablaMercanciasDatos:[]
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
