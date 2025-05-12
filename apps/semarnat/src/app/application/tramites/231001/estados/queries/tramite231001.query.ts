/**
 * @description
 * This service provides queries for the `Tramite231001` state.
 * It extends the `Query` class from Akita to select specific parts of the state.
 * 
 * @example
 * // Usage example
 * constructor(private tramite231001Query: Tramite231001Query) {
 *   this.tramite231001Query.selectSolicitud$.subscribe(state => {
 *     console.log(state);
 *   });
 * }
 * 
 * @export
 * @class Tramite231001Query
 * @extends {Query<Solicitud231001State>}
 */
import { Solicitud231001State, Tramite231001Store } from '../tramites/tramite231001.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite231001Query extends Query<Solicitud231001State> {
  /**
   * Observable that emits the entire state.
   * @type {Observable<Solicitud231001State>}
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Observable that emits the `numeroProgramaImmex` property from the state.
   * @type {Observable<string>}
   */
  numeroProgramaImmex$ = this.select((state) => state.numeroProgramaImmex);

  /**
   * Observable that emits the `aduanas` property from the state.
   * @type {Observable<string>}
   */
  aduanas$ = this.select((state) => state.aduanas);

  /**
   * Observable that emits the `capituloFraccion` property from the state.
   * @type {Observable<string>}
   */
  capituloFraccion$ = this.select((state) => state.capituloFraccion);

  /**
   * Observable that emits the `unidadMedidaComercial` property from the state.
   * @type {Observable<string>}
   */
  unidadMedidaComercial$ = this.select((state) => state.unidadMedidaComercial);

  /**
   * Observable that emits the `partidaFraccion` property from the state.
   * @type {Observable<string>}
   */
  partidaFraccion$ = this.select((state) => state.partidaFraccion);

  /**
   * Observable that emits the `subPartidaFraccion` property from the state.
   * @type {Observable<string>}
   */
  subPartidaFraccion$ = this.select((state) => state.subPartidaFraccion);

  /**
   * Observable that emits the `fraccion` property from the state.
   * @type {Observable<string>}
   */
  fraccion$ = this.select((state) => state.fraccion);

  /**
   * Creates an instance of Tramite231001Query.
   * @param {Tramite231001Store} store - The store that holds the state.
   */
  constructor(
    protected override store: Tramite231001Store) {
    super(store);
  }
}