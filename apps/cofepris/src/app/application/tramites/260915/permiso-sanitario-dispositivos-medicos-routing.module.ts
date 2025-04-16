
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PermisoSanitarioDispositivosMedicosComponent } from './pages/permiso-sanitario-dispositivos-medicos/permiso-sanitario-dispositivos-medicos.component';

const ROUTES: Routes = [
  {
    path: 'permiso-sanitario-dispositivos-medicos',
    component: PermisoSanitarioDispositivosMedicosComponent,
   },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoSanitarioDispositivosMedicosRoutingModule { }
