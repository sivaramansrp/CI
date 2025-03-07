import { DatosAdicionalesState } from '../tramites/datos-adicionales110101.store';
import { DatosAdicionalesStore } from '../tramites/datos-adicionales110101.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DatosAdicionalesQuery extends Query<DatosAdicionalesState> {
  constructor(protected override store: DatosAdicionalesStore) {
    super(store);
  }

  /**
   * **Observable para obtener los valores del formulario desde el estado**
   *
   * - Permite suscribirse a los valores almacenados en el estado.
   * - Se actualiza automáticamente cuando cambian los datos en el store.
   * - Retorna un objeto `DatosAdicionalesForm` o `null` si no hay datos almacenados.
   *
   * @returns {Observable<DatosAdicionalesState['formValues']>}
   */
  get formValues$(): Observable<DatosAdicionalesState['formValues']> {
    return this.select(state => state.formValues);
  }

}
