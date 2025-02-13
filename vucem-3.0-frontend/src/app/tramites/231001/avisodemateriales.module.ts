import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';

import { AvisodematerialesRoutingModule } from './avisodemateriales-routing.module';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { DatosComponent } from './components/datos/datos.component';


@NgModule({
  declarations: [
    SolicitanteComponent,
    DatosComponent
  ],
  imports: [
    CommonModule,
    AvisodematerialesRoutingModule
  ]
})
export class AvisodematerialesModule { }
