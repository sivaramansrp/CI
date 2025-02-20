/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntecesorRoutingModule } from './antecesor-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { WizardComponent } from '../../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { CapturarIvaeiepsComponent } from '../components/capturar-ivaeieps/capturar-ivaeieps.component';
import { AnexarEquisitosComponent } from '../components/anexar-equisitos/anexar-equisitos.component';
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
    CapturarIvaeiepsComponent,
    AnexarEquisitosComponent,
    DatosPorRegimenComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})

/**
 * Este módulo se utiliza para configurar los componentes del módulo 31601.
 * Importar los componentes del módulo.
 */
export class AntecesorModule { }
