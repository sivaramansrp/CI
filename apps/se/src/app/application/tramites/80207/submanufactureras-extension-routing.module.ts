import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorDePasosComponent } from './pages/contenedor-de-pasos/contenedor-de-pasos.component';
export const ROUTES_REGISTRAR_IMMEX: Routes = [
  {
    path: 'contenedor-de-pasos',
    component: ContenedorDePasosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_REGISTRAR_IMMEX)],
  exports: [RouterModule],
})
export class SubmanufacturerasExtentionRoutingModule {}
