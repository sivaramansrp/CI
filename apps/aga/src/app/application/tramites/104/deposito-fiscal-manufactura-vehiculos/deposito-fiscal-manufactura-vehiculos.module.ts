import { CommonModule } from '@angular/common';
import { DepositoFiscalManufacturaVehiculosRoutingModule } from './deposito-fiscal-manufactura-vehiculos-routing.module';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from '../pages/solicitud-page/solicitud-page.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';

@NgModule({
  declarations: [SolicitudPageComponent,PasoUnoComponent],
  imports: [
    CommonModule,
    DepositoFiscalManufacturaVehiculosRoutingModule,
    WizardComponent,
    SolicitanteComponent
  ]
})
export class DepositoFiscalManufacturaVehiculosModule { }
