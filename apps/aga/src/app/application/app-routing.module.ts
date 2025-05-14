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
    path: 'registro-caat-naviero',
    loadChildren: () =>
      import('./tramites/40301/registro-caat-naviero.module').then((m) => m.RegistroCaatNavieroModule),
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
    path: 'registro-empresas',
    loadChildren: () =>
      import('./tramites/30401/registro-empresas-transporte.module').then(
        (m) => m.RegistroEmpresasTransporteModule
      ),
  },
  {
    path: 'invocar-modulo',
    loadChildren: () =>
      import('./tramites/105/invocar.module').then(
        (m) => m.InvocarModule
      ),
  },
  {
    path: 'atencion-de-renovacion',
    loadChildren: () =>
      import('./tramites/40403/atencion-de-renovacion.module').then(
        (m) => m.AtencionDeRenovacionModule
      ),
  },
  {
    path: 'retirada-de-la-autorizacion-de-donaciones',
    loadChildren: () =>
      import('./tramites/11105/retirada-de-la-autorizacion-de-donaciones.module').then(
        (m) => m.RetiradaDeLaAutorizacionDeDonacioneModule
      )
  },
  {
    path: 'deposito-fiscal',
    loadChildren: () =>
      import('./tramites/104/deposito-fiscal-manufactura-vehiculos/deposito-fiscal-manufactura-vehiculos.module').then(
        (m) => m.DepositoFiscalManufacturaVehiculosModule
      )
  },
  {
    path: 'transportacion-maritima',
    loadChildren: () =>
      import('./tramites/40201/transportacion-maritima.module').then(
        (m) => m.TransportacionMaritimaModule
      ),
  },
  {
    path: 'junta-tecnica',
    loadChildren: () =>
      import('./tramites/6101/junta-tecnica.module').then(
        (m) => m.JuntaTecnicaModule
      )
  },
  {
    path: 'junta-tecnica-registro',
    loadChildren: () =>
      import('./tramites/6102/junta-tecnica-registro.module').then(
        (m) => m.JuntaTecnicaRegistroModule
      )
  },
  {
    path: 'modificacion-transportacion-maritima',
    loadChildren: () =>
      import('./tramites/40202/modificacion-transportacion-maritima.module').then(
        (m) => m.ModificacionTransportacionMaritimaModule
      ),
  },
  {
    path: 'modificarCaatTerrestre',
    loadChildren: () =>
      import('./tramites/40103/modificarCaatTerrestre.module').then(
        (m) => m.ModificarCaatTerrestreModule
      )
  },
  {
    path: 'cancelacion-donaciones',
    loadChildren: () =>
      import('./tramites/11106/cancelacion-donaciones.module').then(
        (m) => m.CancelacionDonacionesModule
      ),
  },
  {
    path: 'aeronaves-en-retorno-temporal',
    loadChildren: () =>
      import('./tramites/630307/retorno-importacion-temporal.module').then(
        (m) => m.RetornoImportacionTemporalModule
      )
  },
  
  { 
    path: 'prestadores-servicio',
    loadChildren: () =>
      import('./tramites/202/prestadores-servicio.module').then(
        (m) => m.PrestadoresServicioModule
      )
  },
  {
    path: 'exencion-impuestos',
    loadChildren: () =>
      import('./tramites/10302/exencion-impuestos.module').then(
        (m) => m.ExencionImpuestosModule
      )
  },
  {
    path:'registro-solicitud',
    loadChildren: () =>
      import('./tramites/570102/registro-solicitud-desistimiento.module').then(
        (m) => m.RegistroSolicitudDesistimientoModule
      ),
    },
    {
    path: 'registro-del-codigo',
      loadChildren: () =>
        import('./tramites/40401/tramite40401.module').then(
          (m) => m.Tramite40401Module),
  },
  {
    path: 'codigo-transportista',
    loadChildren: () => 
      import('./tramites/40402/codigo-transportista.module').then(
        (m) => m.CodigoTransportistaModule)
  },
  {
    path: 'registro-transportista',
    loadChildren: () =>
      import('./tramites/40302/registro-transportista.module').then(
        (m) => m.RegistroTransportistaModule),
  },
  {
    path: 'tecnologicos',
    loadChildren: () =>
      import('./tramites/324/tecnologicos.module').then(
        (m) => m.TecnologicosModule),
  },
  {
    path: 'autorizacion-importacion',
    loadChildren: () =>
      import('./tramites/6402/autorizacion-importacion.module').then(
        (m) => m.AutorizacionImportacionModule),
  },
  {

    path: 'autorizacion-importacion-temporal',
    loadChildren: () =>
      import('./tramites/630103/autorizacion-importacion-temporal.module').then(
        (m) => m.AutorizacionImportacionTemporalModule),
  },
  {
    path: 'modificacion-donaciones-immex',
    loadChildren: () =>
      import('./tramites/11102/modificacion-donaciones-immex.module').then(
        (m) => m.ModificacionDonacionesImmexModule),
  },
  {
    path: 'retorno-de-partes',
    loadChildren: () =>
      import('./tramites/6403/retorno-de-partes.module').then(
        (m) => m.RetornoDePartesModule),
  },
  {
    path: 'operaciones-de-comercio',
    loadChildren: () =>
      import('./tramites/319/operaciones-de-comercio-exterior.module').then(
        (m) => m.OperacionesDeComercioExteriorModule)
  },
  {
    path: 'autorizacion/mercancia-donada',
    loadChildren: () =>
      import('./tramites/103/autorizacion-mercancia-donada.module').then(
        (m) => m.AutorizacionMercanciaDonadaModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }