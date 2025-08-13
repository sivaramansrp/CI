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

/**
 * Obtiene el estado inicial para la gestión de "Immex Ampliación Sensibles".
 * 
 * @returns {ImmexAmpliacionSensiblesState} El estado inicial que incluye:
 * - `fraccionArancelariaSensibles`: Cadena vacía para la fracción arancelaria sensible.
 * - `fraccionArancelaria`: Cadena vacía para la fracción arancelaria.
 * - `descripciondelproducto`: Cadena vacía para la descripción del producto.
 * - `tablaFraccionArancelaria`: Arreglo vacío para la tabla de fracciones arancelarias.
 * - `tablaFraccionDeImportacion`: Arreglo vacío para la tabla de fracciones de importación.
 */
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

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores a actualizar en el estado.
   */
  public actualizarEstado(valores: Partial<ImmexAmpliacionSensiblesState>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}
