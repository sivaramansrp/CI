import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteComponent,
  },
  {
    path: 'artefactos-pirotecnicos-ordinarios',
    loadChildren: () =>
      import(
        './tramites/240119/artefactos-pirotecnicos-ordinarios.module'
      ).then((m) => m.ArtefactosPirotecnicosOrdinariosModule),
  },
  {
    path: 'permiso-extraordinario-para',
    loadChildren: () =>
      import(
        './tramites/240118/permiso-extraordinario-para-module'
      ).then((m) => m.PermisoExtraordinarioParaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
