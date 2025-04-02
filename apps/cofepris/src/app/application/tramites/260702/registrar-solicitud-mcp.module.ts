import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarSolicitudMCPRoutingModule } from './registrar-solicitud-mcp-routing.module';
import { PasoUnoComponent } from '../260702/pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { PagoDeDerechosComponent } from '../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { ToastrService } from 'ngx-toastr';
import { DatosdelasolicitudComponent } from './components/datos-del/datos-de-la-solicitud.component';
import { PagodederechoComponent } from './components/pagodederechos/pago-de-derecho.component';
import { TercerosrelacionadosComponent } from './components/terceros relacionados/terceros-relacionados.component';
import { TramitesasociadosComponent } from './components/tramitesasociados/tramites-asociados..component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoCuatroComponent,
    RegistroPageComponent,
   
  ],
  imports: [
    DatosdelasolicitudComponent,
    PagodederechoComponent,
    TercerosrelacionadosComponent,
    TramitesasociadosComponent,
    PagoDeDerechosComponent,
    AnexarDocumentosComponent,
    SolicitanteComponent,
    WizardComponent,
    TituloComponent,
    AlertComponent,
    FirmaElectronicaComponent,
    BtnContinuarComponent,
    CommonModule,
    RegistrarSolicitudMCPRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[ToastrService]

})
export class RegistrarSolicitudMCPModule { }
