import { DatosGrupos } from '../models/permiso-importacion-modification.model';
import { Injectable } from '@angular/core';
import { PermisoImportacionStore } from './permiso-importacion.store';
import { Query } from '@datorama/akita';

/**
 * Tramite query
 *
 * @export
 * @class TramiteQuery
 * @extends {Query<DatosGrupos>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite32504Query extends Query<DatosGrupos> {
  selectDatosEmpresa$ = this.select((state) => {
    return state.datosRealizer;
  });

  setCargaTipo$ = this.select((state) => {
   return state.datosMercanica;
  })

  selectDatosQuienRecibe$ = this.select((state) => {
    return state.datosExporta;
  });

  selectDatosMercanciaSubmanufactura$ = this.select((state) => {
    return state.datosProductor;
  });

  selectDatosDomicilioLugar$ = this.select((state) => {
    return state.datosExportador;
  });

  constructor(protected override store: PermisoImportacionStore) {
    super(store);
  }
}