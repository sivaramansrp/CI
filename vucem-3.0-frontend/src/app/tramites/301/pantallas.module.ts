/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';


import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { RegistroParaLaComponent } from './components/registro-para-la/registro-para-la.component';
import { InformacionDeLaComponent } from './components/informacion-de-la/informacion-de-la.component';
import { DeLaMuestraComponent } from './components/de-la-muestra/de-la-muestra.component';



@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
   
 
   
  ],
  imports: [
    CommonModule,
    PantallasRoutingModule,
    WizardComponent,
    NavComponent,
    SolicitanteComponent,PagoDeDerechosComponent,RegistroParaLaComponent,DeLaMuestraComponent, InformacionDeLaComponent
  ]
})
export class PantallasModule { }