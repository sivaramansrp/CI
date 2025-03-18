import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerritorioNacionalSolicitudeRoutingModule } from './territorio-nacional-solicitude-routing.module';
import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { FormsModule } from '@angular/forms';
import { TerritorioNacionalSolicitudeComponent } from './pages/territorio-nacional-solicitude/territorio-nacional-solicitude.component';


@NgModule({
  declarations: [
    TerritorioNacionalSolicitudeComponent
  ],
  imports: [
    WizardComponent, BtnContinuarComponent, CommonModule,FormsModule,
    TerritorioNacionalSolicitudeRoutingModule
  ]
})
export class TerritorioNacionalSolicitudeModule { }
