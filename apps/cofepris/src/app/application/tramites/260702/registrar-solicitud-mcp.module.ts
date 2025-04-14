import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { WizardComponent } from '@libs/shared/data-access-user/src';

import { DatosdelasolicitudComponent } from './components/datos-del/datos-de-la-solicitud.component';
import { PagoDeDerechoComponent } from './components/pagodederechos/pago-de-derecho.component';
import { RegistrarSolicitudMCPRoutingModule } from './registrar-solicitud-mcp-routing.module';
import { RegistrarSolicitudMcpService } from './services/registrar-solicitud-mcp.service';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { TercerosrelacionadosComponent } from './components/terceros relacionados/terceros-relacionados.component';
import { ToastrService } from 'ngx-toastr';
import { TramitesAsociadosComponent } from './components/tramitesasociados/tramites-asociados.component';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../260702/pages/paso-uno/paso-uno.component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    RegistroPageComponent,
  ],
  imports: [
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    CommonModule,
    DatosdelasolicitudComponent,
    FirmaElectronicaComponent,
    InputFechaComponent,
    PagoDeDerechoComponent,
    RegistrarSolicitudMCPRoutingModule,
    SolicitanteComponent,
    TercerosrelacionadosComponent,
    TituloComponent,
    TramitesAsociadosComponent,
    WizardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ToastrService, RegistrarSolicitudMcpService],
})
export class RegistrarSolicitudMCPModule {}
