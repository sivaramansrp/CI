import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, SharedModule, SolicitanteComponent, TituloComponent, TramiteFolioService, WizardComponent } from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaService } from './service/consulta.service';
import { DatosdelasolicitudComponent } from '../../shared/components/shared2607/datos-del/datos-de-la-solicitud.component';
import { NgModule } from '@angular/core';
import { PagoDeDerechoComponent } from '../../shared/components/shared2607/pagodederechos/pago-de-derecho.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosrelacionadosComponent } from '../../shared/components/shared2607/terceros relacionados/terceros-relacionados.component';
import { ToastrService } from 'ngx-toastr';
import { TramitesAsociadosComponent } from '../../shared/components/shared2607/tramitesasociados/tramites-asociados.component';
/**
 * Módulo para el feature de Consulta.
 *
 * Este módulo agrupa las rutas, formularios reactivos y módulos compartidos necesarios para el
 * feature de consulta. Además, provee los servicios requeridos en este feature.
 */
@NgModule({
  declarations: [PasoUnoComponent, SolicitudPageComponent, PasoDosComponent, PasoTresComponent],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SolicitanteComponent,
    DatosdelasolicitudComponent,
    PagoDeDerechoComponent,
    TercerosrelacionadosComponent,
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
