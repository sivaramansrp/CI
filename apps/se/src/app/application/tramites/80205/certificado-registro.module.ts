import { AmpliacionServiciosComponent } from './components/ampliacion-servicios/ampliacion-servicios.component';
import { CertificadoRegistro } from './certificado-registro-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputHoraComponent, SelectPaisesComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';

/**
 * @fileoverview Módulo para el registro de certificados zoosanitarios.
 * Este módulo declara y exporta los componentes necesarios para el registro de certificados,
 * incluyendo los pasos del asistente y otros componentes compartidos.
 * @module CertificadoRegistroModule --80205
 */

/**
 * Módulo para el registro de certificados zoosanitarios.
 * @class CertificadoRegistroModule --80205
 */
@NgModule({
  declarations: [
    PasoDosComponent,
    PasoCuatroComponent,
    PasoTresComponent,
    PasoUnoComponent,
    RegistroPageComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    CertificadoRegistro,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    CrosslistComponent,
    InputCheckComponent,
    AlertComponent,
    InputFechaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    CatalogoSelectComponent,
    AmpliacionServiciosComponent,
  ]
})
export class CertificadoRegistroModule { }