/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisoDeImportacionRoutingModule } from './aviso-de-importacion-routing.module';
import {
  BtnContinuarComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { SolicitudeComponent } from './pages/solicitude/solicitude.component';
import { DatosPageComponent } from './pages/datos-page/datos-page.component';

@NgModule({
  declarations: [SolicitudeComponent, DatosPageComponent],
  imports: [
    CommonModule,
    AvisoDeImportacionRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
  ],
})
export class AvisoDeImportacionModule {}
