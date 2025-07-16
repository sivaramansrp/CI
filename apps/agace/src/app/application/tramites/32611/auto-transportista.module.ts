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
import { AutoTransportistaComponent } from './components/auto-transportista/auto-transportista.component';
import { AutoTransportistaRoutingModule } from './auto-transportista-routing.module';
import { CommonModule } from '@angular/common';
import { DatosComunesComponent } from './components/datos-comunes/datos-comunes.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { Solocitud32611Service } from './services/service32611.service';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
 declarations: [
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
   ],
    imports: [
   AlertComponent,
    CommonModule,
    AutoTransportistaRoutingModule,
    AutoTransportistaComponent,
    DatosComunesComponent,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    TercerosRelacionadosComponent
  ],
  providers: [
    ToastrService,
    provideHttpClient(),
    CatalogosService,
    InicioSesionService,
    SubirDocumentoService,
    Solocitud32611Service
  ],
})
export class AutoTransportistaModule {}
