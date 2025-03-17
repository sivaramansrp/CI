/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @nx/enforce-module-boundaries */
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
// import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
// import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
// import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { InspeccionFisicaZoosanitarioRoutingModule } from './inspeccion-fisica-zoosanitario-routing.module';
import { InspeccionFisicaComponent } from './pages/inspeccion-fisica/inspeccion-fisica.component';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { SharedModule } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InspeccionFisicaZoosanitarioRoutingModule,
    SharedModule,
    BtnContinuarComponent,
    ReactiveFormsModule,
    TituloComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    SelectCatalogosComponent,
    SolicitanteComponent,
    InspeccionFisicaComponent
  ],
  providers: [ToastrService],
})

export class InspeccionFisicaZoosanitarioModule { }
