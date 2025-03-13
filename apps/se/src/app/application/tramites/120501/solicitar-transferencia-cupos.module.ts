import { NgModule } from '@angular/core';

import { NO_ERRORS_SCHEMA} from '@angular/core';

import { CommonModule } from '@angular/common';
import { SolicitarTransferenciaCuposRoutingModule } from './solicitar-transferencia-cupos-routing.module';

import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';


import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { WizardComponent } from '@ng-mf/data-access-user';

import { SolicitanteComponent } from '@ng-mf/data-access-user';

import { TituloComponent } from '@ng-mf/data-access-user';

import { PasoSolicitanteComponent } from './pages/paso-solicitante/paso-solicitante.component';
import { SolicitarTransferenciaCuposMainComponent } from './pages/solicitar-transferencia-cupos-main/solicitar-transferencia-cupos-main.component';

import { BtnContinuarComponent } from '@ng-mf/data-access-user';

import { LicitacionesVigentesComponent } from './component/licitaciones-vigentes/licitaciones-vigentes.component';

import { AlertComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { PasoTresComponent } from '../120402/components/paso-tres/paso-tres.component';
import { PasoDosComponent } from '../120402/components/paso-dos/paso-dos.component';

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
