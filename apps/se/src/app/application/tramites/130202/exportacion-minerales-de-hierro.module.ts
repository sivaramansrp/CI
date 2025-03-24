import { BtnContinuarComponent, InputRadioComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DetosDeLaMercanciaComponent } from '../../shared/components/detos-de-la-mercancia/detos-de-la-mercancia.component';
import { DetosDelTramiteComponent } from '../../shared/components/detos-de-tramite/detos-del-tramite.component';

import { ExportacionMineralesDeHierroRoutingModule } from './exportacion-minerales-de-hierro-routing.module';

import { ExportacionMineralesDeHierroComponent } from './pages/exportacion-minerales-de-hierro/exportacion-minerales-de-hierro.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { PasoTresComponent } from '../120402/components/paso-tres/paso-tres.component';

import { PasoDosComponent } from '../120402/components/paso-dos/paso-dos.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';

import { NgModule } from '@angular/core';
@NgModule({
  declarations: [
    ExportacionMineralesDeHierroComponent,
    PasoUnoComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    ExportacionMineralesDeHierroRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    TituloComponent,
    InputRadioComponent,
    SolicitanteComponent,
    PasoTresComponent,
    PasoDosComponent,
    DetosDelTramiteComponent,
    DetosDeLaMercanciaComponent
  ]
})
export class ExportacionMineralesDeHierroModule { }
