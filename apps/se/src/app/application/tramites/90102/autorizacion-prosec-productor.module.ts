import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizacionProsecProductorRoutingModule } from './autorizacion-prosec-productor-routing.module';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, InicioSesionService, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { ProsecComponent } from './pages/prosec/prosec.component';
import { SectoresYMercanciasComponent } from "../../shared/components/sectores-y-mercancias/sectores-y-mercancias.component";
import { DomiciliosDePlantasComponent } from './component/domicilios-de-plantas/domicilios-de-plantas.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    ProsecComponent,
  ],
  imports: [
    CommonModule,
    AutorizacionProsecProductorRoutingModule,
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    TituloComponent,
    WizardComponent,
    SectoresYMercanciasComponent,
    DomiciliosDePlantasComponent,
    ReactiveFormsModule,
],
  providers: [
    ToastrService,
    CatalogosService,
    InicioSesionService,
    provideHttpClient(),
    SubirDocumentoService,
  ],
})
export class AutorizacionProsecProductorModule { }
