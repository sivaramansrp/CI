import { NgModule } from '@angular/core';
import { PermisoSanitarioSolicitanteComponent } from './pages/permiso-sanitario-solicitante/permiso-sanitario-solicitante.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  {
      path: 'solicitante',
      component: PermisoSanitarioSolicitanteComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'solicitante',
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class PermisoSanitarioRoutingModule {}
