import { CommonModule } from '@angular/common';
import { CuposRoutingModule } from './cupos-routing.module';
import { NgModule } from '@angular/core';

import { AlertComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosComponent } from './pages/datos/datos.component';
import { ExpedicionCertificadosAsignacionDirectaComponent } from '../../shared/components/expedicion-certificados-asignacion-directa/expedicion-certificados-asignacion-directa.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';


@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
    PasoDosComponent
  ],
  imports: [
    CommonModule,
    CuposRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    AlertComponent,
    ExpedicionCertificadosAsignacionDirectaComponent
  ]
})
export class CuposModule { }
