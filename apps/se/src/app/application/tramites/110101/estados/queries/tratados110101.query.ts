import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';
import { TratadosState } from '../tramites/tratados110101.store';
import { TratadosStore} from '../tramites/tratados110101.store';

/**
 * **Akita query para seleccionar tratados**
 */
@Injectable({ providedIn: 'root' })
export class TratadosQuery extends Query<TratadosState> {
  constructor(protected override store: TratadosStore) {
    super(store);
  }

  selectTratados$: Observable<TratadosState['tratados']> = this.select((state) => state.tratados);
}
