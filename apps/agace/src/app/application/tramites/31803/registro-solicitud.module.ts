import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegistroSolicitudRoutingModule } from './registro-solicitud-routing.module';
import { SharedModule } from '@libs/shared/data-access-user/src';
import { SolicitudComponent } from './components/Solicitud.component';


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
