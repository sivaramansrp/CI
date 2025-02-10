import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OctavaTemporralComponent } from './pages/octava-temporral/octava-temporral.component';
import { SolicitanteComponent } from './pages/solicitante/solicitante.component';
import { DatosComponent } from './pages/datos/datos.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { OctavaTemporralRoutingModule } from './octava-temporral-routing.module';
import { DetosGenDelComponent } from "./component/detos-gen-del/detos-gen-del.component";
import { DetosDelTramiteComponent } from "./component/detos-del-tramite/detos-del-tramite.component";
import { DetosDelLaComponent } from "./component/detos-del-la/detos-del-la.component";
import { PartidasDeLaComponent } from "./component/partidas-de-la/partidas-de-la.component";
import { UsoEspicificoComponent } from "./component/uso-espicifico/uso-espicifico.component";
import { CriterioDeDictComponent } from "./component/criterio-de-dict/criterio-de-dict.component";
import { PaisProcendenciaComponent } from "./component/pais-procendencia/pais-procendencia.component";
import { RepresentacionComponent } from "./component/representacion/representacion.component";
import { BtnContinuarComponent } from "../../shared/components/btn-continuar/btn-continuar.component";





@NgModule({
  declarations: [
    OctavaTemporralComponent,
    SolicitanteComponent,
    DatosComponent,
   
  ],
  imports: [
    CommonModule,
    WizardComponent,
    TituloComponent,
    OctavaTemporralRoutingModule,
    DetosGenDelComponent,
    DetosDelTramiteComponent,
    DetosDelLaComponent,
    PartidasDeLaComponent,
    UsoEspicificoComponent,
    CriterioDeDictComponent,
    PaisProcendenciaComponent,
    RepresentacionComponent,
    BtnContinuarComponent
]
})
export class OctavaTemporralModule { }
