import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @interface
 * @name Tramite140104State
 * @description
 * Representa el estado de la solicitud Tramite140104. Contiene todos los campos necesarios para gestionar los datos del formulario.
 */
export interface Tramite140104State {
  /** @property {string} regimenAduanero - Régimen aduanero seleccionado */
  regimenAduanero: string;

  /** @property {string} mecanismoAsignacion - Mecanismo de asignación seleccionado */
  mecanismoAsignacion: string;

  /** @property {string} tratadoBloqueComercial - Tratado o bloque comercial seleccionado */
  tratadoBloqueComercial: string;

  /** @property {string} nombreProducto - Nombre del producto */
  nombreProducto: string;

  /** @property {string} nombreSubproducto - Nombre del subproducto */
  nombreSubproducto: string;

  /** @property {string} representacionFederal - Representación federal */
  representacionFederal: string;
}

/**
 * @function
 * @name createInitialState
 * @description
 * Crea el estado inicial para Tramite140104 con todos los campos inicializados como cadenas vacías.
 * 
 * @returns {Tramite140104State} Estado inicial del store
 */
export function createInitialState(): Tramite140104State {
  return {
    regimenAduanero: '',
    mecanismoAsignacion: '',
    tratadoBloqueComercial: '',
    nombreProducto: '',
    nombreSubproducto: '',
    representacionFederal: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite140104Store', resettable: true })
export class Tramite140104Store extends Store<Tramite140104State> {
  constructor() {
    super(createInitialState());
  }

  /** Setea el régimen aduanero */
  public setRegimenAduanero(value: string):void {
    this.update(state => ({ ...state, regimenAduanero: value }));
  }

  /** Setea el mecanismo de asignación */
  public setMecanismoAsignacion(value: string):void {
    this.update(state => ({ ...state, mecanismoAsignacion: value }));
  }

  /** Setea el tratado o bloque comercial */
  public setTratadoBloqueComercial(value: string):void {
    this.update(state => ({ ...state, tratadoBloqueComercial: value }));
  }

  /** Setea el nombre del producto */
  public setNombreProducto(value: string):void {
    this.update(state => ({ ...state, nombreProducto: value }));
  }

  /** Setea el nombre del subproducto */
  public setNombreSubproducto(value: string):void {
    this.update(state => ({ ...state, nombreSubproducto: value }));
  }

  /** Setea la representación federal */
  public setRepresentacionFederal(value: string):void {
    this.update(state => ({ ...state, representacionFederal: value }));
  }
}
