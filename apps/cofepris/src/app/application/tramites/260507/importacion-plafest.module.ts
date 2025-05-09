import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ImportacionPlafestRoutingModule } from './importacion-plafest-routing.module';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';


@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  imports: [
    CommonModule,
    ImportacionPlafestRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    TercerosRelacionadosComponent,
    PagoDeDerechosComponent
  ]
})
export class ImportacionPlafestModule { }
