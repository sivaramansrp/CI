import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DesistimientoSolicitudComponent } from './pages/desistimiento-solicitud/desistimiento-solicitud.component';
import { DesistimientoSolicitudService } from './services/desistimiento-solicitud.service';
import { SemarnatDesistimientoRoutingModule } from './desistimiento-routing.module';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { provideHttpClient } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudComponent } from './component/solicitud/solicitud.component';

import { ToastrModule, ToastrService } from 'ngx-toastr';



@NgModule({
  declarations: [
    DesistimientoSolicitudComponent,
    PasoDosComponent,
    PasoUnoComponent,
    SolicitudComponent,
  ],
  imports: [
    CommonModule,
    SemarnatDesistimientoRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    SharedModule,
    BtnContinuarComponent,
    ReactiveFormsModule,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    ToastrModule.forRoot(),
  ],
  providers: [
    ToastrService,
    provideHttpClient(),
    DesistimientoSolicitudService
  ],
})
export class DesistimientoModule { }
