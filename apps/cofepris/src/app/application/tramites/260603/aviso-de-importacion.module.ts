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
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { TercerosRelaciondosComponent } from './components/terceros-relaciondos/terceros-relaciondos.component';
import { provideHttpClient } from '@angular/common/http';
import { DatosService } from './services/datos.service';

@NgModule({
  declarations: [SolicitudeComponent, DatosPageComponent],
  imports: [
    CommonModule,
    AvisoDeImportacionRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    TercerosRelaciondosComponent
  ],
  providers: [provideHttpClient(),DatosService],
})
export class AvisoDeImportacionModule {}
