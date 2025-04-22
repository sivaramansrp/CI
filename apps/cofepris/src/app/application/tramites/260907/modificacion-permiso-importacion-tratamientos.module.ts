import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ModificacionPermisoImportacionTratamientosRoutingModule } from './modificacion-permiso-importacion-tratamientos-routing.module';
import { PasoUnoPagesComponent } from './pages/paso-uno-pages/paso-uno-pages.component';

@NgModule({
  declarations: [PasoUnoPagesComponent],
  imports: [
    CommonModule,
    ModificacionPermisoImportacionTratamientosRoutingModule,
  ],
})
export class ModificacionPermisoImportacionTratamientosModule {}
