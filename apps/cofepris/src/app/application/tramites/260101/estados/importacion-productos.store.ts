import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ImportacionProductos } from '../models/store.model';
import { DatosDeSolicitud } from '../models/solicitud-datos.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';

export function createInitialState(): ImportacionProductos {
  return {
    datosDeSolicitud: {} as DatosDeSolicitud,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'importacion-productos-store', resettable: true })
export class ImportacionProductosStore extends Store<ImportacionProductos> {
  constructor() {
    super(createInitialState());
  }

  actualizarDatosDeAplicacion(datos: DatosDeSolicitud) {
    this.update((state) => ({
      ...state,
      datosDeSolicitud: {
        ...datos,
      },
    }));
  }

  public limpiarSeccion() {
    this.reset();
  }
}
