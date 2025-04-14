import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, SharedModule, SolicitanteComponent, TituloComponent, TramiteFolioService, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaService } from './service/consulta.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacinadosComponent } from './components/terceros-relacinados/terceros-relacinados.component';
import { TramitesAsociadosComponent } from './components/tramites-asociados/tramites-asociados.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

/**
 * Módulo para el feature de Consulta.
 *
 * Este módulo agrupa las rutas, formularios reactivos y módulos compartidos necesarios para el
 * feature de consulta. Además, provee los servicios requeridos en este feature.
 */
@NgModule({
  declarations: [PasoUnoComponent, SolicitudPageComponent, PasoDosComponent, PasoTresComponent,],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    PagoDeDerechosComponent,
    TercerosRelacinadosComponent,
    TramitesAsociadosComponent,
    TituloComponent,
    WizardComponent,
    CommonModule,
    BtnContinuarComponent,
    FormsModule,
    CommonModule,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    ReactiveFormsModule,
    AlertComponent,
    FirmaElectronicaComponent
  ],
  providers: [
    ToastrService,
    CatalogosService,
    TramiteFolioService,
    ConsultaService,
  ],
})
export class ConsultaModule { }
