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
  * Clave de referencia asociada al trámite.
    */
  claveDeReferencia: string;

  /**
   * Cadena de pago proporcionada por la dependencia.
   */
  cadenaPagoDependencia: string;

  /**
   * Importe del pago realizado.
   */
  impPago: number;

  /**
   * Fecha en la que se realizó el pago.
   */
  fecPago: string;

  /**
   * Banco donde se efectuó el pago.
   */
  banco: string;

  /**
   * Llave única asociada al pago.
   */
  llaveDePago: string;
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
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    llaveDePago: '',
    fecPago: '',
    banco: '',
    impPago: 0,
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
   * @método
   * @nombre establecerDatos
   * @descripción
   * Actualiza el estado con los valores proporcionados.
   * 
   * @param {Partial<Tramites30401State>} datos - Valores parciales para actualizar el estado.
   */
  public establecerDatos(datos: Partial<Solicitud230901State>): void {    
    this.update((state) => ({
      ...state,
      ...datos,
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