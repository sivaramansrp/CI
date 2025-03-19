import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TerritorioNacionalSolicitudeRoutingModule } from './territorio-nacional-solicitude-routing.module';

import {
  BtnContinuarComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { FormsModule } from '@angular/forms';
import { TerritorioNacionalSolicitudeComponent } from './pages/territorio-nacional-solicitude/territorio-nacional-solicitude.component';

import { DatosTerritorioComponent } from './pages/datos-territorio.component/datos-territorio.component';

import { DatosDelSolicitudeComponent } from './components/datos-del-solicitude/datos-del-solicitude.component';

@NgModule({
  declarations: [
    TerritorioNacionalSolicitudeComponent,
    DatosTerritorioComponent,
  ],
  imports: [
    WizardComponent,
    BtnContinuarComponent,
    CommonModule,
    FormsModule,
    TerritorioNacionalSolicitudeRoutingModule,
    DatosDelSolicitudeComponent
  ],
})
export class TerritorioNacionalSolicitudeModule {}
