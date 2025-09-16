import {ImmexAmpliacionSensiblesStore, ImmexRegistroState } from './immex-ampliacion-sensibles.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';



@Injectable({ providedIn: 'root' })
export class ImmexAmpliacionSensiblesQuery extends Query<ImmexRegistroState> {
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
    /**
     * @propiedad selectImmexRegistro$
     * @tipo Observable<ImmexRegistroState>
     * @descripción Selector que permite obtener el estado completo de `ImmexRegistroState`.
     */
    selectImmexRegistro$ = this.select((state) => {
        return state;
    });

}
