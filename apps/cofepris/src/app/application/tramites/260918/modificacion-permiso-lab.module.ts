import { CommonModule } from '@angular/common';
import { ModificacionPermisoLabComponent } from './pages/modificacion-permiso-lab/modificacion-permiso-lab.component';
import { ModificacionPermisoLabRoutingModule } from './modificacion-permiso-lab-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ModificacionPermisoLabComponent],
  imports: [CommonModule, ModificacionPermisoLabRoutingModule],
})
export class ModificacionPermisoLabModule {}
