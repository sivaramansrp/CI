import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OctavaTemporralRoutingModule } from './octava-temporral-routing.module';

import { CriterioDeDictComponent } from './component/criterio-de-dict/criterio-de-dict.component';
import { DetosDelLaComponent } from './component/detos-del-la/detos-del-la.component';
import { DetosDelTramiteComponent } from './component/detos-del-tramite/detos-del-tramite.component';
import { DetosGenDelComponent } from './component/detos-gen-del/detos-gen-del.component';
import { PaisProcendenciaComponent } from './component/pais-procendencia/pais-procendencia.component';
import { PartidasDeLaComponent } from './component/partidas-de-la/partidas-de-la.component';
import { RepresentacionComponent } from './component/representacion/representacion.component';
import { UsoEspicificoComponent } from './component/uso-espicifico/uso-espicifico.component';

import { DatosComponent } from './pages/datos/datos.component';

import { OctavaTemporralComponent } from './pages/octava-temporral/octava-temporral.component';
import { SolicitanteComponent } from './pages/solicitante/solicitante.component';

import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    OctavaTemporralComponent,
    SolicitanteComponent,
    DatosComponent,
  ],
  imports: [
    CommonModule,
    OctavaTemporralRoutingModule,
    BtnContinuarComponent,
    CriterioDeDictComponent,
    DetosDelLaComponent,
    DetosDelTramiteComponent,
    DetosGenDelComponent,
    PaisProcendenciaComponent,
    PartidasDeLaComponent,
    RepresentacionComponent,
    TituloComponent,
    UsoEspicificoComponent,
    WizardComponent,
    HttpClientModule
  ]
})
export class OctavaTemporralModule { }
