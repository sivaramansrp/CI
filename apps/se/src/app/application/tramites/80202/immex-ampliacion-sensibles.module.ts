// Angular Core imports
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { forwardRef } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

// Third-party library imports
import {
  AlertComponent,
  AnexarDocumentosComponent,
} from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

// Application imports
import { AnexoComponent } from './components/anexo.component';
import { ImmexAmpliacionSensiblesRoutingModule } from './immex-ampliacion-sensibles-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent,
  ],
  imports: [
    AlertComponent,
    BtnContinuarComponent,
    CommonModule,
    AnexoComponent,
    PasoUnoComponent,
    FirmaElectronicaComponent,
    ImmexAmpliacionSensiblesRoutingModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    TablaDinamicaComponent,
    TituloComponent,
    WizardComponent,
    forwardRef(() => AnexarDocumentosComponent),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImmexAmpliacionSensiblesModule {}
