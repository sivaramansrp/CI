import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoSanitarioRoutingModule } from './permiso-sanitario-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaComponent } from './components/datosDeLa/datosDeLa.component';

@NgModule({
  declarations: [PantallasComponent, DatosComponent],
  imports: [
    CommonModule, 
    PermisoSanitarioRoutingModule, 
    WizardComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    AlertComponent,
    DatosDeLaComponent,
  ],
})
export class PermisoSanitarioModule {}
