import { RouterModule, Routes } from '@angular/router';
import { AgregarsDestinatarioComponent } from './components/agregars-destinatario/agregars-destinatario.component';
import { AgregarsFabricanteComponent } from './components/agregars-fabricante/agregars-fabricante.component';
import { AgregarsFacturadorComponent } from './components/agregars-facturador/agregars-facturador.component';
import { AgregarsProveedorComponent } from './components/agregars-proveedor/agregars-proveedor.component';
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
    component: AgregarsDestinatarioComponent,
  },
  {
    path: 'agregar-proveedor',
    component: AgregarsProveedorComponent,
  },
  {
    path: 'agregar-facturador',
    component: AgregarsFacturadorComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ImportacionDispositivosMedicosLaboratorioRoutingModule {}
