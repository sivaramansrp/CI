/**
 * @module ImmexRegistroDeSolicitudModalityModule
 * @description Módulo para el registro de solicitud IMMEX modalidad ampliación subsecuente sensibles.
 * Incluye la configuración de rutas y la declaración de componentes.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, FirmaElectronicaComponent, SelectCatalogosComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from "@ng-mf/data-access-user";
import { ImmexRegistroSolicitudModalityComponent } from './pages/immex-registro-solicitud-modality/immex-registro-solicitud-modality.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';

import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';

import { ImmexRegistroDeSolicitudModalityRoutingModule } from './immex-registro-de-solicitud-modality-routing.module';
import { Anexo1Component } from './components/anexo-1/anexo-1.component';

import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    PasoDosComponent,
    PasoTresComponent,
    PasoUnoComponent,
    PasoCuatroComponent,
    ImmexRegistroSolicitudModalityComponent,
  ],
  imports: [
    CommonModule,
    ImmexRegistroDeSolicitudModalityRoutingModule,
    CommonModule,
    WizardComponent,
    SharedModule,
    BtnContinuarComponent,
    ReactiveFormsModule,
    TituloComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    CatalogoSelectComponent,
    Anexo1Component,
    TablaDinamicaComponent,
    SelectCatalogosComponent,
    SolicitanteComponent
  ],
  providers: [ToastrService],
})
export class ImmexRegistroDeSolicitudModalityModule { }
