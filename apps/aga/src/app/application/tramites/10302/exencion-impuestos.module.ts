import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExencionImpuestosRoutingModule } from './exencion-impuestos-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent, BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule
  ]
})
export class ExencionImpuestosModule { }
