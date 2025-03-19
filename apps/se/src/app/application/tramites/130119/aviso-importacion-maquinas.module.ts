import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AvisoImportacionMaquinasRoutingModule } from './aviso-importacion-maquinas-routing.module';

import { BtnContinuarComponent, SolicitanteComponent } from "@ng-mf/data-access-user";
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDelTramiteComponent } from "./components/datos-del-tramite/datos-del-tramite.component";
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { WizardComponent } from "@ng-mf/data-access-user";





@NgModule({
  declarations: [DatosComponent,PasoUnoComponent],
  imports: [
    CommonModule,
    AvisoImportacionMaquinasRoutingModule,
    WizardComponent,
    BtnContinuarComponent, SolicitanteComponent,
    DatosDelTramiteComponent
]
})
export class AvisoImportacionMaquinasModule { }
