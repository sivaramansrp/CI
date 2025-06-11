import {
  DatosModificacion,
  DatosSolicitante,
} from '../models/datos-tramite.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Representa el estado de la solicitud 80316.
 */
export interface Solicitud80316State {
  /**
   * Datos del solicitante.
   */
  datosSolicitante: DatosSolicitante;

  /**
   * Lista de plantas a dar de alta.
   */
  altaPlanta: Catalogo[];

  /**
   * Estado seleccionado.
   */
  estado: Catalogo;

  /**
   * Estado de validación del formulario.
   * Las claves son los nombres de los campos y los valores indican si son válidos.
   */
  formaValida: { [key: string]: boolean };

  /**
   * RFC del solicitante.
   */
  rfc: string;

  /**
   * Información federal del solicitante.
   */
  federal: string;

  /**
   * Tipo de trámite.
   */
  tipo: string;

  /**
   * Programa seleccionado.
   */
  programa: string;

  /**
   * Actividad actual del solicitante.
   */
  actividadActual: string;

  /**
   * Lista de actividades productivas.
   */
  actividadProductiva: Catalogo[] | null;

  /**
   * Tipo de persona seleccionada.
   */
  tipoDePersona: Catalogo[] | null;

  /**
   * RFC del importador/exportador.
   */
  RFCImpExp: string;
}

/**
 * Crea el estado inicial de la solicitud 80316.
 *
 * @returns {Solicitud80316State} - Estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud80316State {
  return {
    datosSolicitante: {
      rfc: '',
      denominacion: '',
      actividadEconomica: '',
      correoElectronico: '',
    },
    rfc: '',
    federal: '',
    tipo: '',
    programa: '',
    actividadActual: '',
    actividadProductiva: null,
    tipoDePersona: null,
    RFCImpExp: '',
    altaPlanta: [],
    estado: {
      id: -1,
      descripcion: '',
    },
    formaValida: {
      entidadFederativa: false,
    },
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite80316', resettable: true })
export class Tramite80316Store extends Store<Solicitud80316State> {
  /**
   * Constructor de la clase `Tramite80316Store`.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece las actividades productivas en el estado.
   *
   * @param {Catalogo[]} actividadProductiva - Lista de actividades productivas.
   */
  public setActividadProductiva(actividadProductiva: Catalogo[] | null): void {
    this.update((state) => ({
      ...state,
      actividadProductiva,
    }));
  }

  /**
   * Establece el estado seleccionado en el almacén.
   *
   * @param {Catalogo} estado - Estado a establecer.
   */
  public setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Establece las plantas a dar de alta en el estado.
   *
   * @param {Catalogo[]} altaPlanta - Lista de plantas.
   */
  public setaltaPlanta(altaPlanta: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      altaPlanta,
    }));
  }

  /**
   * Establece el estado de validación del formulario.
   *
   * @param {Object} formaValida - Objeto con los estados de validación de los campos.
   */
  public setFormValida(formaValida: { [key: string]: boolean }): void {
    this.update((state) => {
      const IS_VALID = { ...state.formaValida, ...formaValida };
      return {
        ...state,
        formaValida: IS_VALID,
      };
    });
  }

  /**
   * Establece los datos del solicitante en el estado.
   *
   * @param {DatosSolicitante} datosSolicitante - Datos del solicitante.
   */
  public setDatosSolicitante(datosSolicitante: DatosSolicitante): void {
    this.update((state) => ({
      ...state,
      datosSolicitante,
    }));
  }

  /**
   * Establece los datos de modificación en el estado.
   *
   * @param {DatosModificacion} datosModificacion - Datos de modificación.
   */
  public setDatosModificacion(datosModificacion: DatosModificacion): void {
    this.update((state) => ({
      ...state,
      datosModificacion,
    }));
  }

  /**
   * Establece el tipo de búsqueda en el estado.
   *
   * @param {string} tipoBusqueda - Tipo de búsqueda.
   */
  public setTipoBusqueda(tipoBusqueda: string): void {
    this.update((state) => ({
      ...state,
      tipoBusqueda,
    }));
  }

  /**
   * Establece el tipo de persona en el estado.
   *
   * @param {Catalogo[]} tipoDePersona - Lista de tipos de persona.
   */
  public setTipoDePersona(tipoDePersona: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      tipoDePersona,
    }));
  }

  /**
   * Establece el RFC del importador/exportador en el estado.
   *
   * @param {string} RFCImpExp - RFC del importador/exportador.
   */
  public setRFCImpExp(RFCImpExp: string): void {
    this.update((state) => ({
      ...state,
      RFCImpExp,
    }));
  }

  /**
   * Limpia el estado de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
