import { DatosSolicitud, Mercancia } from "../../tramites/130401/models/modificacion-descripcion.model";
import { Injectable } from "@angular/core";
import { Store } from "@datorama/akita";
import { StoreConfig } from "@datorama/akita";


/**
 * Interfaz que define el estado del trámite 130401.
 * 
 * Esta interfaz incluye las propiedades necesarias para gestionar el estado del trámite,
 * como el paso activo, la pestaña activa, el folio de permiso, los datos de la solicitud
 * y los datos de la mercancía.
 */
export interface Tramite130401State {
  /**
   * Paso activo del trámite.
   * 
   * Indica el número del paso actual en el flujo del trámite.
   */
  pasoActivo: number;

  /**
   * Pestaña activa del trámite.
   * 
   * Indica el índice de la pestaña activa en el flujo del trámite.
   */
  pestanaActiva: number;

  /**
   * Folio de permiso del trámite.
   * 
   * Representa el folio de permiso asociado al trámite.
   */
  folioPermiso: string;

  /**
   * Datos de la solicitud.
   * 
   * Contiene información detallada sobre la solicitud del trámite.
   */
  datosSolicitud: DatosSolicitud;

  /**
   * Datos de la mercancía.
   * 
   * Contiene información detallada sobre la mercancía asociada al trámite.
   */
  mercancia: Mercancia;
}

/**
 * Función para crear el estado inicial del trámite 130401.
 * 
 * Esta función devuelve un objeto con los valores predeterminados para el estado del trámite.
 * 
 * @returns {Tramite130401State} El estado inicial del trámite.
 */
export function createInitialState(): Tramite130401State {
  return {
    pasoActivo: 1,
    pestanaActiva: 1,
    folioPermiso: '',
    datosSolicitud: {
      numeroFolioTramiteOriginal: '',
      solicitud: '',
      regimen: '',
      clasificacionRegimen: '',
      condicionMercancia: '',
      mercanciaDescripcion: '',
      fraccionArancelaria: '',
      unidadMedidaComercial: '',
      unidadesAutorizadas: '',
      importeFacturaAutorizadoUSD: '',
      usoEspecifico: '',
      justificacionImportacionExportacion: '',
      observaciones: '',
      representacionFederal: ''
    },
    mercancia: {
      numeroFolioResolucion: '',
      cantidadLibreMercancia: '',
      descripcion: '',
      descripcionModificacion: '',
    }
  };
}

/**
 * Store para gestionar el estado del trámite 130401.
 * 
 * Este store utiliza Akita para manejar el estado global del trámite, incluyendo
 * información como el paso activo, pestaña activa, folio de permiso, datos de la solicitud
 * y datos de la mercancía.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite130401', resettable: true })
export class Tramite130401Store extends Store<Tramite130401State> {

  /**
   * Constructor del store.
   * 
   * Inicializa el estado con los valores predeterminados definidos en `createInitialState`.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el paso activo del trámite.
   * 
   * @param {number} pasoActivo - El número del paso activo.
   */
  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({
      ...state,
      pasoActivo,
    }));
  }

  /**
   * Actualiza la pestaña activa del trámite.
   * 
   * @param {number} pestanaActiva - El índice de la pestaña activa.
   */
  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({
      ...state,
      pestanaActiva,
    }));
  }

  /**
   * Actualiza el folio de permiso del trámite.
   * 
   * @param {string} folioPermiso - El folio de permiso.
   */
  public setFolioPermiso(folioPermiso: string): void {
    this.update((state) => ({
      ...state,
      folioPermiso,
    }));
  }

  /**
   * Actualiza los datos de la solicitud.
   * 
   * @param {DatosSolicitud} datosSolicitud - Los datos de la solicitud.
   */
  public setSolicitud(datosSolicitud: DatosSolicitud): void {
    this.update((state) => ({
      ...state,
      datosSolicitud,
    }));
  }

  /**
   * Actualiza los datos de la mercancía.
   * 
   * @param {Mercancia} mercancia - Los datos de la mercancía.
   */
  public setMercancia(mercancia: Mercancia): void {
    this.update((state) => ({
      ...state,
      mercancia,
    }));
  }

  /**
   * Actualiza la descripción de modificación de la mercancía.
   * 
   * @param {string} descripcionModificacion - La nueva descripción de modificación.
   */
  public setDescripcionModificacion(descripcionModificacion: string): void {
    this.update((state) => ({
      ...state,
      mercancia: { ...state.mercancia, descripcionModificacion },
    }));
  }
}