
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud230902State, Tramite230902Store } from './tramite230902.store';

@Injectable({ providedIn: 'root' })
export class Tramite230902Query extends Query<Solicitud230902State> {

  selectSolicitud$ = this.select((state) => {
    return state;
  });
 
  selectIsPopupOpen$ = this.select((state) => state.isPopupOpen);
  selectIsPopupClose$ = this.select((state) => state.isPopupClose);

  constructor(
    protected override store: Tramite230902Store) {
    super(store);
  }
}