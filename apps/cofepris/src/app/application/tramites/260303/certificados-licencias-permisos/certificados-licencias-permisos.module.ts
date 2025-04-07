import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CertificadosLicenciasPermisosRoutingModule } from './certificados-licencias-permisos-routing.module';
import { CertificadosLicenciasPermisosService } from '../services/certificados-licencias-permisos.service';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { FabricanteModalComponent } from '../components/fabricante-modal/fabricante-modal.component';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from '../components/pago-de-derechos/pago-de-derechos.component';
import { PasoCuatroComponent } from '../pages/paso-cuatro/paso-cuatro.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { TercerosRelacionadosComponent } from '../components/terceros-relacionados/terceros-relacionados.component';
import { TodospasosComponent } from '../pages/todospasos/todospasos.component';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [TodospasosComponent,PasoUnoComponent,PasoCuatroComponent],
  imports: [
    CommonModule,
    CertificadosLicenciasPermisosRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    PagoDeDerechosComponent,
    TercerosRelacionadosComponent,
    AlertComponent,
    FabricanteModalComponent,
    AnexarDocumentosComponent,
    ToastrModule.forRoot(),
    FirmaElectronicaComponent
],
providers: [
  BsModalService,
  provideHttpClient(),
  CertificadosLicenciasPermisosService,
  CatalogosService,
  ToastrService,
  InicioSesionService,
  SubirDocumentoService
]
}) 
export class CertificadosLicenciasPermisosModule { }
