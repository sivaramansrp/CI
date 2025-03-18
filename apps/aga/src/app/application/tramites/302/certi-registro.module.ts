/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertiRegistroRoutingModule } from './certi-registro-routing.module';
import { ProcesoCompletoComponent } from './pages/proceso-completo/proceso-completo.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@ng-mf/data-access-user';
import { DatosDelTramiteComponent } from './components/datos-del-tramite/datos-del-tramite.component';
// import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';

@NgModule({
  declarations: [
    ProcesoCompletoComponent,
    PasoUnoComponent,
    // PasoDosComponent
  ],
  imports: [
    CommonModule,
    CertiRegistroRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    DatosDelTramiteComponent
  ]
})
export class CertiRegistroModule { }
