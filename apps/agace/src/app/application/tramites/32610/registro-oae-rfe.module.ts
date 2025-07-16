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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroOaeRfeRoutingModule } from './registro-oae-rfe-routing.module';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { SolicitudDeRegistroInvocarService } from './services/solicitud-de-registro-invocar.service';
import { SolicitudPasoComponent } from './pages/solicitud-paso/solicitud-paso.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    SolicitudPasoComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    AlertComponent,
    CommonModule,
    RegistroOaeRfeRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    TercerosRelacionadosComponent
  ],
  providers: [
    ToastrService,
    provideHttpClient(),
    CatalogosService,
    InicioSesionService,
    SubirDocumentoService,
    ServiciosPantallaService,
    SolicitudDeRegistroInvocarService,
  ],
})
export class RegistroOaeRfeModule { }
