/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntecesorRoutingModule } from './antecesor-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { WizardComponent } from '../../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { ReprestantanteComponent } from '../components/represtantante/represtantante.component';
import { EnlaceComponent } from '../components/enlace/enlace.component';
import { PersonaComponent } from '../components/persona/persona.component';
import { RegistroDialogComponent } from '../components/registro-dialog/registro-dialog.component';


@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent
  ],
  imports: [
    CommonModule,
    AntecesorRoutingModule,
    WizardComponent,
    NavComponent,ReprestantanteComponent,EnlaceComponent,PersonaComponent,RegistroDialogComponent
  ]
})
export class AntecesorModule { }
