import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPermisoComponent } from './pages/intro-permiso/intro-permiso.component';
import { BusquedaFolioComponent } from './pages/busqueda-folio/busqueda-folio.component';

const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesistimientoDePermisoRoutingModule { }
