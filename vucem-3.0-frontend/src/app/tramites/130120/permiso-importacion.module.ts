import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PermisoImportacionRoutingModule } from './permiso-importacion-routing.module';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PermisoImportacionRoutingModule,
    WizardComponent
  ],
})
export class PermisoImportacionModule { }
