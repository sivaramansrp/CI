import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EconomicoRoutingModule } from './economico-routing.module';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosComunesComponent } from './components/datos comunes/datos-comunes.component';
import { TercerosRelacinadosComponent } from './components/terceros relacionados/terceros-relacinados.component';
import { ControladoraComponent } from './components/controladora/controladora.component';
import { CtpatComponent } from './components/ctpat/ctpat.component';


@NgModule({
  declarations: [PasoUnoComponent, PasoDosComponent, PasoTresComponent, SolicitudPageComponent],
  imports: [
    CommonModule,
    EconomicoRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    ReactiveFormsModule,
    DatosComunesComponent,
    TercerosRelacinadosComponent,
    ControladoraComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    CtpatComponent
  ]
})
export class EconomicoModule { }
