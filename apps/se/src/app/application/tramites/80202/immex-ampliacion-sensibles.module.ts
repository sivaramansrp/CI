import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImmexAmpliacionSensiblesRoutingModule } from './immex-ampliacion-sensibles-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { AnexoComponent } from './components/anexo.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import {
  AlertComponent,
  BtnContinuarComponent,
  FirmaElectronicaComponent,
  SolicitanteComponent,
  TituloComponent,
  WizardComponent,
  TablaDinamicaComponent,
} from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoCuatroComponent,
    AnexoComponent,
  ],
  imports: [
    CommonModule,
    ImmexAmpliacionSensiblesRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    AlertComponent,
    FirmaElectronicaComponent,
  ],
})
export class ImmexAmpliacionSensiblesModule {}
