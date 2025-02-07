/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from './110101/components/solicitante/solicitante.component';
import { TratadosComponent } from './110101/components/tratados/tratados.component';



@NgModule({
  declarations: [  
  
    SolicitanteComponent, TratadosComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
  ]
})
export class ViewsModule { }
