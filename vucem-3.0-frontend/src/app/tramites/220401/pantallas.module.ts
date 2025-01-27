import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';
import { SolicitudComponent } from './pages/datos/solicitud/solicitud.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { DatosDelComponent } from './pages/datos/datos-del/datos-del.component';
import { CombinacionRequeridaComponent } from './pages/datos/combinacion-requerida/combinacion-requerida.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PantallasRoutingModule,
    PantallasComponent
  ]
})
export class PantallasModule { }
