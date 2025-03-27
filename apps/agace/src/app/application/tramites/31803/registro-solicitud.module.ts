import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroSolicitudRoutingModule } from './registro-solicitud-routing.module';
import { SolicitudComponent } from './components/Solicitud.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegistroSolicitudRoutingModule,
    SolicitudComponent
  ]
})
export class RegistroSolicitudModule { }
