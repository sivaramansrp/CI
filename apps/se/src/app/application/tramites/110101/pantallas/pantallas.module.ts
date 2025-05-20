/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';
import { WizardComponent } from '@ng-mf/data-access-user';
import { NavComponent } from '@ng-mf/data-access-user';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { DatosComponent } from '../pages/datos/datos.component';
import { SolicitanteComponent } from '../components/solicitante/solicitante.component';
import { DatosMercanciaComponent } from '../components/datos-mercancia/datos-mercancia.component';
import { DatosAdicionalesComponent } from '../components/datos-adicionales/datos-adicionales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TratadosComponent } from '../components/tratados/tratados.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { FirmarSolicitudComponent } from '../pages/firmar-solicitud/firmar-solicitud.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
    FirmarSolicitudComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PantallasRoutingModule,
    WizardComponent,
    NavComponent,
    SolicitanteComponent,
    DatosMercanciaComponent,
    DatosAdicionalesComponent,
    TratadosComponent,
    BtnContinuarComponent,
    FirmaElectronicaComponent
  ]
})

/**
 * Este módulo se utiliza para configurar los componentes del módulo 220401.
 * Importar los componentes del módulo.
 */
export class Pantallas110101Module { }
