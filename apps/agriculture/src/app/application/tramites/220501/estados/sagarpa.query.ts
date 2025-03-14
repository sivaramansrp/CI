import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SagarpaState } from '../models/sagarpa-state.models';
import { SagarpaStore } from './sagarpa.store';

@Injectable({
  providedIn: 'root',
})
export class SagarpaQuery extends Query<SagarpaState> {
  constructor(protected sagarpaStore: SagarpaStore) {
    super(sagarpaStore);
  }

  /** 
   * Observable que selecciona el estado actual del pago de derechos.
   */
  seleccionarPagoDeDerechos$ = this.select((state) => {
    return state.pagoDeDerechos;
  });

  /** 
   * Observable que selecciona el estado actual del medio de transporte.
   */
  seleccionarMedioTransporte$ = this.select((state) => {
    return state.medioTransporte;
  });

  /** 
   * Observable que selecciona los datos de la solicitud.
   */
  seleccionarDatosDelaSolicitud$ = this.select((state) => {
    return state.datosDelaSolicitud;
  });

  /** 
   * Observable que selecciona la información de movilización.
   */
  seleccionarMovilizacion$ = this.select((state) => {
    return state.movilizacion;
  });
}
