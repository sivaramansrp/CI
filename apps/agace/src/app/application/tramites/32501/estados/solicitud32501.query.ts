import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud32501Store } from './Solicitud32501.store';
import { Solicitud32501State } from './Solicitud32501.store';

@Injectable({ providedIn: 'root' })
export class Solicitud32501Query extends Query<Solicitud32501State> {

  selectSolicitud$ = this.select((state) => {
    return state;
  });


  constructor(
    protected override store: Solicitud32501Store) {
    super(store);
  }
}
