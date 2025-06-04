import { Store, StoreConfig } from '@datorama/akita';
  
import { Injectable } from '@angular/core';



/**
 * Interfaz que define la estructura del estado para el trámite de expedición 120204.
 *
 * @property {string} entidadFederativa - Nombre de la entidad federativa seleccionada.
 * @property {string} representacionFederal - Representación federal correspondiente.
 * @property {string} montoAExpedir - Monto que se va a expedir.
 * @property {boolean} montoAExpedirCheck - Indica si el monto a expedir ha sido verificado.
 * @property {string} totalAExpedir - Total a expedir.
 * @property {string} montoDisponible - Monto disponible para expedir.
 * @property {string} numeraDelicitacion - Número de la licitación.
 * @property {string} fechaDelEventoDelicitacion - Fecha del evento de licitación.
 * @property {string} descripcionDelProducto - Descripción del producto relacionado con la expedición.
 */
export interface Expedicion120204State {
  /** Nombre de la entidad federativa seleccionada */
  entidadFederativa: string;
  /** Representación federal correspondiente */
  representacionFederal: string;
  /** Monto que se va a expedir */
  montoAExpedir: string;
  /** Indica si el monto a expedir ha sido verificado */
  montoAExpedirCheck: boolean;
  /** Total a expedir */
  totalAExpedir: string;
  /** Monto disponible para expedir */
  montoDisponible: string;
  /** Número de la licitación */
  numeraDelicitacion: string;
  /** Fecha del evento de licitación */
  fechaDelEventoDelicitacion: string;
  /** Descripción del producto relacionado con la expedición */
  descripcionDelProducto: string;
}

/**
 * Crea y retorna el estado inicial para el trámite de expedición 120204.
 *
 * @returns {Expedicion120204State} Estado inicial con los valores predeterminados para cada propiedad.
 *
 * @property {string} entidadFederativa - Nombre de la entidad federativa.
 * @property {string} representacionFederal - Representación federal correspondiente.
 * @property {string} montoAExpedir - Monto que se va a expedir.
 * @property {boolean} montoAExpedirCheck - Indica si el monto a expedir ha sido verificado.
 * @property {string} totalAExpedir - Total a expedir.
 * @property {string} montoDisponible - Monto disponible para expedir.
 * @property {string} numeraDelicitacion - Número de la licitación.
 * @property {string} fechaDelEventoDelicitacion - Fecha del evento de licitación.
 * @property {string} descripcionDelProducto - Descripción del producto relacionado con la expedición.
 */
export function createInitialState(): Expedicion120204State {
  return{
      entidadFederativa:'',
      representacionFederal:'',
      montoAExpedir: '',
      montoAExpedirCheck:false,
      totalAExpedir: '',
      montoDisponible: '',
      numeraDelicitacion: '',
      fechaDelEventoDelicitacion: '',
      descripcionDelProducto: ''
  }
}


/**
 * Clase `Expedicion120204Store` que extiende de `Store` y administra el estado relacionado con la expedición.
 * 
 * @extends {Store<Expedicion120204State>}
 * 
 * @description
 * Esta clase proporciona métodos para actualizar diferentes propiedades del estado, como la entidad federativa,
 * la representación federal, el monto a expedir, el chequeo del monto a expedir y el total a expedir.
 * 
 * @example
 * ```typescript
 * const store = new Expedicion120204Store();
 * store.setEntidadFederativa(entidad);
 * store.setMontoExpedir('1000');
 * ```
 */
@Injectable({
  providedIn: 'root',
})

@StoreConfig({ name: 'expedicion', resettable: true })
export class Expedicion120204Store extends Store<Expedicion120204State> {
  /**
   * Constructor de la clase `Expedicion120204Store`.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la entidad federativa en el estado.
   * 
   * @param entidadFederativa - Objeto de tipo `Catalogo` que representa la entidad federativa a establecer.
   */
  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  /**
   * Actualiza la representación federal en el estado.
   * 
   * @param representacionFederal - Objeto de tipo `Catalogo` que representa la representación federal a establecer.
   */
  public setRepresentacionFederal(representacionFederal: string): void {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }

  /**
   * Establece el monto a expedir en el estado.
   * 
   * @param montoAExpedir - Cadena que representa el monto a expedir.
   */
  public setMontoExpedir(montoAExpedir: string): void {
    this.update((state) => ({
      ...state,
      montoAExpedir,
    }));
  }

  /**
   * Establece el estado del chequeo del monto a expedir.
   * 
   * @param montoAExpedirCheck - Valor booleano que indica si el monto a expedir está chequeado.
   */
  public setMontoExpedirCheck(montoAExpedirCheck: boolean): void {
    this.update((state) => ({
      ...state,
      montoAExpedirCheck,
    }));
  }

  /**
   * Establece el total a expedir en el estado.
   * 
   * @param totalAExpedir - Cadena que representa el total a expedir.
   */
  public setTotalExpedir(totalAExpedir: string): void {
    this.update((state) => ({
      ...state,
      totalAExpedir,
    }));
  }

  /**
   * Establece el valor de `montoDisponible` en el estado.
   *
   * @param montoDisponible - El nuevo monto disponible que se asignará al estado.
   */
  public setMontoDisponsible(montoDisponible: string): void {
    this.update((state) => ({
      ...state,
      montoDisponible,
    }));
  }


  /**
   * Establece la fecha del evento de licitación en el estado.
   *
   * @param fechaDelEventoDelicitacion - La fecha del evento de licitación a establecer, en formato de cadena.
   */
  public setFechaDelEventoDelicitacion(fechaDelEventoDelicitacion: string): void {
    this.update((state) => ({
      ...state,
      fechaDelEventoDelicitacion,
    }));
  }

  /**
   * Establece la descripción del producto en el estado.
   *
   * @param descripcionDelProducto - La descripción del producto a establecer, en formato de cadena.
   */
  public setDescripcionDelProducto(descripcionDelProducto: string): void {
    this.update((state) => ({
      ...state,
      descripcionDelProducto,
    }));
  }

  /**
   * Establece el número de la licitación en el estado.
   *
   * @param numeraDelicitacion - El número de la licitación a establecer, en formato de cadena.
   */
  public setNumeraDelicitacion(numeraDelicitacion: string): void {
    this.update((state) => ({
      ...state,
      numeraDelicitacion,
    }));
  }

  
  /**
   * Restablece el estado de la tienda al valor inicial.
   *
   * Esta función actualiza el estado utilizando el estado inicial generado por `createInitialState()`.
   * Úsala cuando necesites reiniciar todos los valores de la tienda a su configuración predeterminada.
   */
  public resetState(): void {
    this.update(createInitialState());
  }
}
