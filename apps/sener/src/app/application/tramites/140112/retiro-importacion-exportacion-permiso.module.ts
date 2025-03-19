import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WizardComponent } from '@ng-mf/data-access-user';
import { RetiroImportacionExportacionPermisoRoutingModule } from './retiro-importacion-exportacion-permiso-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RetiroImportacionExportacionPermisoRoutingModule,
    WizardComponent
  ],
})
export class RetiroImportacionExportacionPermisoModule { }