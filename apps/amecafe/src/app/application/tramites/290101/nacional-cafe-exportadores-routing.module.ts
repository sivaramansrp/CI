import { CafeExportadoresComponent } from './pages/cafe-exportadores/cafe-exportadores.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

/**
 * @constant ROUTES_PERMISO
 * @description Rutas para el módulo de registro de solicitud IMMEX.
 */
export const ROUTES_PERMISO: Routes = [
  {
    path: 'cafe-exportadores',
    component: CafeExportadoresComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cafe-exportadores',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_PERMISO)],
  exports: [RouterModule]
})
export class NacionalCafeExportadoresRoutingModule { }
