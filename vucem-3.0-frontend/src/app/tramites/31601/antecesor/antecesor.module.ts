/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntecesorRoutingModule } from './antecesor-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { WizardComponent } from '../../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { FirmarSolicitudComponent } from '../pages/firmar-solicitud/firmar-solicitud.component';
import { FirmaElectronicaComponent } from '../../../shared/components/firma-electronica/firma-electronica.component';
import { BtnContinuarComponent } from '../../../shared/components/btn-continuar/btn-continuar.component';

@NgModule({
  declarations: [DatosComponent, PantallasComponent, FirmarSolicitudComponent],
  imports: [
    CommonModule,
    AntecesorRoutingModule,
    WizardComponent,
    NavComponent,
    FirmaElectronicaComponent,
    BtnContinuarComponent,
    WizardComponent,
  ],
})
export class AntecesorModule {}
