import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PermisoImportacionRoutingModule } from './permiso-importacion-routing.module';
import { ModificacionPermisoImportacionComponent } from './pages/modificacion-permiso-importacion/modificacion-permiso-importacion.component';

@NgModule({
  declarations: [ModificacionPermisoImportacionComponent],
  imports: [CommonModule, PermisoImportacionRoutingModule],
})
export class PermisoImportacionModule {}
