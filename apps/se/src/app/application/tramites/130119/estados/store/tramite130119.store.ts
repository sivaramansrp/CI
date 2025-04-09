// File: tramite130119.store.ts
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado del trámite 130119.
 */
export interface Tramite130119State {
  regimen: string;
  clasificacionDeRegimen: string;
  descripcion: string;
  fraccionArancelaria: string;
  umt: string;
  cantidad: string;
  valorFacturaUSD: string;
  paisOrigen: string;
  paisExportador: string;
  numeroFactura: string;
  fechaExpedicionFactura: string;
  observaciones: string;
  estado: string,
  representacionFederal: string
}

/**
 * Función que crea el estado inicial del trámite 130119.
 * @returns {Tramite130119State} - El estado inicial del trámite 130119.
 */
export function createInitialState(): Tramite130119State {
  return {
    regimen: '',
    clasificacionDeRegimen: '',
    descripcion: '',
    fraccionArancelaria: '',
    umt: '',
    cantidad: '',
    valorFacturaUSD: '',
    paisOrigen: '',
    paisExportador: '',
    numeroFactura: '',
    fechaExpedicionFactura: '',
    observaciones: '',
    estado: '',
    representacionFederal: ''
  };
}
/**
 * Clase que representa el store del trámite 130119.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite130119', resettable: true })
export class Tramite130119Store extends Store<Tramite130119State> {
  /**
   * Constructor del store.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el régimen en el estado.
   * @param {string} regimen - El régimen.
   */
  public setRegimen(regimen: string): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  /**
   * Establece la clasificación de régimen en el estado.
   * @param {string} clasificacionDeRegimen - La clasificación de régimen.
   */
  public setClasificacionDeRegimen(clasificacionDeRegimen: string): void {
    this.update((state) => ({
      ...state,
      clasificacionDeRegimen,
    }));
  }

  /**
   * Establece la descripción en el estado.
   * @param {string} descripcion - La descripción.
   */
  public setDescripcion(descripcion: string): void {
    this.update((state) => ({
      ...state,
      descripcion,
    }));
  }

  /**
   * Establece la fracción arancelaria en el estado.
   * @param {string} fraccionArancelaria - La fracción arancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Establece la unidad de medida en el estado.
   * @param {string} umt - La unidad de medida.
   */
  public setUmt(umt: string): void {
    this.update((state) => ({
      ...state,
      umt,
    }));
  }

  /**
   * Establece la cantidad en el estado.
   * @param {string} cantidad - La cantidad.
   */
  public setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }

  /**
   * Establece el valor de la factura en USD en el estado.
   * @param {string} valorFacturaUSD - El valor de la factura en USD.
   */
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }

  /**
   * Establece el país de origen en el estado.
   * @param {string} paisOrigen - El país de origen.
   */
  public setPaisOrigen(paisOrigen: string): void {
    this.update((state) => ({
      ...state,
      paisOrigen,
    }));
  }

  /**
   * Establece el país exportador en el estado.
   * @param {string} paisExportador - El país exportador.
   */
  public setPaisExportador(paisExportador: string): void {
    this.update((state) => ({
      ...state,
      paisExportador,
    }));
  }

  /**
   * Establece el número de factura en el estado.
   * @param {string} numeroFactura - El número de factura.
   */
  public setNumeroFactura(numeroFactura: string): void {
    this.update((state) => ({
      ...state,
      numeroFactura,
    }));
  }

  /**
   * Establece la fecha de expedición de la factura en el estado.
   * @param {string} fechaExpedicionFactura - La fecha de expedición de la factura.
   */
  public setFechaExpedicionFactura(fechaExpedicionFactura: string): void {
    this.update((state) => ({
      ...state,
      fechaExpedicionFactura,
    }));
  }

  /**
   * Establece las observaciones en el estado.
   * @param {string} observaciones - Las observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }
 /**
 * Establece el estado en el estado actual del objeto.
 * @param {string} estado - El nuevo estado que se va a asignar.
 */
public setEstado(estado: string): void {
  this.update((state) => ({
    ...state,
    estado
  }));
}

/**
 * Establece la representación federal en el estado actual del objeto.
 * @param {string} representacionFederal - La nueva representación federal que se va a asignar.
 */
public setRepresentacionFederal(representacionFederal: string): void {
  this.update((state) => ({
    ...state,
    representacionFederal
  }));
}
}