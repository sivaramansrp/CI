import { CommonModule } from '@angular/common';
import { DepositoFiscalManufacturaVehiculosRoutingModule } from './deposito-fiscal-manufactura-vehiculos-routing.module';
import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from '../pages/solicitud-page.component';

@NgModule({
  declarations: [SolicitudPageComponent],
  imports: [
    CommonModule,
    DepositoFiscalManufacturaVehiculosRoutingModule
  ]
})
export class DepositoFiscalManufacturaVehiculosModule { }
