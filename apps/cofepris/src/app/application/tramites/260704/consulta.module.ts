import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultaService } from './service/consulta.service';
import { CatalogosService, SharedModule, TramiteFolioService } from '@libs/shared/data-access-user/src';
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
