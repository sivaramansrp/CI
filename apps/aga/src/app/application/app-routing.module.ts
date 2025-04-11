import { RouterModule, Routes } from '@angular/router';
import { AcusePageComponent } from './acuse/acuse-page/acuse-page.component';
import { FirmaPageComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { NotificacionPageComponent } from './notificaciones/notificacion-page/notificacion-page.component';
import { SeleccionTramiteComponent } from './seleccion-tramite/seleccion-tramite.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'seleccion-tramite' },
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
    path: 'despacho-mercancias',
    loadChildren: () =>
      import('./tramites/303/despacho-mercancias.module').then(
        (m) => m.DespachoMercanciasModule
      ),
  },
  {
    path: 'muestras-mercancias',
    loadChildren: () =>
      import('./tramites/30901/renovaciones-muestras-mercancias.module').then(
        (m) => m.RenovacionesMuestrasMercanciasModule
      ),
  },
  {
    path: 'registro-cuentas-bancarias',
    loadChildren: () =>
      import(
        './tramites/6001/registro-cuentas-bancarias/registro-cuentas-bancarias.module'
      ).then((m) => m.RegistroCuentasBancariasModule),
  },
  {
    path: 'importante',
    loadChildren: () =>
      import('./tramites/301/pantallas.module').then(
        (m) => m.Pantallas301Module
      ),
  },
  {
    path: 'retorno-contenedores',
    loadChildren: () =>
      import('./tramites/11202/retorno-contenedores.module').then(
        (m) => m.RetornoContenedoresModule
      ),
  },
  {
    path: 'importador-exportador',
    loadChildren: () =>
      import('./tramites/10301/importador-exportador.module').then(
        (m) => m.ImportadorExportadorModule
      ),
  },
  {
    path: 'donaciones-extranjeras',
    loadChildren: () =>
      import('./tramites/10303/donaciones-extranjeras.module').then(
        (m) => m.DonacionesExtranjerasModule
      ),
  },
  {
    path: 'modificar-caat-terrestre',
    loadChildren: () =>
      import('./tramites/40103/modificarCaatTerrestre.module').then(
        (m) => m.ModificarCaatTerrestreModule
      ),
  },
  {
    path: 'muestras-mercancias',
    loadChildren: () =>
      import('./tramites/30901/renovaciones-muestras-mercancias.module').then(
        (m) => m.RenovacionesMuestrasMercanciasModule
      ),
  },
  {
    path: 'atender-requerimientos',
    loadChildren: () =>
      import('./atencion-requerimientos/atencion-requerimientos.module').then(
        (m) => m.AtencionRequerimientosModule
      ),
  },
  {
    path: 'transportista-terrestre',
    loadChildren: () =>
      import('./tramites/40102/transportista-terrestre.module').then(
        (m) => m.TransportistaTerrestreModule
      ),
  },
  {
    path: 'temporal-contenedores',
    loadChildren: () =>
      import('./tramites/11201/temporal-contenedores.module').then(
        (m) => m.TemporalContenedoresModule
      ),
  },
  {
    path: 'notificacion',
    component: NotificacionPageComponent,
  },
  {
    path: 'firmar',
    component: FirmaPageComponent,
  },
  {
    path: 'acuse',
    component: AcusePageComponent,
  },
  {
    path: 'cancelacion-servicios-extraordinarios',
    loadChildren: () =>
      import(
        './tramites/570101/cancelacion-servicios-extraordinarios.module'
      ).then((m) => m.CancelacionServiciosExtraordinariosModule),
  },

  {
    path: 'registro-digitalizar-documentos',
    loadChildren: () =>
      import('./tramites/701/registro-digitalizar-documentos.module').then(
        (m) => m.RegistroDigitalizarDocumentosModule
      ),
  },
  {
    path: 'transferencia-contenedores',
    loadChildren: () =>
      import('./tramites/11204/temporal-contenedores.module').then(
        (m) => m.TemporalContenedoresModule
      ),
  },
  {
    path: 'registro-digitalizar-documentos',
    loadChildren: () =>
      import('./tramites/701/registro-digitalizar-documentos.module').then(
        (m) => m.RegistroDigitalizarDocumentosModule
      ),
  },
  {
    path: 'certi-registro',
    loadChildren: () =>
      import('./tramites/302/certi-registro.module').then(
        (m) => m.CertiRegistroModule
      ),
  },
  {
    path: 'transportista-terrestre',
    loadChildren: () =>
      import('./tramites/40101/transportista-terrestre.module').then(
        (m) => m.TransportistaTerrestreModule
      ),
  },
  {
    path: 'invocar-modulo',
    loadChildren: () =>
      import('./tramites/105/invocar.module').then(
        (m) => m.InvocarModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
