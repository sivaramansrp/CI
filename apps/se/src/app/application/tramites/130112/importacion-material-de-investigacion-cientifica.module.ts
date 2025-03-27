import { AlertComponent, BtnContinuarComponent, CrosslistComponent, InputRadioComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDeLaMercanciaComponent } from '../../shared/components/datos-de-la-mercancia/datos-de-la-mercancia.component';
import { DatosDelTramiteComponent } from '../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { ImportacionMaterialDeInvestigacionCientificaRoutingModule } from './importacion-material-de-investigacion-cientifica-routing.module';

import { ImportacionMaterialDeInvestigacionCientificaComponent } from './pages/importacion-material-de-investigacion-cientifica/importacion-material-de-investigacion-cientifica.component';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { PasoTresComponent } from '../120402/components/paso-tres/paso-tres.component';

import { PasoDosComponent } from '../120402/components/paso-dos/paso-dos.component';

import { PaisProcendenciaComponent } from '../../shared/components/pais-procendencia/pais-procendencia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentacionComponent } from '../../shared/components/representacion/representacion.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { PartidasDeLaMercanciaComponent } from './components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
@NgModule({
  declarations: [
    ImportacionMaterialDeInvestigacionCientificaComponent,
    PasoUnoComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    ImportacionMaterialDeInvestigacionCientificaRoutingModule,
    WizardComponent,
    AlertComponent,
    BtnContinuarComponent,
    TituloComponent,
    InputRadioComponent,
    SolicitanteComponent,
    ReactiveFormsModule,
    PasoTresComponent,
    PasoDosComponent,
    DatosDelTramiteComponent,
    DatosDeLaMercanciaComponent,
    PartidasDeLaMercanciaComponent ,
    TablaDinamicaComponent,
    PaisProcendenciaComponent,
    RepresentacionComponent,
    CrosslistComponent
  ]
})
export class ImportacionMaterialDeInvestigacionCientificaModule { }
