import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogosService,
  FirmaElectronicaComponent,
  InicioSesionService,
  SolicitanteComponent,
  SubirDocumentoService,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoExperimentalesPlaguicidasRoutingModule } from './permiso-experimentales-plaguicidas-routing.module';
import { PlaguicidasComponent } from './pages/plaguicidas/plaguicidas.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    PlaguicidasComponent,
  ],
  imports: [
    CommonModule,
    PermisoExperimentalesPlaguicidasRoutingModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
  ],
  providers: [
    ToastrService,
    CatalogosService,
    InicioSesionService,
    provideHttpClient(),
    SubirDocumentoService,
  ],
})
export class PermisoExperimentalesPlaguicidasModule {}
