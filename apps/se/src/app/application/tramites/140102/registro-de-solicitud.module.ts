import { BtnContinuarComponent, InicioSesionService, SubirDocumentoService } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { CancelacionDeAutorizacionesComponent } from './components/cancelacion-autorizaciones/cancelacion-autorizaciones.component';
import { CancelacionDeAutorizacionesService } from './services/cancelacion-de-autorizaciones.service';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { RegistroDeSolicitudRoutingModule } from './registro-de-solicitud-routing.module';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@libs/shared/data-access-user/src';
@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    RegistroDeSolicitudRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    CancelacionDeAutorizacionesComponent,
    SolicitanteComponent,
    InputCheckComponent,
    TituloComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    FirmaElectronicaComponent
  ],
  providers: [
    ToastrService,
    InicioSesionService,
    SubirDocumentoService,
    CancelacionDeAutorizacionesService
  ],
})
export class RegistroDeSolicitudModule { }
