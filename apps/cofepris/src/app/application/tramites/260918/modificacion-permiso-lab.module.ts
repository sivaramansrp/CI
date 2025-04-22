import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ModificacionPermisoLabComponent } from './pages/modificacion-permiso-lab/modificacion-permiso-lab.component';
import { ModificacionPermisoLabRoutingModule } from './modificacion-permiso-lab-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ModificacionPermisoLabComponent],
  imports: [CommonModule, ModificacionPermisoLabRoutingModule,WizardComponent,BtnContinuarComponent],
})
export class ModificacionPermisoLabModule {}
