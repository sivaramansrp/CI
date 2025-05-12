import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvisoProcesosRoutingModule } from './aviso-procesos-routing.module';
import { WizardComponent } from '@ng-mf/data-access-user';
import { AvisoDatosService } from './services/aviso-datos.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AvisoProcesosRoutingModule,
    WizardComponent
  ],
  providers:[AvisoDatosService]
})
export class AvisoProcesosModule { }
