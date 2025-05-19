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
    path: 'pantallas',
    loadChildren: () =>
      import('./tramites/230401/pantallas-modulo.module').then((m) => m.PantallasModuloModule),
  },
  {
    path: 'aviso-de-materiales',
    loadChildren: ()=>
      import('./tramites/231001/aviso-de-materiales.module').then((m)=>m.AvisodematerialesModule)
  },
  {
    path: 'tramites-cites-importacion-exportacion-reexportacion',
    loadChildren: ()=>
      import('./tramites/230902/permiso-cites.module').then((m)=>m.PermisoCitesModule)
  },
  {
    path:'autorizaciones-de-vida-silvestre',
    loadChildren:()=>
      import('./tramites/230901/autorizaciones-de-vida-silvestre.module').then((m)=>m.AutorizacionesDeVidaSilvestreModule)
  },
  {
    path: 'tramites-disponibles',
    loadChildren: () =>
      import('./tramites/230101/tramites-disponsibles.module').then((m) => m.TramitesDisponiblesModule),
  },
  {
    path: 'materiales-peligrosos',
    loadChildren: () =>
      import('./tramites/230501/materiales-peligrosos.module').then((m) => m.MaterialesPeligrososModule),
  },
  {
    path: 'desistimiento',
    loadChildren: () =>
      import('./tramites/230301/desistimiento.module').then((m) => m.DesistimientoModule),
  },
  {
    path: 'aviso-de-reciclaje',
    loadChildren: () =>
      import('./tramites/231003/aviso-de-reciclaje.module').then((m) => m.AvisoDeReciclajeModule),
  },
  {
    path: 'phytosanitary-rexportation',
    loadChildren: () =>
      import('./tramites/230202/phytosanitary-rexportation.module').then((m) => m.PhytosanitaryRexportationModule),
   },
   {
    path: 'aviso-retorno',
    loadChildren: () =>
      import('./tramites/231002/aviso-retorno.module').then((m) => m.AvisoRetornoModule),
   },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
