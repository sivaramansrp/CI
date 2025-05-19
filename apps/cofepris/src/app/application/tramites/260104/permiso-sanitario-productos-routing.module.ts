import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AgregarDestinatarioFinalComponent } from './components/agregar-destinatario-final/agregar-destinatario-final.component';
import { AgregarFabricanteComponent } from './components/agregar-fabricante/agregar-fabricante.component';
import { ModificarDestinatarioFinalComponent } from './components/modificar-destinatario-final/modificar-destinatario-final.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const ROUTES: Routes = [
  {
      path: 'solicitud',
      component: SolicitudPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  },
  {
    path: 'agregar-fabricante',
    component: AgregarFabricanteComponent,
  },
  {
    path: 'agregar-destinatario-final',
    component: AgregarDestinatarioFinalComponent,
  },

  {
    path: 'modificar-destinatario-final',
    component: ModificarDestinatarioFinalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoSanitarioProductosRoutingModule { }
