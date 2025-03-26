import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidarInicalmenteRoutingModule } from './validar-inicalmente-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import {
  AlertComponent,
  BtnContinuarComponent,
  CatalogosService,
  FirmaElectronicaComponent,
  InicioSesionService,
  SolicitanteComponent,
  SubirDocumentoService,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { CertificadoOrigenComponent } from './components/certificado-origen/certificado-origen.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { DatosCertificadoComponent } from './components/datosCertificado/datosCertificado.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { ValidarInicalmenteService } from './services/validar-inicalmente/validar-inicalmente.service';

@NgModule({
  declarations: [SolicitudPageComponent, PasoUnoComponent, PasoDosComponent],
  imports: [
    CommonModule,
    ValidarInicalmenteRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    CertificadoOrigenComponent,
    AlertComponent,
    DestinatarioComponent,
    DatosCertificadoComponent,
    FirmaElectronicaComponent
  ],
  providers: [
    ToastrService,
    provideHttpClient(),
    CatalogosService,
    InicioSesionService,
    SubirDocumentoService,
    ServiciosPantallaService,
    ValidarInicalmenteService
  ],
})
export class ValidarInicalmenteModule {}
