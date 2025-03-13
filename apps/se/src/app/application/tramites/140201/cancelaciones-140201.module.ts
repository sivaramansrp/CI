import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Cancelaciones140201RoutingModule } from './cancelaciones-140201-routing.module';

import {
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cancelaciones140201Component } from './pages/cancelaciones-140201/cancelaciones-140201.component';
import { Datos140201Component } from './pages/datos-140201/datos-140201.component';
import { DatosDelLas140201Component } from './components/datos-del-las-140201/datos-del-las-140201.component';

import { CancelacionDeAutorizaciones140201Component } from './components/cancelacion-de-autorizaciones-140201/cancelacion-de-autorizaciones-140201.component';
import { EntidadExterna140201Component } from './components/entidad-externa-140201/entidad-externa-140201.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    Cancelaciones140201Component,
    Datos140201Component,
    
  ],
  imports: [
    CommonModule,
    Cancelaciones140201RoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    FormsModule,
    ReactiveFormsModule,
    DatosDelLas140201Component,
    CancelacionDeAutorizaciones140201Component,
    EntidadExterna140201Component
 
  ],
  providers: [provideHttpClient()],
})
export class Cancelaciones140201Module {}
