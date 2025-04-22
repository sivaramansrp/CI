import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { SolicitudDeRegistroTplRoutingModule } from './solicitud-de-registro-tpl-routing.module';


@NgModule({
  declarations: [
    PantallasComponent
  ],
  imports: [
    CommonModule,
    SolicitudDeRegistroTplRoutingModule
  ]
})
export class SolicitudDeRegistroTplModule { }
