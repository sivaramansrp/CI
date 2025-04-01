import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, InicioSesionService, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CertificadosRoutingModule } from './certificados-routing.module';
import { TodospasosComponent } from '../pages/todospasos/todospasos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from '../pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../pages/paso-tres/paso-tres.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { SanitarioService } from '../../260211/services/sanitario.service';
import { CertificadosLicenciasService } from '../services/certificados-licencias.service';
import { TramitesAsociadosComponent } from '../components/tramites-asociados/tramites-asociados.component';
import { PagoDeDerechosComponent } from '../components/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosComponent } from '../components/terceros-relacionados/terceros-relacionados.component';


@NgModule({
  declarations: [TodospasosComponent,PasoUnoComponent,PasoDosComponent,PasoTresComponent],
  imports: [
    CommonModule,
    CertificadosRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    TramitesAsociadosComponent,
    PagoDeDerechosComponent,
    TercerosRelacionadosComponent,
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService,
    provideHttpClient(),
    CatalogosService,
    InicioSesionService,
    SubirDocumentoService,
    CertificadosLicenciasService,
    SanitarioService
  ],
})
export class CertificadosModule { }
