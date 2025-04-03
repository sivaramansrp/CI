import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  FirmaElectronicaComponent,
  SolicitanteComponent,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoExperimentalesPlaguicidasRoutingModule } from './permiso-experimentales-plaguicidas-routing.module';
import { PlaguicidasComponent } from './pages/plaguicidas/plaguicidas.component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    PlaguicidasComponent,
  ],
  imports: [
    CommonModule,
    PermisoExperimentalesPlaguicidasRoutingModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
  ],
})
export class PermisoExperimentalesPlaguicidasModule {}
