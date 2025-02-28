import { Injectable } from '@angular/core';
import { DatosGrupos } from '../../../models/130120/permiso-importacion-modification.model';
// import { PermisoImportacionStore } from '../../../../../../../../apps/se/src/app/application/store/130120/permiso-importacion.store';

@Injectable({
  providedIn: 'root'
})
export class PermisoImportacionStoreService {

  constructor(private permisoImportacionStore: PermisoImportacionStore) { }

  updateDatos(params: DatosGrupos): void {
    this.permisoImportacionStore.actualizarDatosGrupos(params);
  }
}
