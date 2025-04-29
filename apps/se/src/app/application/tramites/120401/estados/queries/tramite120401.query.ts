import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite120401State } from '../tramites/tramite120401.store';
import { Tramite120401Store } from '../tramites/tramite120401.store';

 
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