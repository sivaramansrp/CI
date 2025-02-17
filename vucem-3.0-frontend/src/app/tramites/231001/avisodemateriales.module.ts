import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';

import { AvisodematerialesRoutingModule } from './avisodemateriales-routing.module';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { DatosDelaComponent } from './components/datos-dela/datos-dela.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
// eslint-disable-next-line sort-imports




@NgModule({
  declarations: [
    SolicitanteComponent,
    DatosDelaComponent,
    DatosComponent,
    PantallasComponent,
    
    
  ],
  imports: [
    CommonModule,
    AvisodematerialesRoutingModule,
    ReactiveFormsModule,
    TituloComponent,
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvisodematerialesModule { }
