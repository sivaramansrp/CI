import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EsquemaDeCertificacionRoutingModule } from './esquema-de-certificacion-routing.module';
import { TodosPasosComponent } from '../pages/todos-pasos/todos-pasos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoDosComponent } from '../pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../pages/paso-tres/paso-tres.component';
import { provideHttpClient } from '@angular/common/http';
import { EsquemaDeCertificacionService } from '../services/esquema-de-certificacion.service';


@NgModule({
  declarations: [TodosPasosComponent, PasoUnoComponent,PasoDosComponent, PasoTresComponent],
  imports: [
    CommonModule,
    EsquemaDeCertificacionRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
  ],
    providers: [
      provideHttpClient(),
      EsquemaDeCertificacionService
    ],
})
export class EsquemaDeCertificacionModule { }
