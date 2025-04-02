import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultaService } from './service/consulta.service';
import { SharedModule } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ConsultaModule { }
