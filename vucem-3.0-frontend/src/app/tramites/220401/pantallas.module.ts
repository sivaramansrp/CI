import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { DatosComponent } from './pages/datos/datos.component';
import { SolicitudComponent } from './pages/datos/solicitud/solicitud.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { DatosDelComponent } from './pages/datos/datos-del/datos-del.component';

@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent,
    SolicitudComponent,
    DatosDelComponent,
  ],
  imports: [
    CommonModule,
    PantallasRoutingModule,    
    NavComponent,
    WizardComponent,
  ]
})
export class PantallasModule { }
