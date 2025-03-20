import { BusquedaFolioComponent } from './pages/busqueda-folio/busqueda-folio.component';
import { IntroPermisoComponent } from './pages/intro-permiso/intro-permiso.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
  {
    path: 'solicitante',
    component: IntroPermisoComponent,
  },
  {
    path: 'busqueda',
    component: BusquedaFolioComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitante',
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DesistimientoDePermisoRoutingModule { }
