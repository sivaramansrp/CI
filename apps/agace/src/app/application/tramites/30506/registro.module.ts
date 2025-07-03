import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudComponent } from "./components/Solicitud.component";


@NgModule({
  declarations: [PasoUnoComponent, PasoDosComponent, PasoTresComponent,SolicitudPageComponent],
  imports: [
    RegistroRoutingModule,
    CommonModule,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SharedModule,
    SolicitanteComponent,
    WizardComponent,
    BtnContinuarComponent,
    FormsModule,
    ReactiveFormsModule,
    SolicitudComponent
]
})
export class RegistroModule { }
