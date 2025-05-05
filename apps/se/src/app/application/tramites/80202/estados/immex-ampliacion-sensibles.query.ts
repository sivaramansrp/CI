import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ImmexAmpliacionSensiblesState } from './immex-ampliacion-sensibles.store';
import { ImmexAmpliacionSensiblesStore } from './immex-ampliacion-sensibles.store';

@Injectable({ providedIn: 'root' })
export class ImmexAmpliacionSensiblesQuery extends Query<ImmexAmpliacionSensiblesState> {
  /**
   * Observable que selecciona el estado completo de la solicitud.
   * 
   * @returns El estado actual de la solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase que inicializa el store específico para 
   * manejar el estado de "Immex Ampliación Sensibles".
   * 
   * @param store - Instancia del store `ImmexAmpliacionSensiblesStore` 
   *                que se utiliza para gestionar el estado.
   */
  constructor(protected override store: ImmexAmpliacionSensiblesStore) {
    super(store);
  }
}
