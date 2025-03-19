/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificadosLicenciasPermisosRoutingModule } from './certificados-licencias-permisos-routing.module';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { BtnContinuarComponent, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TodospasosComponent } from '../pages/todospasos/todospasos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { DatosDeLaSolicitudComponent } from '../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PagoDeDerechosComponent } from '../components/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosComponent } from '../components/terceros-relacionados/terceros-relacionados.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { provideHttpClient } from '@angular/common/http';
import { CertificadosLicenciasPermisosService } from '../services/certificados-licencias-permisos.service';


@NgModule({
  declarations: [TodospasosComponent,PasoUnoComponent],
  imports: [
    CommonModule,
    CertificadosLicenciasPermisosRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    PagoDeDerechosComponent,
    TercerosRelacionadosComponent,

],
providers: [
  BsModalService,
  provideHttpClient(),
  CertificadosLicenciasPermisosService
]
}) 
export class CertificadosLicenciasPermisosModule { }
