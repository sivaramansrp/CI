import {
  Chofer40102Store,
  Choferesnacionales40102State,
} from './chofer40102.store';
import { Chofer } from '../models/registro-muestras-mercancias.model';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Chofer40102Query extends Query<Choferesnacionales40102State> {
  constructor(protected override store: Chofer40102Store) {
    super(store);
  }

    /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Observable que selecciona el estado completo de la sección.
   */
  selectSeccionState$ = this.select((state) => {
    return state;
  });

   /**
   * Observable que selecciona la lista de pago de derechos.
   */
   getdatosDelChoferNacional$ = this.select((state) => state.datosDelChoferNacionalAlta);

}