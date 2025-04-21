import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';


import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';

import { NgModule } from '@angular/core';

import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';

import { ZoosanitarioParaImportacionComponent } from './pages/zoosanitario-para-importacion/zoosanitario-para-importacion.component';
import { ZoosanitarioParaImportacionRoutingModule } from './zoosanitario-para-importacion-routing.module';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';


@NgModule({
  declarations: [    
    DatosComponent,FirmarSolicitudComponent,ZoosanitarioParaImportacionComponent,PasoDosComponent
  ],
  imports: [
    CommonModule,AlertComponent,AnexarDocumentosComponent,
    ZoosanitarioParaImportacionRoutingModule,
    BtnContinuarComponent,   
    TituloComponent,
    WizardComponent,FirmaElectronicaComponent,
    SolicitanteComponent
  ],
  providers: [
    ToastrService
  ]
})
export class ZoosanitarioParaImportacionModule { }
