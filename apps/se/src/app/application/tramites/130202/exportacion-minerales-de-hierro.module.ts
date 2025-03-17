import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ExportacionMineralesDeHierroRoutingModule } from './exportacion-minerales-de-hierro-routing.module';

import { ExportacionMineralesDeHierroComponent } from './pages/exportacion-minerales-de-hierro/exportacion-minerales-de-hierro.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { BtnContinuarComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosDelaSolicitudComponent } from './components/datos-dela-solicitud/datos-dela-solicitud.component';

import { DatosDelTramiteRealizarComponent } from './components/datos-del-tramite-realizar/datos-del-tramite-realizar.component';

import { DatosDeLaMercanciaComponent } from './components/datos-de-la-mercancia/datos-de-la-mercancia.component';
import { PartidasDeLaMercanciaComponent } from './components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { PaisesDeDestinoComponent } from './components/paises-de-destino/paises-de-destino.component';
import { RepresentacionFederalComponent } from './components/representacion-federal/representacion-federal.component';


@NgModule({
  declarations: [
    ExportacionMineralesDeHierroComponent,
    PasoUnoComponent
  ],
  imports: [
    CommonModule,
    ExportacionMineralesDeHierroRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    TituloComponent,
    SolicitanteComponent,
    DatosDelaSolicitudComponent,
    DatosDelTramiteRealizarComponent,
    DatosDeLaMercanciaComponent,
    PartidasDeLaMercanciaComponent,
    PaisesDeDestinoComponent,
    RepresentacionFederalComponent
  ]
})
export class ExportacionMineralesDeHierroModule { }
