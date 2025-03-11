import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { EmpresaFronteraSolicitudRoutingModule } from './empresa-frontera-solicitud-routing.module';

import { EmpresaFronteraSolicitudComponent } from './pages/empresa-frontera-solicitud/empresa-frontera-solicitud';

import {AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { DatosEmpresaComponent } from './component/datos-empresa/datos-empresa.component';
import { PasoDosComponent } from './component/paso-dos/paso-dos.component';
import { PasoTresComponent } from './component/paso-tres/paso-tres.component';
import { SolicitanteComponent } from './component/solicitante/solicitante.component';


@NgModule({
  declarations: [DatosComponent,
    EmpresaFronteraSolicitudComponent,
],
  imports: [CommonModule, 
    EmpresaFronteraSolicitudRoutingModule,
    WizardComponent,
    TituloComponent,
    DatosEmpresaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent, 
    AlertComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    PasoDosComponent,
    PasoTresComponent 
  ],
})
export class EmpresaFronteraSolicitudModule {}
