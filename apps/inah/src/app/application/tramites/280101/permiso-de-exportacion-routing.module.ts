import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PermisoDeExportacionComponent } from './pages/permiso-de-exportacion/permiso-de-exportacion.component';


const ROUTES: Routes = [
  {
    path: 'permiso', 
    component: PermisoDeExportacionComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoDeExportacionRoutingModule { }
