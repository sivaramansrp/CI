import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ImportacionProductos } from '../models/store.model';
import { ImportacionProductosStore } from './importacion-productos.store';

@Injectable({ providedIn: 'root' })
export class ImportacionProductosQuery extends Query<ImportacionProductos> {

  constructor(protected override store: ImportacionProductosStore) {
    super(store);
  }

  selectSolicitud$ = this.select((state) => {
    return state.datosDeSolicitud;
  });

  selectSolicitudSCIAN$ = this.select((state) => {
    return state.datosDeSolicitud.tablaFilaDatos;
  });
}
