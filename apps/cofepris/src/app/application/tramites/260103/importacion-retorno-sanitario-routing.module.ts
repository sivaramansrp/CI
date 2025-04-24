import { RouterModule, Routes } from '@angular/router';
import { ContenedorDePasosComponent } from './pages/contenedor-de-paso/contenedor-de-pasos.component';
import { DatosGeneralesComponent } from './components/datos-generales/datos-generales.component';
import { FabricanteDatosComponent } from './components/fabricante-datos/fabricante-datos.component';
import { ImporticonMercanciaSanitarioComponent } from './components/importicon-mercancia-sanitario/importicon-mercancia-sanitario.component';
import { NgModule } from '@angular/core';
import { ScianTablaContenedoraComponent } from './components/scian-tabla-contenedora/scian-tabla-contenedora.component';


const ROUTES: Routes = [
  {
    path: 'contenedor-de-pasos',
    component: ContenedorDePasosComponent,
  },
  {
    path: 'scian-selecion',
    component: ScianTablaContenedoraComponent,
  },
  {
    path: 'mercancia-datos',
    component: ImporticonMercanciaSanitarioComponent,
  },
  {

    path: 'agregar-datos-generales/:tipo',
    component: DatosGeneralesComponent
  },
  {
    path: 'agregar-fabricante',
    component: FabricanteDatosComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contenedor-de-pasos',
  },

];
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ImportacionRetornoSanitarioRoutingModule {}
