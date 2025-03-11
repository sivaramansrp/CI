import { AutorizacionProgrmaNuevo } from './services/autorizacion-programa-nuevo.service';
import { AutorizacionProgrmaNuevoRoutingModule } from './autorizacion-programa-nuevo-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@NgModule({
  declarations: [],
  imports: [CommonModule,AutorizacionProgrmaNuevoRoutingModule],
  providers: [ToastrService,AutorizacionProgrmaNuevo]
})
export class AutorizacionProgrmaNuevoModule { }
