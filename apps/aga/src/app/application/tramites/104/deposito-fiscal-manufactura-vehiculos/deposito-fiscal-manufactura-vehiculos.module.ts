import { CommonModule } from '@angular/common';
import { DepositoFiscalManufacturaVehiculosRoutingModule } from './deposito-fiscal-manufactura-vehiculos-routing.module';
import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from '../pages/solicitud-page.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';

@NgModule({
  declarations: [SolicitudPageComponent,],
  imports: [
    CommonModule,
    DepositoFiscalManufacturaVehiculosRoutingModule,
    WizardComponent
  ]
})
export class DepositoFiscalManufacturaVehiculosModule { }
