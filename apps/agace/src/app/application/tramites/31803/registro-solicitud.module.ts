import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroSolicitudRoutingModule } from './registro-solicitud-routing.module';
import { SolicitudComponent } from './components/Solicitud.component';
import { SharedModule } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RegistroSolicitudRoutingModule,
    SolicitudComponent,
  ]
})
export class RegistroSolicitudModule { }
