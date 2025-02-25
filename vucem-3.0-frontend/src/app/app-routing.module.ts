import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteComponent,
  },
  {
    path: 'servicios-extraordinarios',
    loadChildren: () =>
      import('./tramites/5701/servicios-extraordinarios.module').then(
        (m) => m.ServiciosExtraordinariosModule
      ),
  },
  {
    path: 'pexim',
    loadChildren: () =>
      import('./tramites/130118/pexim.module').then((m) => m.PeximModule),
  },
  {
    path: 'despacho-mercancias',
    loadChildren: () =>
      import('./tramites/303/despacho-mercancias.module').then(
        (m) => m.DespachoMercanciasModule
      ),
  },
  {
    path: 'pantallas-extraordinarios',
    loadChildren: () =>
      import('./tramites/220401/pantallas.module').then(
        (m) => m.PantallasModule
      ),  
  },
  {

    path: 'sagarpa',
    loadChildren: () =>
      import('./tramites/220501/sagarpa.module').then(
        (m) => m.SagarpaModule
      ),
  },
  {
    path: 'inspeccion-fisica',
    loadChildren: () =>
      import('./tramites/220502/inspeccion-fisica.module').then(
        (m) => m.InspeccionFisicaModule
      ),
  },
  {
    path: 'octava-temporal',
    loadChildren: () =>
      import('./tramites/130102/octava-temporal.module').then(
        (m) => m.OctavaTemporalModule
      ), 
  },
  {
    path: 'importante',
    loadChildren: () =>
      import('./tramites/301/pantallas.module').then((m) => m.PantallasModule),
  },
  {
    path: 'pantallas',
    loadChildren: () =>
      import('./tramites/110101/pantallas/pantallas.module').then(
        (m) => m.PantallasModule
      ),
  },
  {
    path: 'elegibilidad-de-textiles',
    loadChildren: () =>
      import('./tramites/120301/elegibilidad-de-textiles.module').then(
        (m) => m.ElegibilidadDeTextilesModule
      ),
    },
  {
    path: 'certificado-zoosanitario',
    loadChildren: () =>
      import('./tramites/220201/certificado-zoosanitario.module').then(
        (m) => m.CertificadoZoosanitarioModule
      ),
  },
  {
    path: 'permiso-importacion',
    loadChildren: () =>
      import('./tramites/130120/permiso-importacion.module').then(
        (m) => m.PermisoImportacionModule
      ),
  },
  {
    path: 'octava-temporal',
    loadChildren: () =>
      import('./tramites/130102/octava-temporal.module').then(
        (m) => m.OctavaTemporalModule
      ),
  },
  {
    path: 'certificado-fitosanitario',
    loadChildren: () =>
      import('./tramites/220202/fitosanitario.module').then(
        (m) => m.FitosanitarioModule
      )
  },
  {
    path: 'bandeja-tareas-pendientes',
    loadChildren: () =>
      import('./funcionario/funcionario.module').then(
        (m) => m.FuncionarioModule
      ),
  },
  {
    path: 'aviso-de-materiales',
    loadChildren: () =>
      import('./tramites/231001/avisodemateriales.module').then(
        (m) => m.AvisodematerialesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }