import { CommonModule } from '@angular/common';
import { ModificacionSolicitudRoutingModule } from './modificacion-solicitud-routing.module';
import { ModificacionSolicitudeService } from './services/modificacion-solicitude.service';
import { NgModule } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@NgModule({
  declarations: [],
  imports: [CommonModule,ModificacionSolicitudRoutingModule],
  providers: [ModificacionSolicitudeService,ToastrService]
})
export class ModificacionSolicitudModule { }
