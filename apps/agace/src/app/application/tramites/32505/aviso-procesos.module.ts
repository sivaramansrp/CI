import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvisoProcesosRoutingModule } from './aviso-procesos-routing.module';
import { WizardComponent } from '@ng-mf/data-access-user';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AvisoProcesosRoutingModule,
    WizardComponent
  ]
})
export class AvisoProcesosModule { }
