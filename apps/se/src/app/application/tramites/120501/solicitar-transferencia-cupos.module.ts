import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { LicitacionesVigentesComponent } from './component/licitaciones-vigentes/licitaciones-vigentes.component';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from '../120402/components/paso-dos/paso-dos.component';
import { PasoSolicitanteComponent } from './pages/paso-solicitante/paso-solicitante.component';
import { PasoTresComponent } from '../120402/components/paso-tres/paso-tres.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitarTransferenciaCuposMainComponent } from './pages/solicitar-transferencia-cupos-main/solicitar-transferencia-cupos-main.component';
import { SolicitarTransferenciaCuposRoutingModule } from './solicitar-transferencia-cupos-routing.module';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    PasoSolicitanteComponent,
    SolicitarTransferenciaCuposMainComponent,
    
    
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
    PasoTresComponent,
    PasoDosComponent

  ],
  exports: [TablaDinamicaComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ToastrService]
})
export class SolicitarTransferenciaCuposModule { }
