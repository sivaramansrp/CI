import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from './tramites260101.store';

@Injectable({ providedIn: 'root' })
export class Solicitud260101Query extends Query<Solicitud260101State> {
  constructor(protected solicitud260101Store: Solicitud260101Store) {
    super(solicitud260101Store);
  }

  seleccionarSolicitud$ = this.select((state) => {
    return state;
  });
}
