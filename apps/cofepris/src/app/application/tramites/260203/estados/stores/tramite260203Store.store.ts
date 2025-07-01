import { DatosSolicitudFormState } from '../../../../shared/models/datos-solicitud.model';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { DetalleMercancia } from '../../../../shared/models/detalle-mercancia.model';
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
 * Representa el estado de la aplicación para el trámite 260203.
 */
export interface Tramite260203State {
  /**
   * Lista de destinatarios finales en la tabla de datos.
   */
  destinatarioFinalTablaDatos: Destinatario[];

  /**
   * Lista de facturadores en la tabla de datos.
   */
  facturadorTablaDatos: Facturador[];

  /**
   * Lista de proveedores en la tabla de datos.
   */
  proveedorTablaDatos: Proveedor[];

  /**
   * Lista de fabricantes en la tabla de datos.
   */
  fabricanteTablaDatos: Fabricante[];

  /**
   * Estado del formulario de datos de la solicitud.
   */
  datosSolicitudFormState: DatosSolicitudFormState;

  /**
   * Información del formulario de mercancía.
   */
  mercanciaForm: MercanciaForm;

  /**
   * Configuración de opciones en la tabla de datos.
   */
  opcionConfigDatos: TablaOpcionConfig[];

  /**
   * Configuración de SCIAN en la tabla de datos.
   */
  scianConfigDatos: TablaScianConfig[];

  /**
   * Configuración de mercancías en la tabla de datos.
   */
  tablaMercanciasConfigDatos: TablaMercanciasDatos[];

  /**
   * Opciones seleccionadas en la tabla de datos.
   */
  seleccionadoopcionDatos: TablaOpcionConfig[];

  /**
   * SCIAN seleccionado en la tabla de datos.
   */
  seleccionadoScianDatos: TablaScianConfig[];

  /**
   * Mercancías seleccionadas en la tabla de datos.
   */
  seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[];

  /**
   * Estado de las opciones colapsables.
   */
  opcionesColapsableState: boolean;

  /**
   * Información del formulario de pago de derechos.
   */
  pagoDerechos: PagoDerechosFormState;

  /**
   * Detalle de mercancías en la tabla de datos.
   */
  detalleMercanciaTabla: DetalleMercancia[];

  /**
   * Índice actual utilizado en el estado.
   */
  indice: number;
}

/**
 * Crea el estado inicial del trámite 260203.
 * @returns {Tramite260203State} El estado inicials
 */
export function createInitialState(): Tramite260203State {
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
    detalleMercanciaTabla: [],
    indice: 1,
  };
}


/**
 * Decorador que marca esta clase como un servicio inyectable en Angular.
 * 
 * Este servicio se registra en el nivel raíz del inyector, lo que significa que estará disponible
 * en toda la aplicación sin necesidad de declararlo explícitamente en los módulos.
 * 
 * @Injectable({
 *   providedIn: 'root'
 * })
 * 
 * - `providedIn: 'root'`: Indica que el servicio se proporciona en el inyector raíz de la aplicación.
 * Esto asegura que haya una única instancia del servicio compartida en toda la aplicación.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260203', resettable: true })
export class Tramite260203Store extends Store<Tramite260203State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado de los datos del formulario de solicitud.
   * @param {DatosSolicitudFormState} datosSolicitudFormState - Estado del formulario de solicitud
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
   * Actualiza la tabla de fabricantes.
   * @param {Fabricante[]} newFabricantes - Nuevos fabricantes a agregar
   */
  public updateFabricanteTablaDatos(newFabricantes: Fabricante[]): void {
    this.update((state) => ({
      ...state,
      fabricanteTablaDatos: [...state.fabricanteTablaDatos, ...newFabricantes],
    }));
  }

  /**
   * Actualiza la tabla de destinatarios finales.
   * @param {Destinatario[]} newDestinatarios - Nuevos destinatarios a agregar
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
   * Actualiza la tabla de proveedores.
   * @param {Proveedor[]} newProveedores - Nuevos proveedores a agregar
   */
  public updateProveedorTablaDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  /**
   * Actualiza la tabla de facturadores.
   * @param {Facturador[]} newFacturadores - Nuevos facturadores a agregar
   */
  public updateFacturadorTablaDatos(newFacturadores: Facturador[]): void {
    this.update((state) => ({
      ...state,
      facturadorTablaDatos: [...state.facturadorTablaDatos, ...newFacturadores],
    }));
  }

  /**
   * Actualiza los datos de configuración de opción.
   * @param {TablaOpcionConfig[]} opcionConfigDatos - Nuevos datos de configuración de opción
   */
  public updateOpcionConfigDatos(opcionConfigDatos: TablaOpcionConfig[]): void {
    this.update((state) => ({
      ...state,
      opcionConfigDatos,
    }));
  }

  /**
   * Actualiza los datos de configuración SCIAN.
   * @param {TablaScianConfig[]} scianConfigDatos - Nuevos datos de configuración SCIAN
   */
  public updateScianConfigDatos(scianConfigDatos: TablaScianConfig[]): void {
    this.update((state) => ({
      ...state,
      scianConfigDatos,
    }));
  }

  /**
   * Actualiza los datos de configuración de mercancías.
   * @param {TablaMercanciasDatos[]} tablaMercanciasConfigDatos - Nuevos datos de configuración de mercancías
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
   * Actualiza los datos del formulario de pago de derechos.
   * @param {PagoDerechosFormState} nuevoPagoDerechos - Nuevos datos de pago de derechos
   */
  public updatePagoDerechos(nuevoPagoDerechos: PagoDerechosFormState): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: nuevoPagoDerechos,
    }));
  }

  /**
   * Agrega un nuevo detalle de mercancía a la tabla.
   * @param {DetalleMercancia} detalleMercancia - Detalles de la mercancía a agregar
   */
  aggregarDetalleMercancia(detalleMercancia: DetalleMercancia): void {
    this.update((state) => {
      const DATOS = {
        ...detalleMercancia,
        id: crypto.randomUUID().toString(),
      };
      return {
        ...state,
        detalleMercanciaTabla: [...state.detalleMercanciaTabla, DATOS],
      };
    });
  }

  /**
   * Elimina un detalle de mercancía de la tabla.
   * @param {DetalleMercancia[]} detalleMercancia - Detalles de mercancía a eliminar
   */
  eliminarDetalleMercancia(detalleMercancia: DetalleMercancia[]): void {
    this.update((state) => {
      const DATOS = [...state.detalleMercanciaTabla].filter((ele) =>
        detalleMercancia.some((datos) => ele.id !== datos.id)
      );
      return {
        ...state,
        detalleMercanciaTabla: DATOS,
      };
    });
  }

  /**
   * Establece el índice del trámite.
   * @param {number} indice - Índice a establecer
   */
  public setIndice(indice: number): void {
    this.update((state) => ({
      ...state,
      indice,
    }));
  }
}
