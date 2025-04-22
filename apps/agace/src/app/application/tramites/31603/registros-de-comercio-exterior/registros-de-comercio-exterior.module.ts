import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosDeComercioExteriorRoutingModule } from './registros-de-comercio-exterior-routing.module';
import { TodosPasosComponent } from '../pages/todos-pasos/todos-pasos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [TodosPasosComponent,PasoUnoComponent],
  imports: [
    CommonModule,
    RegistrosDeComercioExteriorRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent
  ]
})
export class RegistrosDeComercioExteriorModule { }
