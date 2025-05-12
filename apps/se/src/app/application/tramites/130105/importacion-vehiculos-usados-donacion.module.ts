import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ImportacionVehiculosUsadosDonacionRoutingModule } from './importacion-vehiculos-usados-donacion-routing.module';

import { ImportacionVehiculosUsadosDonacionComponent } from './pages/importacion-vehiculos-usados-donacion/importacion-vehiculos-usados-donacion.component';
import { PasoTresComponent } from '../120402/components/paso-tres/paso-tres.component';

import { BtnContinuarComponent, CrosslistComponent, InputRadioComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosDeLaMercanciaComponent } from '../../shared/components/datos-de-la-mercancia/datos-de-la-mercancia.component';
import { DatosDelTramiteComponent } from '../../shared/components/datos-del-tramite/datos-del-tramite.component';

import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';


import { PasoDosComponent } from '../120402/components/paso-dos/paso-dos.component';

import { PaisProcendenciaComponent } from '../../shared/components/pais-procendencia/pais-procendencia.component';
import { PartidasDeLaMercanciaComponent } from '../../shared/components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentacionComponent } from '../../shared/components/representacion/representacion.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';

@NgModule({
  declarations: [
    ImportacionVehiculosUsadosDonacionComponent,
    PasoUnoComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    ImportacionVehiculosUsadosDonacionRoutingModule,
    WizardComponent,
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
export class ImportacionVehiculosUsadosDonacionModule { }
