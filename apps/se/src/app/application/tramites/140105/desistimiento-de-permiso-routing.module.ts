import { BusquedaFolioComponent } from './pages/busqueda-folio/busqueda-folio.component';
import { IntroPermisoComponent } from './pages/intro-permiso/intro-permiso.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'solicitante',
    component: IntroPermisoComponent,
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
