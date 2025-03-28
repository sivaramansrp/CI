import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificadosRoutingModule } from './certificados-routing.module';
import { TodospasosComponent } from '../pages/todospasos/todospasos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [TodospasosComponent,PasoUnoComponent],
  imports: [
    CommonModule,
    CertificadosRoutingModule,
    WizardComponent,
    BtnContinuarComponent
  ]
})
export class CertificadosModule { }
