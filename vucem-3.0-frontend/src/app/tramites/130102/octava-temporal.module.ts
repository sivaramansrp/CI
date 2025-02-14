import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OctavaTemporalRoutingModule } from './octava-temporal-routing.module';

import { CriterioDeDictComponent } from './component/criterio-de-dict/criterio-de-dict.component';
import { DetosDelMarcanciaComponent } from './component/detos-del-marcancia/detos-del-marcancia.component';
import { DetosDelTramiteComponent } from './component/detos-del-tramite/detos-del-tramite.component';
import { PaisProcendenciaComponent } from './component/pais-procendencia/pais-procendencia.component';
import { SolicitanteOctavaTemporalComponent } from './component/solicitante-octava-temporal/solicitante-octava-temporal.component';

import { PartidasDeLaComponent } from './component/partidas-de-la/partidas-de-la.component';
import { RepresentacionComponent } from './component/representacion/representacion.component';
import { UsoEspicificoComponent } from './component/uso-espicifico/uso-espicifico.component';

import { DatosComponent } from './pages/datos/datos.component';

import { OctavaTemporalComponent } from './pages/octava-temporal/octava-temporal.component';
import { SolicitanteComponent } from './pages/solicitante/solicitante.component';

import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    OctavaTemporalComponent,
    SolicitanteComponent,
    DatosComponent,
  ],
  imports: [
    CommonModule,
    OctavaTemporalRoutingModule,
    BtnContinuarComponent,
    CriterioDeDictComponent,
    DetosDelMarcanciaComponent,
    DetosDelTramiteComponent,
    SolicitanteOctavaTemporalComponent,
    PaisProcendenciaComponent,
    PartidasDeLaComponent,
    RepresentacionComponent,
    TituloComponent,
    UsoEspicificoComponent,
    WizardComponent,
    HttpClientModule
  ]
})
export class OctavaTemporalModule { }
