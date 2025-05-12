import { ImportacionProductosComponent } from './pages/importacion-productos/importacion-productos.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

export const ROUTES_SOLICITUDES: Routes = [
  {
    path: 'productos',
    component: ImportacionProductosComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'productos',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule],
})
export class ServiciosExtraordinariosRoutingModule {}
