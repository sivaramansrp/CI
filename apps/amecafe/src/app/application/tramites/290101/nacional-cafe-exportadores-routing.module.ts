import { CafeExportadoresComponent } from './pages/cafe-exportadores/cafe-exportadores.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { BodegasComponent } from './pages/bodegas/bodegas.component';
import{CafeDeExportadoresComponent} from './pages/cafe-de-exportadores/cafe-de-exportadores.component'
import { BeneficiosComponent } from './pages/beneficios/beneficios.component';
import {RegionesComponent} from './pages/regiones/regiones.component'
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
    path: 'bodegas',
    component: BodegasComponent,
  },
  {
    path: 'cafe-de-exportadores',
    component: CafeDeExportadoresComponent,
  },
  {
    path: 'beneficios',
    component: BeneficiosComponent,
  },
  {
    path: 'regiones',
    component: RegionesComponent,
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
