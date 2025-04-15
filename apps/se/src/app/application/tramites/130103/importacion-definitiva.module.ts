import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { CriterioDeDictamenComponent } from './components/criterio-de-dictamen/criterio-de-dictamen.component';
import { DatosDeLaMercanciaComponent } from './components/datos-de-la-mercancia/datos-de-la-mercancia.component';
import { DatosDelTramiteRealizerComponent } from './components/datos-del-tramite-realizer/datos-del-tramite-realizer.component';
import { ImportacionDefinitivaRoutingModule } from './importacion-definitiva-routing.module';
import { NgModule } from '@angular/core';
import { PaisProcedenciaComponent } from './components/pais-procedencia/pais-procedencia.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PartidasDeLaMercanciaComponent } from './components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { PasoDosComponent } from '../120402/components/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../120402/components/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RepresentacionFederalComponent } from './components/representacion-federal/representacion-federal.component';
import { UsoEspecificoDeLaMercanciaComponent } from './components/uso-especifico-de-la-mercancia/uso-especifico-de-la-mercancia.component';


@NgModule({
  declarations: [
    PantallasComponent,
    PasoUnoComponent
  ],
  imports: [
    CommonModule,
    ImportacionDefinitivaRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    TituloComponent,
    AlertComponent,
    PasoTresComponent,
    PasoDosComponent,
    DatosDelTramiteRealizerComponent,
    DatosDeLaMercanciaComponent,
    PartidasDeLaMercanciaComponent,
    UsoEspecificoDeLaMercanciaComponent,
    CriterioDeDictamenComponent,
    PaisProcedenciaComponent,
    RepresentacionFederalComponent
  ]
})
export class ImportacionDefinitivaModule { }
