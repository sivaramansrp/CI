import {
  Chofer40101Store,
  Choferesnacionales40101State,
} from './chofer40101.store';
import { Chofer } from '../models/registro-muestras-mercancias.model';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Chofer40101Query extends Query<Choferesnacionales40101State> {
  constructor(protected override store: Chofer40101Store) {
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


   /**
    * Obtiene la lista de pago de derechos.
    * @returns La lista de pago de derechos.
    */
  
}