import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SolicitarTransferenciaCuposRoutingModule } from './solicitar-transferencia-cupos-routing.module';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { SolicitanteComponent } from '@ng-mf/data-access-user';

import { TituloComponent } from '@ng-mf/data-access-user';

import { PasoSolicitanteComponent } from './pages/paso-solicitante/paso-solicitante.component';
import { SolicitarTransferenciaCuposMainComponent } from './pages/solicitar-transferencia-cupos-main/solicitar-transferencia-cupos-main.component';

import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { LicitacionesVigentesComponent } from './component/tramites/120501/component/licitaciones-vigentes/licitaciones-vigentes.component';

import { AlertComponent } from '@ng-mf/data-access-user';

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
    AlertComponent
  ]
})
export class SolicitarTransferenciaCuposModule { }
