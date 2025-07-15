import { AgregardestinatarioComponent } from './components/agregardestinatario/agregardestinatario.component';
import { AgriculturaComponent } from './pages/agricultura/agricultura.component';
import { AnimalesVivoContenedoraComponent } from './components/animales-vivo-contenedora/animales-vivo-contenedora.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SubProductosContenedoraComponent } from './components/sub-productos-contenedora/sub-productos-contenedora.component';



export const ROUTES_FITOSANITARIO: Routes = [
  {
    path: 'agricultura',
    component: AgriculturaComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'agricultura',
  },
  {
    path: 'animales-vivo',
    component: AnimalesVivoContenedoraComponent
  },
  {
    path: 'sub-productos',
    component: SubProductosContenedoraComponent
  },
  {
    path: 'agregar-destinatario',
    component: AgregardestinatarioComponent
  },
  {
    path: 'agregar-destinatario/:id',
    component: AgregardestinatarioComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_FITOSANITARIO)],
  exports: [RouterModule]
})
export class FitosanitarioRoutingModule { }