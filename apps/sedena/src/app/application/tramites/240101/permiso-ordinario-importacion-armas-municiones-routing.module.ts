import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const routes: Routes = [
  {
    path: 'contenedor-de-pasos',
    component: SolicitudPageComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contenedor-de-pasos',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisoOrdinarioImportacionArmasMunicionesRoutingModule {}
