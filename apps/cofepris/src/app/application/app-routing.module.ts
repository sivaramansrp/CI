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
    path: 'importacion-psicotropicos',
    loadChildren: () =>
      import('./tramites/260303/certificados-licencias-permisos/certificados-licencias-permisos.module').then(
        (m) => m.CertificadosLicenciasPermisosModule),
  },
  {
    path: 'permiso-sanitario',
    loadChildren: () =>
      import('./tramites/260211/permiso-sanitario.module').then(
        (m) => m.PermisoSanitarioModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
