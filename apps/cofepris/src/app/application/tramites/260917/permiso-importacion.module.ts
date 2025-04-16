import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ModificacionPermisoImportacionComponent } from './pages/modificacion-permiso-importacion/modificacion-permiso-importacion.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoImportacionRoutingModule } from './permiso-importacion-routing.module';

@NgModule({
  declarations: [
    ModificacionPermisoImportacionComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [CommonModule, PermisoImportacionRoutingModule,BtnContinuarComponent,WizardComponent],
})
export class PermisoImportacionModule {}
