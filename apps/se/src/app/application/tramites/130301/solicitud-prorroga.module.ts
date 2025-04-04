import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudProrrogaRoutingModule } from './solicitud-prorroga-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogosService,
  FirmaElectronicaComponent,
  InicioSesionService,
  SolicitanteComponent,
  SubirDocumentoService,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { DatosDelTramiteComponent } from './components/datos-del-tramite/datos-del-tramite.component';
import { PartidasDeLaMercanciaComponent } from './components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { CertificadoKimberleyComponent } from './components/certificado-kimberley/certificado-kimberley.component';
import { ProrrogasComponent } from './components/prorrogas/prorrogas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { SolicitudProrrogaService } from './services/solicitudProrroga/solicitud-prorroga.service';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    SolicitudProrrogaRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    SolicitudComponent,
    DatosDelTramiteComponent,
    PartidasDeLaMercanciaComponent,
    CertificadoKimberleyComponent,
    ProrrogasComponent,
    AlertComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    TituloComponent
  ],
  providers: [
    ToastrService,
    provideHttpClient(),
    CatalogosService,
    InicioSesionService,
    SubirDocumentoService,
    ServiciosPantallaService,
    SolicitudProrrogaService
  ],
})
export class SolicitudProrrogaModule {}
