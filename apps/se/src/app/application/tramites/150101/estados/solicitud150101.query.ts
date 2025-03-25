import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud150101State } from './solicitud150101.store';
import { Solicitud150101Store } from './solicitud150101.store';

@Injectable({ providedIn: 'root' })
export class Solicitud150101Query extends Query<Solicitud150101State> {
  seleccionarSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(protected solicitud150101Store: Solicitud150101Store) {
    super(solicitud150101Store);
  }
}
