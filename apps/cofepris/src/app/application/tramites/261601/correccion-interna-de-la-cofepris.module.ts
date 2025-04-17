import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CorreccionInternaDeLaCofeprisRoutingModule } from './correccion-interna-de-la-cofepris-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  FirmaElectronicaComponent,
  InputFechaComponent,
  SolicitanteComponent,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { TramitesAsociadosComponent } from './components/Tramitesasociados/tramites-asociados.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { CorreccionInternaDeLaCofeprisService } from './services/correccion-interna-de-la-cofepris.service';
import { CorreccionInternaDeLaCofeprisComponent } from './pages/correccion-interna-de-la-cofepris/correccion-interna-de-la-cofepris.component';
import { SolicitudComponent } from './components/Solicitud/solicitud.component';


@NgModule({
  declarations: [
    PasoUnoComponent, 
    PasoDosComponent, 
    PasoTresComponent,
    CorreccionInternaDeLaCofeprisComponent
    
  ],
  imports: [
    SolicitudComponent,
    CommonModule,
    CorreccionInternaDeLaCofeprisRoutingModule,
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    CommonModule,
    TramitesAsociadosComponent,
    FirmaElectronicaComponent,
    InputFechaComponent,
    SolicitanteComponent,
    TituloComponent,
    WizardComponent,
  ],
  
    providers: [ToastrService,CorreccionInternaDeLaCofeprisService],
})
export class CorreccionInternaDeLaCofeprisModule {}
