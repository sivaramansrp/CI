import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';
import { TratadosState } from '../tramites/tratados110101.store';
import { TratadosStore } from '../tramites/tratados110101.store';

/**
 * **Akita query para seleccionar tratados**
 */
@Injectable({ providedIn: 'root' })
export class TratadosQuery extends Query<TratadosState> {
  constructor(protected override store: TratadosStore) {
    super(store);
  }

  /**
 * **Observable para seleccionar la lista de tratados del estado**
 * 
 * Este observable se suscribe a los cambios en la propiedad `tratados` del estado
 * y emite la lista actualizada cada vez que hay una modificación en el store.
 */
  selectTratados$: Observable<TratadosState['tratados']> = this.select((state) => state.tratados);
}
