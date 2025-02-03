/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';
import { WizardComponent } from '../../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { DatosComponent } from '../pages/datos/datos.component';
import { SolicitanteComponent } from '../components/solicitante/solicitante.component';


@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent
  ],
  imports: [
    CommonModule,
    PantallasRoutingModule,
    WizardComponent,
    NavComponent,
    SolicitanteComponent
  ]
})
export class PantallasModule { }
