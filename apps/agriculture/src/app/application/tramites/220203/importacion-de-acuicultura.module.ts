import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogoSelectComponent,
  CrosslistComponent,
  FirmaElectronicaComponent,
  InputCheckComponent,
  InputFechaComponent,
  InputRadioComponent,
  SolicitanteComponent,
  TablaDinamicaComponent,
  TableComponent,
  TercerosComponent,
  TituloComponent,
  WizardComponent
} from '@ng-mf/data-access-user';


import { ImportacionDeAcuiculturaRoutingModule } from './importacion-de-acuicultura-routing.module';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { SanidadCertificadoComponent } from './pages/sanidad-certificado/sanidad-certificado.component';

import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';

import { DatosParaMovilizacionComponent } from './components/datos-para-movilizacion/datos-para-movilizacion.component';

import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';

import { ToastrModule, ToastrService } from 'ngx-toastr';



@NgModule({
  declarations: [
    PagoDeDerechosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionComponent,
    SanidadCertificadoComponent
  ],
  imports: [
    CommonModule,
    ImportacionDeAcuiculturaRoutingModule,
    ReactiveFormsModule,

    // UI Components from data-access-user
    TablaDinamicaComponent,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    CrosslistComponent,
    InputCheckComponent,
    AlertComponent,
    InputFechaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    InputRadioComponent,
    TableComponent,
    CatalogoSelectComponent,
    TercerosComponent,
    ToastrModule.forRoot(),
  ],
  providers: [
    ToastrService
  ]
})
export class ImportacionDeAcuiculturaModule { }
