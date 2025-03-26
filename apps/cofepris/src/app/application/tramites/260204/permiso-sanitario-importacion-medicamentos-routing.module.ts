import { RouterModule, Routes } from '@angular/router';
import { DatosMercanciaContenedoraComponent } from './components/datos-mercancia-contenedora/datos-mercancia-contenedora.component';
import { NgModule } from '@angular/core';
import { ScianTablaContenedoraComponent } from './components/scian-tabla-contenedora/scian-tabla-contenedora.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { AgregarFabricanteComponent } from '../../shared/components/agregar-fabricante/agregar-fabricante.component';
import { AgregarDestinatarioFinalComponent } from '../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { AgregarProveedorComponent } from '../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { AgregarFacturadorComponent } from '../../shared/components/agregar-facturador/agregar-facturador.component';

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
    path: 'scian-selecion',
    component: ScianTablaContenedoraComponent,
  },
  {
    path: 'mercancia-datos',
    component: DatosMercanciaContenedoraComponent,
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
    path: 'agregar-proveedor',
    component: AgregarProveedorComponent,
  },
  {
    path: 'agregar-facturador',
    component: AgregarFacturadorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class PermisoSanitarioImportacionMedicamentosRoutingModule {}
