import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import {
  DatosModificacion,
  DatosSolicitante,
} from '../models/datos-tramite.model';
import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Representa el estado de la solicitud 80316.
 */
export interface Solicitud80316State {
  /**
   * Datos del solicitante.
   */
  datosSolicitante: DatosSolicitante;

  altaPlanta: Catalogo[];
  estado: Catalogo;
  formaValida: { [key: string]: boolean };
  rfc: string;
  federal: string;
  tipo: string;
  programa: string;
  actividadActual: string;
  actividadProductiva: Catalogo[] | null;
}

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
  constructor() {
    super(createInitialState());
  }

  public setActividadProductiva(actividadProductiva: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      actividadProductiva,
    }));
  }

  /**
   * Establece el estado en el almacén.
   *
   * @param {Catalogo} estado - El estado que se va a establecer en el almacén.
   *
   * @returns {void} - No devuelve ningún valor.
   */
  setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Establece el alta de plantas en el almacén.
   *
   * @param {Catalogo[]} altaPlanta - Un array de objetos `Catalogo` que representa las plantas a dar de alta.
   *
   * @returns {void} - No devuelve ningún valor.
   */
  setaltaPlanta(altaPlanta: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      altaPlanta,
    }));
  }

  /**
   * Establece el estado de validación del formulario en el almacén.
   *
   * @param {Object} formaValida - Un objeto donde las claves son los nombres de los campos del formulario y los valores son booleanos que indican si el campo es válido o no.
   *
   * @returns {void} - No devuelve ningún valor.
   */
  setFormValida(formaValida: { [key: string]: boolean }): void {
    this.update((state) => {
      const IS_VALID = { ...state.formaValida, ...formaValida };
      return {
        ...state,
        formaValida: IS_VALID,
      };
    });
  }

  /**
   * Establece los datos del solicitante en el estado de la tienda.
   *
   * @param datosSolicitante - Objeto que contiene la información del solicitante.
   */
  public setDatosSolicitante(datosSolicitante: DatosSolicitante): void {
    this.update((state) => ({
      ...state,
      datosSolicitante,
    }));
  }

  /**
   * Establece los datos de modificación en el estado de la tienda.
   *
   * @param datosModificacion - Objeto que contiene los datos de modificación que se deben actualizar en el estado.
   */
  public setDatosModificacion(datosModificacion: DatosModificacion): void {
    this.update((state) => ({
      ...state,
      datosModificacion,
    }));
  }

  /**
   * Establece el tipo de búsqueda en el estado de la tienda.
   *
   * @param tipoBusqueda - El tipo de búsqueda que se desea establecer.
   */
  public setTipoBusqueda(tipoBusqueda: string): void {
    this.update((state) => ({
      ...state,
      tipoBusqueda,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
