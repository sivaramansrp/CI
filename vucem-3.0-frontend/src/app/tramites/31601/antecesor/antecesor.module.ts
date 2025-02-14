/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntecesorRoutingModule } from './antecesor-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { WizardComponent } from '../../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { DatosPorRegimenComponent } from '../components/datos-por-regimen/datos-por-regimen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    DatosPorRegimenComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AntecesorModule { }
