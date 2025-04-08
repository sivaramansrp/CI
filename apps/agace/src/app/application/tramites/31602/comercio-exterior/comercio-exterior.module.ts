import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComercioExteriorRoutingModule } from './comercio-exterior-routing.module';
import { TodospasosComponent } from '../pages/todospasos/todospasos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [TodospasosComponent,PasoUnoComponent],
  imports: [
    CommonModule,
    ComercioExteriorRoutingModule,
    WizardComponent,
    BtnContinuarComponent
  ]
})
export class ComercioExteriorModule { }
