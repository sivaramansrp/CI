import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CertificadoRoutingModule } from './certificado-routing.module';
import { AlertComponent, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CertificadoRoutingModule,
    AlertComponent,
    TablaDinamicaComponent
    
  ]
})
export class CertificadoModule { }
