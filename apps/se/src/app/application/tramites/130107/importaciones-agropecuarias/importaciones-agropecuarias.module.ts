import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ImportacionesAgropecuariasRoutingModule } from './importaciones-agropecuarias-routing.module';
import { ImportacionesAgropecuariasService } from '../services/importaciones-agropecuarias.service';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from '../pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { TodosPasosComponent } from '../pages/todos-pasos/todos-pasos.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [TodosPasosComponent,PasoUnoComponent,PasoDosComponent,PasoTresComponent],
  imports: [
    CommonModule,
    ImportacionesAgropecuariasRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent
  ],
  providers: [
    provideHttpClient(),
    BsModalService,
    ImportacionesAgropecuariasService
  ],
})
export class ImportacionesAgropecuariasModule { }
