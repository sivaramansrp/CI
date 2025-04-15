import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisoSanitarioDispositivosMedicosComponent } from './pages/permiso-sanitario-dispositivos-medicos/permiso-sanitario-dispositivos-medicos.component';

const routes: Routes = [
  {
    path: 'permiso-sanitario-dispositivos-medicos',
    component: PermisoSanitarioDispositivosMedicosComponent,
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoSanitarioDispositivosMedicosRoutingModule { }
