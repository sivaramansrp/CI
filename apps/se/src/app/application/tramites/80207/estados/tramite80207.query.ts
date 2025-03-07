import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SubmanufacturerDatos } from '../modelos/submanufacturer-modelos';
import { Tramites80207Store } from './tamite80207.store';

/**
 * Tramite query
 *
 * @export
 * @class TramiteQuery
 * @extends {Query<Tramites80207Queries>}
 */
@Injectable({
  providedIn: 'root',
})
export class Tramites80207Queries extends Query<SubmanufacturerDatos> {
  subManufacturerState$ = this.select();
  infoRegisterEstado$ = this.select('infoRegistro');
  datosSubcontratistaEstado$ = this.select('datosSubcontratista');
  plantasSubfabricantesAgregar$ = this.select('plantasSubfabricantesAgregar');
  plantasSubfabricantesEliminar$ = this.select('plantasSubfabricantesEliminar');

  constructor(protected override store: Tramites80207Store) {
    super(store);
  }
}
