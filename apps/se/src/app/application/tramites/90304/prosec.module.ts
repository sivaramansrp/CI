import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProsecRoutingModule } from './prosec-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ModificacionComponent } from './components/modificacion/modificacion.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';


@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  imports: [
    CommonModule,
    ProsecRoutingModule,
    TituloComponent,
    AlertComponent,
    BtnContinuarComponent,
    WizardComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    ModificacionComponent,
    BitacoraComponent
  ]
})
export class ProsecModule { }
