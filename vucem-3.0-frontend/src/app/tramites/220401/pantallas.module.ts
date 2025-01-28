import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { DatosDelComponent } from './components/datos-del/datos-del.component';
import { TransporteComponent } from './pages/transporte/transporte.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent,
    TransporteComponent
  ],
  imports: [
    CommonModule,
    PantallasRoutingModule,    
    NavComponent,
    WizardComponent,
    TituloComponent,
    SolicitudComponent,
    DatosDelComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PantallasModule { }
