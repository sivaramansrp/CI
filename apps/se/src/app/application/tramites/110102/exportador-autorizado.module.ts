
import { CommonModule } from '@angular/common';
import { DataosDeLaMercanciaComponent } from "./pages/datos-de-la-mercancia/dataos-de-la-mercancia.component";
import { DatosComponent } from './pages/datos/datos.component';
import { DatosTratadosAcuerdosComponent } from "./components/datos-tratados-acuerdos/datos-tratados-acuerdos.component";
import { ExportadorautorizadoRoutingModule } from './exportador-autorizado-routing.module';
import { NgModule } from '@angular/core';
import { RegistroMercanciaComercializadorComponent } from "./components/registro-mercancia-comercializador/registro-mercancia-comercializador.component";
import { SolicitanteComponent } from "../../../../../../../libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component";
import { DatosDeLaMercanciaComponent } from "./components/datos-de-la-mercancia/datos-de-la-mercancia.component";



@NgModule({
  declarations: [DatosComponent,DataosDeLaMercanciaComponent],
  imports: [
    CommonModule,
    ExportadorautorizadoRoutingModule,
    SolicitanteComponent,
    DatosTratadosAcuerdosComponent,
    RegistroMercanciaComercializadorComponent,
    DatosDeLaMercanciaComponent
]
})
export class ExportadorautorizadoModule { }
