import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ImportacionDeVehiculosUsadosRoutingModule } from './importacion-de-vehiculos-usados-routing.module';

import { ImportacionDeVehiculosUsadosComponent } from './pages/importacion-de-vehiculos-usados/importacion-de-vehiculos-usados.component';
import { PasoTresComponent } from '../120402/components/paso-tres/paso-tres.component';

import { PasoDosComponent } from '../120402/components/paso-dos/paso-dos.component';

import { BtnContinuarComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { PartidasDeLaComponent } from '../../shared/components/partidas-de-la/partidas-de-la.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';

@NgModule({
  declarations: [
    ImportacionDeVehiculosUsadosComponent,
    PasoUnoComponent,
  ],
  imports: [
    CommonModule,
    ImportacionDeVehiculosUsadosRoutingModule,
    PasoTresComponent,
    PasoDosComponent,
    WizardComponent,
    BtnContinuarComponent,
    TituloComponent,
    SolicitanteComponent,
    PartidasDeLaComponent,
    SolicitudComponent
  ]
})
export class ImportacionDeVehiculosUsadosModule { }
