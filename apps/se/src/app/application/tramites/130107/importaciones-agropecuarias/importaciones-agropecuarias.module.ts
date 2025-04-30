import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportacionesAgropecuariasRoutingModule } from './importaciones-agropecuarias-routing.module';
import { TodosPasosComponent } from '../pages/todos-pasos/todos-pasos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from '../pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../pages/paso-tres/paso-tres.component';
import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [TodosPasosComponent,PasoUnoComponent,PasoDosComponent,PasoTresComponent],
  imports: [
    CommonModule,
    ImportacionesAgropecuariasRoutingModule,
    WizardComponent,
    BtnContinuarComponent
  ]
})
export class ImportacionesAgropecuariasModule { }
