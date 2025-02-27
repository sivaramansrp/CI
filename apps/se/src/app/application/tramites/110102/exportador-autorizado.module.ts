import { BtnContinuarComponent } from "../../../../../../../libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component";
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaMercanciaComponent } from "./components/datos-de-la-mercancia/datos-de-la-mercancia.component";
import { DatosTratadosAcuerdosComponent } from "./components/datos-tratados-acuerdos/datos-tratados-acuerdos.component";

import { DataosMercanciaComponent } from "./pages/datos-mercancia/dataos-mercancia.component";
import { ExportadorautorizadoRoutingModule } from './exportador-autorizado-routing.module';
import { NgModule } from '@angular/core';
import { RegistroExportadorAutorizadoComponent } from "./components/registro-exportador-autorizado/registro-exportador-autorizado.component";
import { RegistroMercanciaComercializadorComponent } from "./components/registro-mercancia-comercializador/registro-mercancia-comercializador.component";
import { RepresentacionFederalComponent } from "./components/representacion-federal/representacion-federal.component";
import { SolicitanteComponent } from "../../../../../../../libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component";
import { TablaDinamicaComponent } from "../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";






@NgModule({
  declarations: [DatosComponent,DataosMercanciaComponent],
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
    TablaDinamicaComponent
]
})
export class ExportadorautorizadoModule { }
