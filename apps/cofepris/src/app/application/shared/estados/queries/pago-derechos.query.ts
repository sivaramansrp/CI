
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { pagoDerechosState, PagoDerechosStore } from '../stores/pago-de-derechos.store';

@Injectable({ providedIn: 'root' })
export class PagoDerechosQuery extends Query<pagoDerechosState> {
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: PagoDerechosStore) {
    super(store);
  }
}