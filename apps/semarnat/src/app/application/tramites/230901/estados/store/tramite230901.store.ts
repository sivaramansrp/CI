import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { MercanciaConfiguracionItem } from '../../enum/mercancia-tabla.enum';


/**
 * Interfaz que define el estado de la solicitud "Trámite 230901".
 * Contiene las propiedades necesarias para gestionar el estado del trámite,
 * incluyendo información sobre el movimiento, régimen, mercancías, y datos de pago.
 */
export interface Solicitud230901State {
  /**
   * Tipo de movimiento seleccionado en el trámite.
   */
  tipoDeMovimiento: string;

  /**
   * Tipo de régimen seleccionado en el trámite.
   */
  tipoDeRegimen: string;

  /**
   * Datos de la tabla de mercancías asociadas al trámite.
   */
  mercanciaTablaDatos: MercanciaConfiguracionItem[];

  /**
   * Estado del popup de terceros (abierto o cerrado).
   */
  terecerosPopupState: boolean;

  /**
   * Entidad federativa seleccionada en el trámite.
   */
  entidadFederativa: string;

  /**
   * Banco seleccionado para el pago de derechos.
   */
  bancoseleccionado: string;

  /**
   * Llave de pago proporcionada para el trámite.
   */
  llaveDePago: string;

  /**
   * Fecha de pago registrada en el trámite.
   */
  fecPago: string;
}

/**
 * 
 * Función que crea el estado inicial de la solicitud "Trámite 230901".
 * Se utiliza para inicializar el estado del almacén.
 *
 * {Solicitud230901State} El estado inicial de la solicitud.
 */
export function createInitialState(): Solicitud230901State {
  return {
    tipoDeMovimiento: '',
    tipoDeRegimen: '',
    entidadFederativa: '',
    terecerosPopupState: false,
    mercanciaTablaDatos: [],
    bancoseleccionado: '',
    llaveDePago: '',
    fecPago: '',
  };
}

/**
 * 
 * Clase que representa el almacén (store) para gestionar el estado del "Trámite 230901".
 * Utiliza Akita para proporcionar un manejo reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite230901', resettable: true })
export class Tramite230901Store extends Store<Solicitud230901State> {

  /**
   * 
   * Constructor que inicializa el almacén con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * 
   * Actualiza el estado con el tipo de movimiento seleccionado.
   *
   * {string} tipoDeMovimiento - El tipo de movimiento seleccionado.
   */
  public setTipoDeMovimiento(tipoDeMovimiento: string): void {
    this.update((state) => ({
      ...state,
      tipoDeMovimiento,
    }));
  }

  /**
   *
   * Actualiza el estado con el tipo de régimen seleccionado.
   *
   * {string} tipoDeRegimen - El tipo de régimen seleccionado.
   */
  public setTipoDeRegimen(tipoDeRegimen: string): void {
    this.update((state) => ({
      ...state,
      tipoDeRegimen,
    }));
  }

  /**
   * 
   * Actualiza el estado con la entidad federativa seleccionada.
   *
   * {string} entidadFederativa - La entidad federativa seleccionada.
   */
  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  /**
   * 
   * Actualiza el estado con el estado del popup de terceros.
   *
   * {boolean} tercerosPopupState - El estado del popup de terceros.
   */

  public setTercerosPopupState(tercerosPopupState: boolean): void {
    this.update((state) => ({
      ...state,
      tercerosPopupState,
    }));
  }
  
  /**
   * 
   * Actualiza el estado con el banco seleccionado.
   *
   * {string} bancoseleccionado - El banco seleccionado.
   */
  public setbancoseleccionado(bancoseleccionado: string): void {
    this.update((state) => ({
      ...state,
      bancoseleccionado,
    }));
  }

  /**
   * 
   * Actualiza el estado con la llave de pago proporcionada.
   *
   * {string} llaveDePago - La llave de pago.
   */
  public setLlaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * 
   * Actualiza el estado con la fecha de pago proporcionada.
   *
   *  {string} fechaDePago - La fecha de pago.
   */
  public setfecPago(fecPago: string): void {
    this.update((state) => ({
      ...state,
      fecPago,
    }));
  }


  /**
   * 
   * Actualiza el estado con los datos de la tabla de mercancía proporcionados.
   *
   * {ConfiguracionItem[]} mercanciaTablaDatos - Los datos de la tabla de mercancía.
   */
  public setMercanciaTablaDatos(mercanciaTablaDatos: MercanciaConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTablaDatos,
    }));
  }
}