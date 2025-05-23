import { FormularioGrupo } from '../models/acuicola.module';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite220403Store } from './tramite220403.store';

/**
 * Tramite query
 *
 * @export
 * @class TramiteQuery
 * @extends {Query<FormularioGrupo>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite220403Query extends Query<FormularioGrupo> {
  setDatosRealizar$ = this.select((state) => {
    return state.datosRealizar;
  });

  setCombinacionRequerida$ = this.select((state) => {
    return state.combinacionRequerida;
  });

  setTransporte$ = this.select((state) => {
   return state.transporte;
  })

  setPagoDerechos$ = this.select((state) => {
    return state.pagoDerechos;
  });

  selectTramite$ = this.select((state) => {
        return state;
      });

  constructor(protected override store: Tramite220403Store) {
    super(store);
  }
}