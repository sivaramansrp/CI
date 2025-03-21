import { BtnContinuarComponent } from "@ng-mf/data-access-user";
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaMercanciaComponent } from "./components/datos-de-la-mercancia/datos-de-la-mercancia.component";
import { DatosTratadosAcuerdosComponent } from "./components/datos-tratados-acuerdos/datos-tratados-acuerdos.component";

import { DatosMercanciaComponent } from "./pages/datos-mercancia/datos-mercancia.component";
import { ExportadorautorizadoRoutingModule } from './exportador-autorizado-routing.module';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from "../110102/components/paso-dos/paso-dos.component";
import { PasoTresComponent } from "../110102/components/paso-tres/paso-tres.component";
import { RegistroExportadorAutorizadoComponent } from "./components/registro-exportador-autorizado/registro-exportador-autorizado.component";
import { RegistroMercanciaComercializadorComponent } from "./components/registro-mercancia-comercializador/registro-mercancia-comercializador.component";
import { RepresentacionFederalComponent } from "./components/representacion-federal/representacion-federal.component";
import { SolicitanteComponent } from "@ng-mf/data-access-user";
import { TablaDinamicaComponent } from "@ng-mf/data-access-user";
import { WizardComponent } from "../../../../../../../libs/shared/data-access-user/src/tramites/components/wizard/wizard.component";







@NgModule({
  declarations: [DatosComponent,DatosMercanciaComponent],
  imports: [
    CommonModule,
    ExportadorautorizadoRoutingModule,
    SolicitanteComponent,
    DatosTratadosAcuerdosComponent,
    RegistroMercanciaComercializadorComponent,
    DatosDeLaMercanciaComponent,
    RegistroExportadorAutorizadoComponent,
    RepresentacionFederalComponent,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    WizardComponent,
    PasoDosComponent,
    PasoTresComponent
]
})
export class ExportadorautorizadoModule { }
