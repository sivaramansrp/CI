import { ControlPermisosPreviosExportacionComponent } from './pages/control-permisos-previos-exportacion/control-permisos-previos-exportacion.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'control-permisos-previos-exportacion',
    component: ControlPermisosPreviosExportacionComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'control-permisos-previos-exportacion'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ControlPermisosPreviosExportacionRoutingModule { }
