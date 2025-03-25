import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud150102State } from './solicitud150102.store';
import { Solicitud150102Store } from './solicitud150102.store';

@Injectable({ providedIn: 'root' })
export class Solicitud150102Query extends Query<Solicitud150102State> {
  seleccionarSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(protected solicitud150102Store: Solicitud150102Store) {
    super(solicitud150102Store);
  }
}
