import { RouterModule, Routes } from '@angular/router';
import { AgregarsDestinatarioContenedoraComponent } from './components/agregar-destinatario-contenedora/agregar-destinatario-contenedora.component';
import { AgregarsFabricanteContenedoraComponent } from './components/agregar-fabricante-contenedora/agregar-fabricante-contenedora.component';
import { AgregarsFacturadorContenedoraComponent } from './components/agregar-facturador-contenedora/agregar-facturador-contenedora.component';
import { AgregarsProveedorContenedoraComponent } from './components/agregar-proveedor-contenedora/agregar-proveedor-contenedora.component';
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
    component: AgregarsFabricanteContenedoraComponent,
  },
  {
    path: 'agregar-destinatario-final',
    component: AgregarsDestinatarioContenedoraComponent,
  },
  {
    path: 'agregar-proveedor',
    component: AgregarsProveedorContenedoraComponent,
  },
  {
    path: 'agregar-facturador',
    component: AgregarsFacturadorContenedoraComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ImportacionDispositivosMedicosLaboratorioRoutingModule {}
