import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TipoDePersonaComponent } from './pages/tipo-de-persona-page/tipo-de-persona.component';

const ROUTES: Routes = [
  {
    path: 'tipo-de-persona',
    component: TipoDePersonaComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tipo-de-persona',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ModificacionDelCambioDeSectorRoutingModule {}
