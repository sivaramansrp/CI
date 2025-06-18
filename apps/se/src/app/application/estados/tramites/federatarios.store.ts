import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interface que representa el estado de la solicitud para el trámite 90201.
 * Este estado contiene la información relacionada con los datos de la solicitud.
 * @interface FederatoriosState
 */
export interface FederatoriosState {
 [key: string]: unknown;
 estadoDos: string;
  representacionFederal: string;
  actividadProductiva: string;
  
}

/**
 * Función para crear el estado inicial de la solicitud.
 * @returns {FederatoriosState} El estado inicial con valores vacíos para cada propiedad.
 */
export function createInitialState(): FederatoriosState {
    return {
          estadoDos: '',
    representacionFederal: '',
    actividadProductiva: '',
    };
}

/**
 * Store para la gestión del estado de la solicitud del trámite 221602.
 * Utiliza Akita para la gestión de estado y permite actualizar los valores relacionados con el trámite.
 * @class Tramite221602Store
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Federatorios', resettable: true })
export class FederatoriosStore extends Store<FederatoriosState> {
  /**
   * Constructor del store que inicializa el estado con el estado inicial creado.
   */
  constructor() {
    super(createInitialState());
  }
  /**
   * Set a value dynamically in the store by field name.
   * @param fieldName The name of the field to update.
   * @param value The value to set.
   */
  public setDynamicFieldValue(fieldName: string, value: unknown): void {
    this.update((state) => ({
      ...state,
      [fieldName]: value,
    }));
  }
  public setEstadoDos(estadoDos: string): void {
  this.update((state) => ({
    ...state,
    estadoDos,
  }));
}

public setRepresentacionFederal(representacionFederal: string): void {
  this.update((state) => ({
    ...state,
    representacionFederal,
  }));
}
public setActividadProductiva(actividadProductiva: string): void {
  this.update((state) => ({
    ...state,
    actividadProductiva,
  }));
}

}
