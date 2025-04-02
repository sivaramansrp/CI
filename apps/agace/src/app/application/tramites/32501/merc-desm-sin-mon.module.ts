import { AlertComponent, InputRadioComponent, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosSolicitudComponent } from './components/datos-solicitud/datos-solicitud.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CrosslistComponent, InputFechaComponent, SharedModule, WizardComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { MercDesmSinMonRoutingModule } from './merc-desm-sin-mon-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { MercDesmSinMonService } from './services/merc-desm-sin-mon.service';
import { ModalOperacionComponent } from './components/modal-operacion/modal-operacion.component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    SolicitudPageComponent,
    PasoDosComponent,
    PasoTresComponent,
    DatosSolicitudComponent,
    ModalOperacionComponent
    // SolicitudComponent,
  ],
  imports: [
    FirmaElectronicaComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    WizardComponent,
    MercDesmSinMonRoutingModule,
    SharedModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    InputCheckComponent,
    InputFechaComponent,
    InputHoraComponent,
    CrosslistComponent,
    // PedimentoComponent,
    // AgregaPersonasComponent,
    ReactiveFormsModule,
    TituloComponent,
    SelectPaisesComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    TablaDinamicaComponent
    // AnexarRequisitosComponent
  ],
  exports: [
    // SolicitudComponent
  ],
  providers:[ MercDesmSinMonService]
})
export class MercDesmSinMonModule {}
