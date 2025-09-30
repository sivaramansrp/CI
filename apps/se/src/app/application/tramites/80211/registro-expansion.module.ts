import { 
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogoSelectComponent,
  FirmaElectronicaComponent,
  NotificacionesComponent,
  SolicitanteComponent,
  TablaDinamicaComponent,
  TituloComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasoCargaDocumentoComponent, PasoFirmaComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { EmpresasTerciarizadasComponent } from './components/empresas-terciarizadas/empresas-terciarizadas.component';
import { NgModule } from '@angular/core';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroExpansionComponent } from './pages/registro-expansion/registro-expansion.component';
import { RegistroExpansionRoutingModule } from './registro-expansion-routing.module';
import { registroSolicitudImmexService } from './services/registro-expansion.service';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    RegistroExpansionComponent,
    EmpresasTerciarizadasComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasoCargaDocumentoComponent,
    RegistroExpansionRoutingModule,
    PasoFirmaComponent,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    FormsModule,
    AlertComponent,
    AnexarDocumentosComponent,
    ToastrModule.forRoot(),
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    NotificacionesComponent
  ],
  exports: [PasoUnoComponent,PasoFirmaComponent,PasoCargaDocumentoComponent],
  providers: [registroSolicitudImmexService, ToastrService],
})
export class RegistroExpansionModule {}
