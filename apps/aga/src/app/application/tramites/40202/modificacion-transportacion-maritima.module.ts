import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificacionTransportacionMaritimaRoutingModule } from './modificacion-transportacion-maritima-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { AlertComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ModificarCaatMaritimoComponent } from './components/modificar-caat-maritimo/modificar-caat-maritimo.component';


@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
    PasoDosComponent
  ],
  imports: [
    CommonModule,
    ModificacionTransportacionMaritimaRoutingModule,
    BtnContinuarComponent,
    AlertComponent,
    WizardComponent,
    TituloComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    ModificarCaatMaritimoComponent
  ]
})
export class ModificacionTransportacionMaritimaModule { }
