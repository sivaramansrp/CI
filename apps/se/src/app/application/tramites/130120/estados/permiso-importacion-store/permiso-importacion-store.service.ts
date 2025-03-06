import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { Injectable } from '@angular/core';
import { PermisoImportacionStore } from '../permiso-importacion.store';

@Injectable({
  providedIn: 'root'
})
export class PermisoImportacionStoreService {

  constructor(private permisoImportacionStore: PermisoImportacionStore) {
    // Constructor code here
  }

  updateDatos(params: DatosGrupos): void {
    this.permisoImportacionStore.actualizarDatosGrupos(params);
  }
}
