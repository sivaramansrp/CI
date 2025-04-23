import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosDeComercioExteriorRoutingModule } from './registros-de-comercio-exterior-routing.module';
import { TodosPasosComponent } from '../pages/todos-pasos/todos-pasos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { provideHttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TercerosRelacionadosService } from '../../../shared/services/terceros-relacionados.service';
import { DatosComunesService } from '../../../shared/services/datos-comunes.service';
import { RegistrosDeComercioExteriorService } from '../services/registros-de-comercio-exterior.service';
import { DatosComunesComponent } from '../../../shared/components/datos-comunes/datos-comunes.component';
import { TercerosRelacionadosComponent } from '../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { PasoDosComponent } from '../pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../pages/paso-tres/paso-tres.component';


@NgModule({
  declarations: [TodosPasosComponent,PasoUnoComponent,PasoDosComponent,PasoTresComponent],
  imports: [
    CommonModule,
    RegistrosDeComercioExteriorRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    DatosComunesComponent,
    TercerosRelacionadosComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent
  ],
    providers: [
    provideHttpClient(),
    BsModalService,
    TercerosRelacionadosService,
    DatosComunesService,
    RegistrosDeComercioExteriorService
  ],
})
export class RegistrosDeComercioExteriorModule { }
