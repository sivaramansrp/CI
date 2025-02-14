/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';

import { AvisodematerialesRoutingModule } from './avisodemateriales-routing.module';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { DatosDelaComponent } from './components/datos-dela/datos-dela.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';



@NgModule({
  declarations: [
    SolicitanteComponent,
    DatosDelaComponent,
    DatosComponent
  ],
  imports: [
    CommonModule,
    AvisodematerialesRoutingModule,
    ReactiveFormsModule,
    WizardComponent,
    TituloComponent
    
  ]
})
export class AvisodematerialesModule { }
