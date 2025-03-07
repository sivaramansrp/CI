import { DatosDeLaState } from '../tramites/datos-de-la110101.store';
import { DatosDeLaStore } from '../tramites/datos-de-la110101.store';
import { FormMercancia } from '../tramites/datos-de-la110101.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DatosDeLaQuery extends Query<DatosDeLaState> {
  /**
   * **Constructor del servicio de consultas (Query) para DatosDeLa**
   *
   * - Inyecta la tienda `DatosDeLaStore` y la pasa al constructor de la clase base.
   * - Permite acceder y suscribirse a los cambios en el estado de los datos de la mercancía.
   *
   * @param store - Instancia de `DatosDeLaStore` que gestiona el estado de los datos de la mercancía.
   */
  constructor(protected override store: DatosDeLaStore) {
    super(store);
  }


  /**
   * **Obtiene un observable de los valores del formulario**
   * 
   * Este getter devuelve un `Observable` que emite los valores actuales del formulario almacenados en el estado.
   * Permite suscribirse a los cambios en los valores del formulario en tiempo real.
   * 
   * @returns {Observable<FormMercancia | null>} Observable con los valores del formulario o `null` si no hay datos.
   */
  get formValues$(): Observable<FormMercancia | null> {
    return this.select(state => state.formValues);
  }

}
