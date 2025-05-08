import { CommonModule } from '@angular/common';
import { ModificacionDelCambioDeSectorRoutingModule } from './modificacion-del-cambio-de-sector-routing.module';
import { NgModule } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@NgModule({
  declarations: [],
  imports: [CommonModule,ModificacionDelCambioDeSectorRoutingModule],
  providers: [ToastrService]
})
export class ModificacionDelCambioDeSectorModule { }
