import { Store, StoreConfig } from '@datorama/akita';
import { ConfiguracionItem } from '../../enum/mercancia-table-constants';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado de la solicitud "Trámite 230901".
 */
export interface Solicitud230901State {
  tipoDeMovimiento: string;
  tipoDeRegimen: string;
  mercanciaTablaDatos: ConfiguracionItem[];
  entidadFederativa: string;
  claveDeReferencia: string;
  cadenaDeLaDependencia: string;
  bancoseleccionado: string;
  llaveDePago: string;
  fechaDePago: string;
  importeDePago: Date | null;
}

/**
 * @description
 * Función que crea el estado inicial de la solicitud "Trámite 230901".
 * Se utiliza para inicializar el estado del almacén.
 *
 * @returns {Solicitud230901State} El estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud230901State {
  return {
    tipoDeMovimiento: '',
    tipoDeRegimen: '',
    entidadFederativa: '',
    mercanciaTablaDatos: [],
    claveDeReferencia: '',
    cadenaDeLaDependencia: '',
    bancoseleccionado: '',
    llaveDePago: '',
    fechaDePago: '',
    importeDePago: null,
  };
}

/**
 * @description
 * Clase que representa el almacén (store) para gestionar el estado del "Trámite 230901".
 * Utiliza Akita para proporcionar un manejo reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite230901', resettable: true })
export class Tramite230901Store extends Store<Solicitud230901State> {
  /**
   * @description
   * Constructor que inicializa el almacén con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @description
   * Actualiza el estado con el tipo de movimiento seleccionado.
   *
   * @param {string} tipoDeMovimiento - El tipo de movimiento seleccionado.
   */
  public setTipoDeMovimiento(tipoDeMovimiento: string): void {
    this.update((state) => ({
      ...state,
      tipoDeMovimiento,
    }));
  }

  /**
   * @description
   * Actualiza el estado con el tipo de régimen seleccionado.
   *
   * @param {string} tipoDeRegimen - El tipo de régimen seleccionado.
   */
  public setTipoDeRegimen(tipoDeRegimen: string): void {
    this.update((state) => ({
      ...state,
      tipoDeRegimen,
    }));
  }

  /**
   * @description
   * Actualiza el estado con la entidad federativa seleccionada.
   *
   * @param {string} entidadFederativa - La entidad federativa seleccionada.
   */
  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  /**
   * @description
   * Actualiza el estado con la clave de referencia proporcionada.
   *
   * @param {string} caveDeReferencia - La clave de referencia.
   */
  public setlCaveDeReferencia(caveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      caveDeReferencia,
    }));
  }

  /**
   * @description
   * Actualiza el estado con la cadena de la dependencia proporcionada.
   *
   * @param {string} cadenaDeLaDependencia - La cadena de la dependencia.
   */
  public setCadenaDeLaDependencia(cadenaDeLaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDeLaDependencia,
    }));
  }

  /**
   * @description
   * Actualiza el estado con el banco seleccionado.
   *
   * @param {string} bancoseleccionado - El banco seleccionado.
   */
  public setbancoseleccionado(bancoseleccionado: string): void {
    this.update((state) => ({
      ...state,
      bancoseleccionado,
    }));
  }

  /**
   * @description
   * Actualiza el estado con la llave de pago proporcionada.
   *
   * @param {string} llaveDePago - La llave de pago.
   */
  public setLlaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * @description
   * Actualiza el estado con la fecha de pago proporcionada.
   *
   * @param {string} fechaDePago - La fecha de pago.
   */
  public setFechaDePago(fechaDePago: string): void {
    this.update((state) => ({
      ...state,
      fechaDePago,
    }));
  }

  /**
   * @description
   * Actualiza el estado con el importe de pago proporcionado.
   *
   * @param {Date} importeDePago - El importe de pago.
   */
  public setImporteDePago(importeDePago: Date): void {
    this.update((state) => ({
      ...state,
      importeDePago,
    }));
  }

  /**
   * @description
   * Actualiza el estado con los datos de la tabla de mercancía proporcionados.
   *
   * @param {ConfiguracionItem[]} mercanciaTablaDatos - Los datos de la tabla de mercancía.
   */
  public setMercanciaTablaDatos(mercanciaTablaDatos: ConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTablaDatos,
    }));
  }
}