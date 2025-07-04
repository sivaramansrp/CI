import { Injectable } from '@angular/core';
 
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { FilaCupo } from '../model/seleccion-del-cupo-interfaces';

/**
 * Interfaz que define el estado inicial del trámite 260911.
 */
export interface Tramite120402State {
  /**
   * Entidad a la que se le solicita el trámite.
   */
  entidad: Catalogo | null;
  /**
   * Representación legal de la entidad.
   */
  representacion: Catalogo | null;
  /**
   * Régimen al que pertenece el trámite.
   */
  regimen: Catalogo | null;
  /**
   * Tratado internacional relacionado con el trámite.
   */
  tratado: Catalogo | null;
  /**
   * Producto asociado al trámite.
   */
  producto: Catalogo | null;
  /**
   * Subproducto asociado al trámite.
   */
  subproducto: Catalogo | null;
  /**
   * Cantidad solicitada para el trámite.
   */
  cantidadSolicitada: string;
  /**
   * Cupo seleccionado para el trámite.
   */
  cupoSeleccionado: unknown | null; 

  /**
   * Datos de la tabla de cupos.
   * Este campo puede ser nulo si no hay datos disponibles.
   */
  cupoTablaDatos: FilaCupo[] | null;
  /**
   * Estado del trámite 120402.
   * Este estado se utiliza para almacenar información relacionada con el trámite,
   * como la entidad, representación, régimen, tratado, producto, subproducto,
   * cantidad solicitada y cupo seleccionado.
   */
}

/**
 * Función que crea el estado inicial del trámite 120402.
 * @returns El estado inicial del trámite.
 */


export function createInitialState(): Tramite120402State {
  return {
    entidad: null,
    representacion: null,
    regimen: null,
    tratado: null,
    producto: null,
    subproducto: null,
    cantidadSolicitada: '',
    cupoSeleccionado: null,
    cupoTablaDatos: [],
  };
}

/**
 * Store para gestionar el estado del trámite 120402.
 * Esta store utiliza Akita para manejar el estado de la aplicación
 * relacionado con el trámite 120402.
 * @remarks
 * Esta store permite actualizar el estado del trámite 120402,
 * incluyendo la entidad, representación, régimen, tratado,
 * producto, subproducto, cantidad solicitada y cupo seleccionado.
 */

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120402', resettable: true })
export class Tramite120402Store extends Store<Tramite120402State> {
  /**
   * Crea una nueva instancia de Tramite120402Store con el estado inicial.    
   * @remarks
   * Esta clase extiende de Store de Akita y define el estado
   * para el trámite 120402.
   * Permite gestionar el estado de la aplicación relacionado con
   * el trámite 120402, incluyendo la entidad, representación,
   * régimen, tratado, producto, subproducto, cantidad solicitada
   * y cupo seleccionado.
   * @constructor
   * @returns Una nueva instancia de Tramite120402Store con el estado inicial.
   * */

  constructor() {
    super(createInitialState());
  }

    /**
   * Actualiza el estado del trámite 630303 con los valores proporcionados.
   * 
   * @param valores - Valores parciales para actualizar el estado.
   */
    setTramite120402State(valores: Partial<Tramite120402State>): void {
    this.update((state => ({
      ...state,
      ...valores,
    })));
  }
    }

