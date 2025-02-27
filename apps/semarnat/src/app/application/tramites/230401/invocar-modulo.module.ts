import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvocarModuloRoutingModule } from './invocar-modulo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasoCapturarSolicitudComponent } from './pages/paso-capturar-solicitud/paso-capturar-solicitud.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { SharedModule } from 'libs/shared/data-access-user/src/tramites/shared.module';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { PasoUnoCsComponent } from './pages/paso-uno-cs/paso-uno-cs.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { DatosSolicitudComponent } from './component/datos-solicitud/datos-solicitud.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { PagoDeDerechosComponent } from './component/pago-de-derechos/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoFirmarSolicitudComponent } from './pages/paso-firmar-solicitud/paso-firmar-solicitud.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { InvocarActionService } from 'libs/shared/data-access-user/src/core/services/230401/invocar-action.service';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    PasoCapturarSolicitudComponent,
    PasoUnoCsComponent,
    DatosSolicitudComponent,
    PagoDeDerechosComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoFirmarSolicitudComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    InvocarModuloRoutingModule,
    TituloComponent,
    WizardComponent,
    BtnContinuarComponent,
    CatalogoSelectComponent,
    SolicitanteComponent,
    AlertComponent,
    CrosslistComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent
  ],
  providers: [
    InvocarActionService,
    ToastrService
  ]
})
export class InvocarModuloModule { }
