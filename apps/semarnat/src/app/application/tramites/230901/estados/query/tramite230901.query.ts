import { Solicitud230901State, Tramite230901Store } from '../store/tramite230901.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite230901Query extends Query<Solicitud230901State> {

  /**
   * @descripcion
   * Observable que emite el estado actual de la "Solicitud 230901".
   * Se puede usar para suscribirse a los cambios en el estado.
   *
   * @returns {Observable<Solicitud230901State>} El estado actual de la solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });


  constructor(
    protected override store: Tramite230901Store) {
    super(store);
  }
}