import { NgModule } from '@angular/core';

import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CapturarSolicitudComponent } from './pages/capturar-solicitud/capturar-solicitud.component';
import { CommonModule } from '@angular/common';

import { CertificadoSGPRoutingModule } from './certificado-sgp-routing.module';
import { DatosDelCertificadoComponent } from "./components/datos-del-certificado/datos-del-certificado.component";
import { DetallesDelTransporteComponent } from './components/detalles-del-transporte/detalles-del-transporte.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';



@NgModule({
  declarations: [
    SolicitudPageComponent,
    CapturarSolicitudComponent,
    FirmarSolicitudComponent
  ],
  imports: [
    CommonModule,
    CertificadoSGPRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    DetallesDelTransporteComponent,
    TransporteComponent,
    FirmaElectronicaComponent,
    BtnContinuarComponent,
    DatosDelCertificadoComponent
],
})
export class CertificadoSGPModule {}
