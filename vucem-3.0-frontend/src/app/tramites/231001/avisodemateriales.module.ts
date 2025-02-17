import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';

import { AvisodematerialesRoutingModule } from './avisodemateriales-routing.module';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { DatosDelaComponent } from './components/datos-dela/datos-dela.component';
import { CatalogoSelectComponent } from '../../shared/components/catalogo-select/catalogo-select.component';

import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
@NgModule({
  declarations: [
    SolicitanteComponent,
    DatosDelaComponent,
  ],
  imports: [
    CommonModule,
    AvisodematerialesRoutingModule,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ]
})
export class AvisodematerialesModule { }
