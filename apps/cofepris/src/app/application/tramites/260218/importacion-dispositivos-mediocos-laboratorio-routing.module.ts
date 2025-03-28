import { RouterModule, Routes } from '@angular/router';
import { AgregarDestinatarioFinalComponent } from '../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { AgregarFacturadorComponent } from '../../shared/components/agregar-facturador/agregar-facturador.component';
import { AgregarProveedorComponent } from '../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { AgregarsFabricanteComponent } from './components/agregars-fabricante/agregars-fabricante.component';
import { ContenedorDePasosComponent } from './pages/contenedor-de-paso/contenedor-de-pasos.component';
import { DatosMercanciaContenedoraComponent } from './components/datos-mercancia-contenedora/datos-mercancia-contenedora.component';
import { NgModule } from '@angular/core';
import { ScianTablaContenedoraComponent } from './components/scian-tabla-contenedora/scian-tabla-contenedora.component';


const ROUTES: Routes = [
  {
    path: 'contenedor-de-pasos',
    component: ContenedorDePasosComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contenedor-de-pasos',
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
    component: AgregarsFabricanteComponent,
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
export class ImportacionDispositivosMedicosLaboratorioRoutingModule {}
