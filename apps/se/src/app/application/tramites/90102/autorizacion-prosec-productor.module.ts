import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, InicioSesionService, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AutorizacionProsecProductorRoutingModule } from './autorizacion-prosec-productor-routing.module';
import { CommonModule } from '@angular/common';
import { DomiciliosDePlantasComponent } from './component/domicilios-de-plantas/domicilios-de-plantas.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ProsecComponent } from './pages/prosec/prosec.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SectoresYMercanciasComponent } from "../../shared/components/sectores-y-mercancias/sectores-y-mercancias.component";
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';


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
