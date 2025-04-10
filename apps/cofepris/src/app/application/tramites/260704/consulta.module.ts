import { CatalogosService, SharedModule, TramiteFolioService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaService } from './service/consulta.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    
  ],
  providers:[ToastrService,CatalogosService,
    TramiteFolioService,ConsultaService],
})
export class ConsultaModule { }
