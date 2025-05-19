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
import {
  TABLA_OPCION_DATA,
  TIPO_ACTUALIZACION,
} from '../../../shared/constantes/datos-solicitud.enum';
import { Injectable } from '@angular/core';
import { Otros } from '../models/exporticon-estupefacientes.model';
import { PagoDerechosFormState } from '../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TablaMercanciasDatos } from '../../../shared/models/datos-solicitud.model';
import { TablaOpcionConfig } from '../../../shared/models/datos-solicitud.model';
import { TablaScianConfig } from '../../../shared/models/datos-solicitud.model';

/**
 * Estado que representa los datos de un trámite 260302, incluyendo tablas de datos, formularios y configuraciones.
 *
 * @interface Tramite260302State
 * @property {Destinatario[]} certificadoTablaDatos - Datos de destinatarios para la tabla de certificados.
 * @property {Facturador[]} destinatarioTableDatos - Datos de facturadores para la tabla de facturadores.
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
export interface Tramite260302State {
  destinatarioTableDatos: Destinatario[];
  otrosTablaDatos: Otros[];

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
  seleccionadoDestinatarioDatos?: Destinatario[];
  seleccionadoOtrosDatos?: Otros[];
}

/**
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial para la tienda del trámite 260302.
 * @returns {Tramite260302State} Estado inicial.
 */
export function createInitialState(): Tramite260302State {
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
    seleccionadoDestinatarioDatos: [],
    seleccionadoOtrosDatos: [],
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
@StoreConfig({ name: 'tramite260302', resettable: true })
/**
 * @class
 * @name Tramite260302Store
 * @description
 * Tienda para manejar el estado del trámite 260302. Proporciona métodos para actualizar
 * diferentes partes del estado.
 * @extends {Store<Tramite260302State>}
 */
export class Tramite260302Store extends Store<Tramite260302State> {
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
        destinatarioTableDatos: Tramite260302Store.actualizarLista(
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
  // public updateOtrosTablaDatos(otrosTablaDatos: Otros[]): void {
  //   this.update((state) => ({
  //     ...state,
  //     otrosTablaDatos: [...state.otrosTablaDatos, ...otrosTablaDatos],
  //   }));
  // }

  public updateOtrosTablaDatos(
    newOtros: Otros[],
    tipoActualizacion?: string
  ): void {
    this.update((state) => {
      return {
        ...state,
        otrosTablaDatos: Tramite260302Store.actualizarLista(
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
      tablaMercanciasConfigDatos: tablaMercanciasConfigDatos,
      seleccionadoTablaMercanciasDatos: [],
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
}
