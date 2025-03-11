import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoSanitarioRoutingModule } from './permiso-sanitario-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosComponent } from './pages/datos/datos.component';

@NgModule({
  declarations: [PantallasComponent, DatosComponent],
  imports: [
    CommonModule, 
    PermisoSanitarioRoutingModule, 
    WizardComponent,
    SolicitanteComponent,
    BtnContinuarComponent
  ],
})
export class PermisoSanitarioModule {}
