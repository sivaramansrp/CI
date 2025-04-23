import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificacionPermisoMedsUsoRoutingModule } from './modificacion-permiso-meds-uso.routing.module';
import { ModificacionPermisoMedsUsoComponent } from './pages/modificacion-permiso-meds-uso/modificacion-permiso-meds-uso.component';

@NgModule({
  declarations: [ModificacionPermisoMedsUsoComponent],
  imports: [CommonModule, ModificacionPermisoMedsUsoRoutingModule],
})
export class ModificacionPermisoMedsUsoModule {}
