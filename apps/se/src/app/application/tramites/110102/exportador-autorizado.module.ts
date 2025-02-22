import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportadorautorizadoRoutingModule } from './exportador-autorizado-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { SolicitanteComponent } from "../../../../../../../libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component";
import { DataosDeLaMercanciaComponent } from "./pages/datos-de-la-mercancia/dataos-de-la-mercancia.component";
import { DatosTratadosAcuerdosComponent } from "./components/datosTratadosAcuerdos/datosTratadosAcuerdos.component";


@NgModule({
  declarations: [DatosComponent,DataosDeLaMercanciaComponent],
  imports: [
    CommonModule,
    ExportadorautorizadoRoutingModule,
    SolicitanteComponent,
    DatosTratadosAcuerdosComponent
]
})
export class ExportadorautorizadoModule { }
