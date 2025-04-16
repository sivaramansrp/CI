import { CommonModule } from '@angular/common';

import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  FirmaElectronicaComponent,
  SolicitanteComponent,
  TituloComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { CertificadosComponent } from './components/certificados/certificados.component';
import { CertificadosService } from './services/certificados.service';
import { Datos250101Component } from './pages/datos-250101/datos-250101.component';
import { DestinatarioAgenteAduanalComponent } from './components/destinatario-agente-aduanal/destinatario-agente-aduanal.component';
import { DestinatarioService } from './services/destinatario.service';
import { FloraFaunaComponent } from './pages/flora-fauna/flora-fauna.component';
import { FloraFaunaRoutingModule } from './flora-fauna-routing.module';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitanteService } from '@ng-mf/data-access-user';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { TipoMovimientoComponent } from './components/tipo-movimiento/tipo-movimiento.component';
import { TipoMovimientoService } from './services/tipo-movimiento.service';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [FloraFaunaComponent, Datos250101Component, PasoDosComponent,PasoTresComponent],
  imports: [
    CommonModule,
    AlertComponent,
    FloraFaunaRoutingModule,
    WizardComponent,
    TituloComponent,
    CertificadosComponent,
    TipoMovimientoComponent,
    DestinatarioAgenteAduanalComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent
  ],
  providers: [
    provideHttpClient(),
    ToastrService,
    TipoMovimientoService,
    CertificadosService,
    DestinatarioService,
    SolicitanteService,
    InicioSesionService,
    SubirDocumentoService,
  ],
})
export class FloraFaunaModule {}
