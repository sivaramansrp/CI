import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExencionImpuestosRoutingModule } from './exencion-impuestos-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent, BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosTramiteComponent } from './components/datosTramite.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExencionImpuestosRoutingModule,
    SolicitudPageComponent,
    PasoUnoComponent,
    AlertComponent,
    WizardComponent,
    BtnContinuarComponent,
    FormsModule,
    ReactiveFormsModule,
    DatosTramiteComponent
  ]
})
export class ExencionImpuestosModule { }
