import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud6101State } from './solicitud6101.store';
import { Solicitud6101Store } from './solicitud6101.store';


@Injectable({ providedIn: 'root' })
export class Solicitud6101Query extends Query<Solicitud6101State> {

  seleccionarSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(
    protected override store: Solicitud6101Store) {
    super(store);
  }
}