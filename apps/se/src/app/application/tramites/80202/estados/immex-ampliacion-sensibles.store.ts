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
   * Establece el valor de las fracciones arancelarias sensibles en el estado.
   *
   * @param fraccionArancelariaSensibles - Cadena que representa las fracciones arancelarias sensibles a actualizar.
   * 
   * Este método actualiza el estado con el nuevo valor proporcionado para las fracciones arancelarias sensibles.
   */
  setFraccionArancelariaSensibles(fraccionArancelariaSensibles: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelariaSensibles,
    }));
  }
  /**
   * Establece el valor de la fracción arancelaria en el estado de la tienda.
   *
   * @param fraccionArancelaria - La fracción arancelaria que se desea establecer.
   */
  setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }
  /**
   * Establece la descripción del producto en el estado de la tienda.
   *
   * @param descripciondelproducto - La nueva descripción del producto que se debe actualizar en el estado.
   */
  setDescripcionDelProducto(descripciondelproducto: string): void {
    this.update((state) => ({
      ...state,
      descripciondelproducto,
    }));
  }
  /**
   * Establece la tabla de fracciones arancelarias en el estado de la tienda.
   *
   * @param tablaFraccionArancelaria - Un arreglo de objetos de tipo `TablaFraccionArancelaria`
   * que representa las fracciones arancelarias a ser actualizadas en el estado.
   */
  setTablaFraccionArancelaria(
    tablaFraccionArancelaria: TablaFraccionArancelaria[]
  ): void {
    this.update((state) => ({
      ...state,
      tablaFraccionArancelaria,
    }));
  }
  /**
   * Establece la tabla de fracciones de importación en el estado de la tienda.
   *
   * @param tablaFraccionDeImportacion - Un arreglo de objetos de tipo `TablaFraccionDeImportacion`
   * que representa las fracciones de importación a ser actualizadas en el estado.
   * 
   * Este método actualiza el estado de la tienda con las nuevas fracciones de importación
   * proporcionadas.
   */
  setTablaFraccionDeImportacion(
    tablaFraccionDeImportacion: TablaFraccionDeImportacion[]
  ): void {
    this.update((state) => ({
      ...state,
      tablaFraccionDeImportacion,
    }));
  }
}
