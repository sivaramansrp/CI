import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';

import { Tramite230501State } from '../stores/tramite230501Store.store';
import { Tramite230501Store } from '../stores/tramite230501Store.store';

@Injectable({ providedIn: 'root' })
export class Tramite230501Query extends Query<Tramite230501State> {
  /**Guarda el estado completo del formulario de la solicitud */
  constructor(protected override store: Tramite230501Store) {
    super(store);
  }
  /**
   * Selecciona el estado completo de la solicitud
   */
  selectTramiteState$ = this.select((state) => {
    return state;
  });

  /**
  * Selecciona el estado completo de pago de derechos.
  * 
  * @returns El estado de pago de derechos.
  */
  seletPagoDerechosState$ = this.select((state) => {
    return state.pagoDerechosState
  });
}
