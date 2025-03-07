import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Creacion del estado inicial para la interfaz de tramite 301
 * @returns Solicitud301
 */
export interface Solicitud301State {
  /**
   * Linea
   * @type {string}
   */
  Linea: string;

  /**
   * Linea checkbox
   * @type {string}
   */
  Lineacheckbox: string;

  /**
   * Nombre quimico
   * @type {string}
   */
  nombreQuimico: string;

  /**
   * Nombre comercial
   * @type {string}
   */
  nombreComercial: string;

  /**
   * Numero CAS
   * @type {string}
   */
  numeroCAS: string;

  /**
   * Acondicionamiento
   * @type {string}
   */
  acondicionamiento: string;

  /**
   * Estado fisico
   * @type {string}
   */
  estadoFisico: string;

  /**
   * Fraccion arancelaria
   * @type {string}
   */
  fraccionArancelaria: string;

  /**
   * Descripcion fraccion
   * @type {string}
   */
  descripcionFraccion: string;

  /**
   * Nico
   * @type {string}
   */
  nico: string;

  /**
   * Descripcion nico
   * @type {string}
   */
  descripcionNico: string;

  /**
   * Mercancia
   * @type {string}
   */
  mercancia: string;

  /**
   * Folio
   * @type {string}
   */
  folio: string;

  /**
   * Registro
   * @type {string}
   */
  registro: string;
}

export function createInitialState(): Solicitud301State {
  return {
    /**
     * Linea
     * @type {string}
     */
    Linea: '',

    /**
     * Linea checkbox
     * @type {string}
     * */
    Lineacheckbox: '',

    /**
     * Nombre quimico
     * @type {string}
     */
    nombreQuimico: '',

    /**
     * Nombre comercial
     * @type {string}
     */
    nombreComercial: '',

    /**
     * Numero CAS
     * @type {string}
     */
    numeroCAS: '',

    /**
     * Acondicionamiento
     * @type {string}
     */
    acondicionamiento: '',

    /**
     * Estado fisico
     * @type {string}
     */
    estadoFisico: '',

    /**
     * Fraccion arancelaria
     * @type {string}
     */
    fraccionArancelaria: '',

    /**
     * Descripcion fraccion
     * @type {string}
     */
    descripcionFraccion: '',

    /**
     * Nico
     * @type {string}
     */
    nico: '',

    /**
     * Descripcion nico
     * @type {string}
     * */
    descripcionNico: '',

    /**
     * Mercancia
     * @type {string}
     */
    mercancia: '',

    /**
     * Folio
     * @type {string}
     */
    folio: '',

    /**
     * Registro
     * @type {string}
     */
    registro: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite301', resettable: true })
export class Tramite301Store extends Store<Solicitud301State> {
  /**
   * Crea una instancia de Tramite301Store.
   * @constructor
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Guarda la línea en el estado.
   * @param Linea
   */
  public setLinea(Linea: string) {
    this.update((state) => ({
      ...state,
      Linea,
    }));
  }

  /**
   * Guarda el tipo de solicitud en el estado.
   * @param Lineacheckbox
   */
  public setLineaCheckbox(Lineacheckbox: string) {
    this.update((state) => ({
      ...state,
      Lineacheckbox,
    }));
  }

  /**
   * Guarda el nombre químico en el estado.
   * @param nombreQuimico
   */
  public setNombreQuimico(nombreQuimico: string) {
    this.update((state) => ({
      ...state,
      nombreQuimico,
    }));
  }

  /**
   * Guarda el nombre comercial en el estado.
   * @param nombreComercial
   */
  public setNombreComercial(nombreComercial: string) {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }

  /**
   * Guarda el número CAS en el estado.
   * @param numeroCAS
   */
  public setNumeroCAS(numeroCAS: string) {
    this.update((state) => ({
      ...state,
      numeroCAS,
    }));
  }

  /**
   * Guarda el acondicionamiento en el estado.
   * @param acondicionamiento
   */
  public setAcondicionamiento(acondicionamiento: string) {
    this.update((state) => ({
      ...state,
      acondicionamiento,
    }));
  }

  /**
   * Guarda el estado físico en el estado.
   * @param estadoFisico
   */
  public setEstadoFisico(estadoFisico: string) {
    this.update((state) => ({
      ...state,
      estadoFisico,
    }));
  }

  /**
   * Guarda la fracción arancelaria en el estado.
   * @param fraccionArancelaria
   */
  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Guarda la descripción de la fracción arancelaria en el estado.
   * @param descripcionFraccion
   */
  public setNico(nico: string) {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  /**
   * Guarda el nico en el estado.
   * @param nico
   */
  public setMercancia(mercancia: string) {
    this.update((state) => ({
      ...state,
      mercancia,
    }));
  }

  /**
   * Guarda la descripción del nico en el estado.
   * @param descripcionNico
   */
  public setFolio(folio: string) {
    this.update((state) => ({
      ...state,
      folio,
    }));
  }

  /**
   * Guarda el folio en el estado.
   * @param folio
   */
  public setRegistro(registro: string) {
    this.update((state) => ({
      ...state,
      registro,
    }));
  }

  /**
   * Guarda el registro en el estado.
   * @param registro
   */
  public setDescripcionFraccion(descripcionFraccion: string) {
    this.update((state) => ({
      ...state,
      descripcionFraccion,
    }));
  }

  /**
   * Guarda la descripción de la fracción arancelaria en el estado.
   * @param descripcion
   */
  public setDescripcionNico(descripcionNico: string) {
    this.update((state) => ({
      ...state,
      descripcionNico,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
