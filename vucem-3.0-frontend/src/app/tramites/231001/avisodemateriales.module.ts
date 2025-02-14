import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PantallasComponent } from './pages/pantallas/pantallas.component';

import { AvisodematerialesRoutingModule } from './avisodemateriales-routing.module';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';

import { DatosComponent } from './pages/datos/datos.component';



@NgModule({
  declarations: [
    SolicitanteComponent,
  ],
  imports: [
    CommonModule,
    AvisodematerialesRoutingModule,
    PantallasComponent,
    DatosComponent
  ],
  exports:[
    DatosComponent,
    PantallasComponent
  ]
})
export class AvisodematerialesModule { }
