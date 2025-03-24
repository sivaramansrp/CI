import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 11204
 * @returns Solicitud11204
 */

export interface Solicitud11204State {
  menúDesplegable: string;
  rfc: string;
  denominacion: string;
  datosDelContenedor: [];
  tipoBusqueda: string;
  aduana: string;
  fechaIngreso: string;
  Vigencia: string;
  inicialesContenedor: string;
  numeroContenedor: string;
  digitoDeControl: string;
  contenedores: string;
  aduanaMenúDesplegable: string;
  fechaDeIngreso: string;
  archivoSeleccionado: string;

}

export function createInitialState(): Solicitud11204State {
  return {
    menúDesplegable: '',
    rfc: 'AAL0409235E6',
    denominacion: 'AGRICOLA ALPE S DE RL DE CV',
    datosDelContenedor: [],
    tipoBusqueda: '',
    aduana: '',
    inicialesContenedor: '',
    numeroContenedor: '',
    digitoDeControl: '',
    contenedores: '',
    fechaIngreso: '',
    Vigencia:'',
    aduanaMenúDesplegable: '',
    fechaDeIngreso: '',
    archivoSeleccionado: ''
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite11204', resettable: true })
export class Tramite11204Store extends Store<Solicitud11204State> {
  constructor() {
    super(createInitialState());
  }

  public setAduanaMenúDesplegable(aduanaMenúDesplegable: string): void {
    this.update((state) => ({
      ...state,
      aduanaMenúDesplegable,
    }));
  }

  public setFechaDeIngreso(fechaDeIngreso: string): void {
    this.update((state) => ({
      ...state,
      fechaDeIngreso,
    }));
  }

  public setVigencia(Vigencia: string): void {
    this.update((state) => ({
      ...state,
      Vigencia,
    }));
  }

  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc
    }));
  }

  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion
    }));
  }

  public setDelContenedor(datosDelContenedor: []): void {
    this.update((state) => ({
      ...state,
      datosDelContenedor
    }));
  }

  public setTipoBusqueda(tipoBusqueda: string): void {
    this.update((state) => ({
      ...state,
      tipoBusqueda
    }));
  }

  public setAduana(aduana: string): void {
    this.update((state) => ({
      ...state,
      aduana
    }));
  }

  public setFechaIngreso(fechaIngreso: string): void {
    this.update((state) => ({
      ...state,
      fechaIngreso
    }));
  }

  public setInicialesContenedor(inicialesContenedor: string): void {
    this.update((state) => ({
      ...state,
      inicialesContenedor
    }));
  }

  public setNumeroContenedor(numeroContenedor: string): void {
    this.update((state) => ({
      ...state,
      numeroContenedor
    }));
  }

  public setDigitoDeControl(digitoDeControl: string): void {
    this.update((state) => ({
      ...state,
      digitoDeControl
    }));
  }

  public setContenedores(contenedores: string): void {
    this.update((state) => ({
      ...state,
      contenedores
    }));
  }

  public setArchivoSeleccionado(archivoSeleccionado: string): void {
    this.update((state) => ({
      ...state,
      archivoSeleccionado
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}