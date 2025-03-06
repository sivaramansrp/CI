import { Injectable } from '@angular/core';
import { PagoLineaDeCaptureStore } from './pago-linea-de-captura.store';
import { Query } from '@datorama/akita';
import { TableData } from '@libs/shared/data-access-user/src';

/**
 * Proporciona una consulta (`Query`) para acceder al estado de los pagos de línea de captura.
 * Permite seleccionar y suscribirse a los cambios en el estado de los pagos almacenados en Akita.
 */
@Injectable({
  providedIn: 'root',
})
export class PagoLineaDeCaptureQuery extends Query<TableData> {
  /**
   * Constructor de la consulta para la tienda de pagos de línea de captura.
   * 
   * @param {PagoLineaDeCaptureStore} pagoLineaDeCaptureStore - Instancia del store de pagos.
   */
  constructor(protected pagoLineaDeCaptureStore: PagoLineaDeCaptureStore) {
    super(pagoLineaDeCaptureStore);
  }

  /**
   * Observable que proporciona el estado actual de los pagos de tarifas en la tienda.
   * 
   * @example
   * this.pagoLineaDeCaptureQuery.obtenerPagoDeTarifas$.subscribe((data) => {
   *   console.log(data);
   * });
   * // Se suscribe a los cambios en el estado y obtiene la información actualizada.
   */
  obtenerPagoDeTarifas$ = this.select((state) => state);
}
