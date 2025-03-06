import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Creacion del estado inicial para la interfaz de tramite 301
 * @returns Solicitud301
 */
export interface Solicitud301State {
  Linea: string;
  Lineacheckbox: string;
  nombreQuimico: string;
  nombreComercial: string;
  numeroCAS: string;
  acondicionamiento: string;
  estadoFisico: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  nico: string;
  descripcionNico: string;
  mercancia: string;
  folio: string;
  registro: string;
}

export function createInitialState(): Solicitud301State {
  return {
    Linea: '',
    Lineacheckbox: '',
    nombreQuimico: '',
    nombreComercial: '',
    numeroCAS: '',
    acondicionamiento: '',
    estadoFisico: '',
    fraccionArancelaria: '',
    descripcionFraccion: '',
    nico: '',
    descripcionNico: '',
    mercancia: '',
    folio: '',
    registro: 'Si',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite301', resettable: true })
export class Tramite301Store extends Store<Solicitud301State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Guarda el tipo de solicitud en el estado.
   *
   * @param tipoSolicitud - El tipo de solicitud que se va a guardar.
   */

  public setLinea(Linea: string) {
    this.update((state) => ({
      ...state,
      Linea,
    }));
  }

  public setLineaCheckbox(Lineacheckbox: string) {
    this.update((state) => ({
      ...state,
      Lineacheckbox,
    }));
  }

  public setNombreQuimico(nombreQuimico: string) {
    this.update((state) => ({
      ...state,
      nombreQuimico,
    }));
  }

  public setNombreComercial(nombreComercial: string) {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }

  public setNumeroCAS(numeroCAS: string) {
    this.update((state) => ({
      ...state,
      numeroCAS,
    }));
  }

  public setAcondicionamiento(acondicionamiento: string) {
    this.update((state) => ({
      ...state,
      acondicionamiento,
    }));
  }

  public setEstadoFisico(estadoFisico: string) {
    this.update((state) => ({
      ...state,
      estadoFisico,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setNico(nico: string) {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  public setMercancia(mercancia: string) {
    this.update((state) => ({
      ...state,
      mercancia,
    }));
  }

  public setFolio(folio: string) {
    this.update((state) => ({
      ...state,
      folio,
    }));
  }

  public setRegistro(registro: string) {
    this.update((state) => ({
      ...state,
      registro,
    }));
  }

  public setDescripcionFraccion(descripcionFraccion: string) {
    this.update((state) => ({
      ...state,
      descripcionFraccion,
    }));
  }

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
