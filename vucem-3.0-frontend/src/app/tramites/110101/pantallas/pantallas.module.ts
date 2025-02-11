/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';
import { WizardComponent } from '../../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { DatosComponent } from '../pages/datos/datos.component';
import { SolicitanteComponent } from '../components/solicitante/solicitante.component';
import { DatosDeLaComponent } from '../components/datos-de-la/datos-de-la.component';
import { DatosAdicionalesComponent } from '../components/datos-adicionales/datos-adicionales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TratadosComponent } from '../components/tratados/tratados.component';


@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PantallasRoutingModule,
    WizardComponent,
    NavComponent,
    SolicitanteComponent,
    DatosDeLaComponent,
    DatosAdicionalesComponent,
    TratadosComponent
  ]
})

/**
 * Este módulo se utiliza para configurar los componentes del módulo 220401.
 * Importar los componentes del módulo.
 */
export class PantallasModule { }
