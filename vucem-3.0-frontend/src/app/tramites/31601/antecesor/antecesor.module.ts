/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntecesorRoutingModule } from './antecesor-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { WizardComponent } from '../../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { AduaneroComponent } from "../components/aduanero/aduanero.component";


@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent
  ],
  imports: [
    CommonModule,
    AntecesorRoutingModule,
    WizardComponent,
    NavComponent,
    AduaneroComponent
]
})
export class AntecesorModule { }
