import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaFraccionArancelaria } from '../models/immex-ampliacion-sensibles.model';
import { TablaFraccionDeImportacion } from '../models/immex-ampliacion-sensibles.model';

/**
 * Modelo de datos para los pasos del asistente de IMMEX
 * @export
 * @interface ImmexAmpliacionSensiblesState
 * @property {string} fraccionArancelariaSensibles - Fracción arancelaria sensibles
 * @property {string} fraccionArancelaria - Fracción arancelaria
 * @property {string} descripciondelproducto - Descripción del producto
 * @property {TablaFraccionArancelaria[]} tablaFraccionArancelaria - Tabla de fracción arancelaria
 * @property {TablaFraccionDeImportacion[]} tablaFraccionDeImportacion - Tabla de fracción de importación
 *
 */
export interface ImmexAmpliacionSensiblesState {
  fraccionArancelariaSensibles: string;
  fraccionArancelaria: string;
  descripciondelproducto: string;
  tablaFraccionArancelaria: TablaFraccionArancelaria[];
  tablaFraccionDeImportacion: TablaFraccionDeImportacion[];
}

export const GET_INITIAL_STATE = (): ImmexAmpliacionSensiblesState => {
  return {
    fraccionArancelariaSensibles: '',
    fraccionArancelaria: '',
    descripciondelproducto: '',
    tablaFraccionArancelaria: [],
    tablaFraccionDeImportacion: [],
  };
};

/**
 * Store para el estado de los datos del formulario de ampliación de sensibles IMMEX
 * @export
 * @class ImmexAmpliacionSensiblesStore
 * @extends {Store<ImmexAmpliacionSensiblesState>}
 * @method setFraccionArancelariaSensibles - Actualiza la fracción arancelaria sensibles
 * @method setFraccionArancelaria - Actualiza la fracción arancelaria
 * @method setDescripcionDelProducto - Actualiza la descripción del producto
 * @method setTablaFraccionArancelaria - Actualiza la tabla de fracción arancelaria
 * @method setTablaFraccionDeImportacion - Actualiza la tabla de fracción de importación
 * @constructor
 * @param {ImmexAmpliacionSensiblesState} GET_INITIAL_STATE - Estado inicial del store
 *
 *
 */

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'immex-ampliacion-sensibles', resettable: true })
export class ImmexAmpliacionSensiblesStore extends Store<ImmexAmpliacionSensiblesState> {
  constructor() {
    super(GET_INITIAL_STATE());
  }

  setFraccionArancelariaSensibles(fraccionArancelariaSensibles: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelariaSensibles,
    }));
  }
  setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }
  setDescripcionDelProducto(descripciondelproducto: string): void {
    this.update((state) => ({
      ...state,
      descripciondelproducto,
    }));
  }
  setTablaFraccionArancelaria(
    tablaFraccionArancelaria: TablaFraccionArancelaria[]
  ): void {
    this.update((state) => ({
      ...state,
      tablaFraccionArancelaria,
    }));
  }
  setTablaFraccionDeImportacion(
    tablaFraccionDeImportacion: TablaFraccionDeImportacion[]
  ): void {
    this.update((state) => ({
      ...state,
      tablaFraccionDeImportacion,
    }));
  }
}
