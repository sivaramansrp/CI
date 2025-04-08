import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteComponent
  },
  {
    path: 'renuncia-de-derechos-de-permisos',
    loadChildren: () =>
      import('./tramites/140111/renuncia-de-derechos-de.module').then(
        (m) => m.RenunciaDeDerechosDeModule
      ),
  },
  {
    path: 'autorizacion-de-rayos-x',
    loadChildren: () =>
      import('./tramites/300105/autorizacion-de-rayos-x.module').then(
        (m) => m.AutorizacionDeRayosXModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
