import {
  AlertComponent,
  AnexarDocumentosComponent,
  CatalogoSelectComponent,
  NotificacionesComponent,
  TablaDinamicaComponent,
} from '@ng-mf/data-access-user';
import { PasoCargaDocumentoComponent,PasoFirmaComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { EmpresasTerciarizadasComponent } from './components/empresas-terciarizadas/empresas-terciarizadas.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroExpansionComponent } from './pages/registro-expansion/registro-expansion.component';
import { RegistroExpansionRoutingModule } from './registro-expansion-routing.module';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitarTransferenciaCuposModule } from '../120501/solicitar-transferencia-cupos.module';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
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
    SolicitarTransferenciaCuposModule,
    TablaDinamicaComponent,
    NotificacionesComponent
  ],
  exports: [PasoUnoComponent,PasoFirmaComponent,PasoCargaDocumentoComponent],
  providers: [registroSolicitudImmexService, ToastrService],
})
export class RegistroExpansionModule {}
