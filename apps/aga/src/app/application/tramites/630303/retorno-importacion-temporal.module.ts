import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { RetornoImportacionTemporalComponent } from './pages/retorno-importacion-temporal-page/retorno-importacion-temporal-page.component';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RetornoImportacionTemporalRoutingModule } from './retorno-importacion-temporal-routing.module';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DatosDeLaSolicitudComponent } from "./components/datos-de-la-solicitud/datos-de-la-solicitud.component";



@NgModule({
  declarations: [RetornoImportacionTemporalComponent, PasoUnoComponent],
  imports: [
    CommonModule,
    RetornoImportacionTemporalRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent,
    ToastrModule.forRoot(),
    DatosDeLaSolicitudComponent
],
  providers: [
    ToastrService,
  ]
})
export class RetornoImportacionTemporalModule {}
