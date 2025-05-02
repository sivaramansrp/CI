import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite120401State } from '../tramites/tramite120401.store';
import { Tramite120401Store } from '../tramites/tramite120401.store';

 
/**
 * @class Tramite120401Query
 * @description Proporciona consultas reactivas para acceder al estado de Tramite120401.
 * 
 * @property {Observable<any>} entidad$ - Observable que emite el valor de la propiedad `entidad` del estado.
 * @property {Observable<any>} representacion$ - Observable que emite el valor de la propiedad `representacion` del estado.
 * @property {Observable<any>} regimen$ - Observable que emite el valor de la propiedad `regimen` del estado.
 * @property {Observable<any>} tratado$ - Observable que emite el valor de la propiedad `tratado` del estado.
 * @property {Observable<any>} producto$ - Observable que emite el valor de la propiedad `producto` del estado.
 * @property {Observable<any>} subproducto$ - Observable que emite el valor de la propiedad `subproducto` del estado.
 * @property {Observable<any>} cantidadSolicitada$ - Observable que emite el valor de la propiedad `cantidadSolicitada` del estado.
 * 
 * @constructor
 * @param {Tramite120401Store} tramiteStore - Instancia del store que contiene el estado de Tramite120401.
 */
@Injectable({ providedIn: 'root' })
export class Tramite120401Query extends Query<Tramite120401State> {
  entidad$ = this.select((state) => state.entidad);
  representacion$ = this.select((state) => state.representacion);
  regimen$ = this.select((state) => state.regimen);
  tratado$ = this.select((state) => state.tratado);
  producto$ = this.select((state) => state.producto);
  subproducto$ = this.select((state) => state.subproducto);
  cantidadSolicitada$ = this.select((state) => state.cantidadSolicitada);
 
  constructor(private tramiteStore: Tramite120401Store) {
    super(tramiteStore);
  }
}