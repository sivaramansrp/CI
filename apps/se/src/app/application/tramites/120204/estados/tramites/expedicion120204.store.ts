import { Store, StoreConfig } from '@datorama/akita';
  
import { Injectable } from '@angular/core';

/**
 * Representa el estado de la expedición 120204.
 */
export interface Expedicion120204State {
  /**
   * Entidad federativa seleccionada.
   * Puede ser un catálogo o `null` si no se ha seleccionado ninguna.
   */
  entidadFederativa: string;

  /**
   * Representación federal seleccionada.
   * Puede ser un catálogo o `null` si no se ha seleccionado ninguna.
   */
  representacionFederal: string;

  /**
   * Monto a expedir en formato de cadena.
   */
  montoAExpedir: string;

  /**
   * Indicador booleano que verifica si el monto a expedir ha sido validado o chequeado.
   */
  montoAExpedirCheck: boolean;

  /**
   * Total a expedir en formato de cadena.
   */
  totalAExpedir: string;

  montoDisponible: string;

   numeraDelicitacion: string;
   fechaDelEventoDelicitacion: string;
    descripcionDelProducto: string;

}




/**
 * Crea el estado inicial para la funcionalidad de expedición 120204.
 * 
 * @returns {Expedicion120204State} El estado inicial con los valores predeterminados:
 * - `entidadFederativa`: Valor inicial `null`, representa la entidad federativa.
 * - `representacionFederal`: Valor inicial `null`, representa la representación federal.
 * - `montoAExpedir`: Cadena vacía, representa el monto a expedir.
 * - `montoAExpedirCheck`: Valor inicial `false`, indica si el monto a expedir ha sido verificado.
 * - `totalAExpedir`: Cadena vacía, representa el total a expedir.
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

  public setMontoDisponsible(montoDisponible: string): void {
    this.update((state) => ({
      ...state,
      montoDisponible,
    }));
  }
  public setFechaDelEventoDelicitacion(fechaDelEventoDelicitacion: string): void {
    this.update((state) => ({
      ...state,
      fechaDelEventoDelicitacion,
    }));
  }
  public setDescripcionDelProducto(descripcionDelProducto: string): void {
    this.update((state) => ({
      ...state,
      descripcionDelProducto,
    }));
  }

  public setNumeraDelicitacion(numeraDelicitacion: string): void {
    this.update((state) => ({
      ...state,
      numeraDelicitacion,
    }));
  }
  public resetState(): void {
    this.update(createInitialState());
  }
}
