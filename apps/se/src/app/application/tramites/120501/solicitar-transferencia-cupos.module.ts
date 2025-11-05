import { AlertComponent, BtnContinuarComponent, FirmaElectronicaComponent, PasoFirmaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent, CatalogoSelectComponent, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { LicitacionesVigentesComponent } from './component/licitaciones-vigentes/licitaciones-vigentes.component';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { PasoSolicitanteComponent } from './pages/paso-solicitante/paso-solicitante.component';
import { SolicitarTransferenciaCuposMainComponent } from './pages/solicitar-transferencia-cupos-main/solicitar-transferencia-cupos-main.component';
import { SolicitarTransferenciaCuposRoutingModule } from './solicitar-transferencia-cupos-routing.module';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    PasoSolicitanteComponent,
    SolicitarTransferenciaCuposMainComponent
  ],
  imports: [
    CommonModule,
    SolicitarTransferenciaCuposRoutingModule,
    WizardComponent,
    TituloComponent,
    LicitacionesVigentesComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    PasoFirmaComponent
  ],
  exports: [TablaDinamicaComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ToastrService]
})
export class SolicitarTransferenciaCuposModule { }
