import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AvisoImportacionMaquinasRoutingModule } from './aviso-importacion-maquinas-routing.module';

import { BtnContinuarComponent, SolicitanteComponent } from "@ng-mf/data-access-user";
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaMercanciaComponent } from './components/datos-de-la-mercancia/datos-de-la-mercancia.component';
import { DatosDeLaSolicitudComponent } from './pages/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosDelTramiteComponent } from "./components/datos-del-tramite/datos-del-tramite.component";
import { PasoDosComponent } from "./components/paso-dos/paso-dos.component";
import { PasoTresComponent } from "./components/paso-tres/paso-tres.component";
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RepresentacionFederalComponent } from "./components/representacion-federal/representacion-federal.component";
import { WizardComponent } from "@ng-mf/data-access-user";




@NgModule({
  declarations: [DatosComponent,PasoUnoComponent,DatosDeLaSolicitudComponent],
  imports: [
    CommonModule,
    AvisoImportacionMaquinasRoutingModule,
    WizardComponent,
    BtnContinuarComponent, SolicitanteComponent, DatosDeLaMercanciaComponent, DatosDelTramiteComponent,
    RepresentacionFederalComponent,
    PasoTresComponent,
    PasoDosComponent
]
})
export class AvisoImportacionMaquinasModule { }
