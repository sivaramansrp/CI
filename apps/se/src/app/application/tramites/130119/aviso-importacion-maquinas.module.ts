import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AvisoImportacionMaquinasRoutingModule } from './aviso-importacion-maquinas-routing.module';
import { BtnContinuarComponent } from "@ng-mf/data-access-user";
import { DatosComponent } from './pages/datos/datos.component';
import { WizardComponent } from "@ng-mf/data-access-user";



@NgModule({
  declarations: [DatosComponent],
  imports: [
    CommonModule,
    AvisoImportacionMaquinasRoutingModule,
    WizardComponent,
    BtnContinuarComponent
]
})
export class AvisoImportacionMaquinasModule { }
