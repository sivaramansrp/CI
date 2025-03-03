/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroCuentasBancariasRoutingModule } from './registro-cuentas-bancarias-routing.module';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { TodospasosComponent } from '../pages/todospasos/todospasos.component';
import { PasoDosComponent } from '../pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';


@NgModule({
  declarations: [TodospasosComponent,PasoDosComponent,PasoUnoComponent],
  imports: [
    CommonModule,
    RegistroCuentasBancariasRoutingModule,
    WizardComponent
  ]
})
export class RegistroCuentasBancariasModule { }
