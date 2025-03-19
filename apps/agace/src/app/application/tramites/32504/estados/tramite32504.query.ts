import { FormularioGrupo } from '../models/aviso.model';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite32504Store } from './tramite32504.store';

/**
 * Tramite query
 *
 * @export
 * @class TramiteQuery
 * @extends {Query<FormularioGrupo>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite32504Query extends Query<FormularioGrupo> {
  selectDatosEmpresa$ = this.select((state) => {
    return state.datosEmpresa;
  });

  setCargaTipo$ = this.select((state) => {
   return state.cargaTipo;
  })

  selectDatosQuienRecibe$ = this.select((state) => {
    return state.datosQuienRecibe;
  });

  selectDatosMercanciaSubmanufactura$ = this.select((state) => {
    return state.datosMercanciaSubmanufactura;
  });

  selectDatosDomicilioLugar$ = this.select((state) => {
    return state.datosDomicilioLugar;
  });

  constructor(protected override store: Tramite32504Store) {
    super(store);
  }
}