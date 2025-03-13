import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AsignacionDirectaDeCupoComponent } from './pages/asignacion-directa-de-cupo/asignacion-directa-de-cupo.component';

const ROUTES: Routes = [
  {
        path: 'solicitante',
        component: AsignacionDirectaDeCupoComponent,
      }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AsignacionDirectaDeCupoRoutingModule { }
