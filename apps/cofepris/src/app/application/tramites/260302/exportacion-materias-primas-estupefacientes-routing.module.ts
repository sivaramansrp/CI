import { RouterModule, Routes } from '@angular/router';
import { AgregarOtrosComponent } from './components/agregar-otros/agregar-otros.component';
import { ContenedorDePasosComponent } from './pages/contenedor-de-paso/contenedor-de-pasos.component';
import { DatosGeneralesComponent } from './components/datos-generales/datos-generales.component';
import { ExporticonMercanciaEstupefacientesComponent } from './components/exporticon-mercancia-estupefacientes/exporticon-mercancia-estupefacientes.component';
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
    component: ExporticonMercanciaEstupefacientesComponent,
  },
  {

    path: 'agregar-datos-generales/:tipo',
    component: DatosGeneralesComponent
  },
  {
    path: 'agregar-otros',
    component: AgregarOtrosComponent
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
export class ExportacionMateriasPrimasEstupefacientesRoutingModule {}
