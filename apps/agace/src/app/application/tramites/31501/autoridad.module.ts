/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent, AnexarDocumentosComponent, FirmaElectronicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AntecesorRoutingModule } from './autoridad-routing.module';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { AutoridadService } from './services/autoridad.service';
import { RequirementoComponent } from './components/requiremento/requiremento.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { CapturarElTextoLibreComponent } from './pages/capturar-el-texto-libre/capturar-el-texto-libre.component';

@NgModule({
  declarations: [
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent
    ],
  imports: [
    CapturarElTextoLibreComponent,
    CommonModule,
    SolicitanteComponent,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    PasoUnoComponent,
    RequirementoComponent,
    AntecesorRoutingModule,
    WizardComponent,
    FirmaElectronicaComponent,
    RequirementoComponent,
    TituloComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    BtnContinuarComponent,
    ToastrModule.forRoot(),
  ],
  providers: [
    AutoridadService,
    ServiciosPantallaService,
    provideHttpClient(),
    ToastrService,
    BsModalService
  ]
})

/**
 * Este módulo se utiliza para configurar los componentes del módulo 31601.
 * Importar los componentes del módulo.
 */
export class AutoridadModule {}
