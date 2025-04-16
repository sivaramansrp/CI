import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroSolicitudDesistimientoRoutingModule } from './registro-solicitud-desistimiento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent,SharedModule, WizardComponent, BtnContinuarComponent, SolicitanteComponent, InputCheckComponent, FirmaElectronicaComponent, TituloComponent, AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { SolicitudComponent } from './components/Solicitud.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


@NgModule({
  declarations: [PasoUnoComponent, PasoDosComponent, PasoTresComponent, SolicitudPageComponent],
  imports: [
    CommonModule,
    RegistroSolicitudDesistimientoRoutingModule,
    SharedModule,
    SolicitudComponent,
    WizardComponent,
    BtnContinuarComponent,
    FormsModule,
    SolicitanteComponent,
    ReactiveFormsModule,
    InputCheckComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SharedModule,
    TituloComponent,
    AlertComponent
  ]
})
export class RegistroSolicitudDesistimientoModule { }
