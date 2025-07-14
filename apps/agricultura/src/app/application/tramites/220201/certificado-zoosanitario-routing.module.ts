import { RouterModule, Routes } from '@angular/router';
import { AgregardestinatarioComponent } from './components/agregardestinatario/agregardestinatario.component';
import { AgregardestinatariofinalComponent } from './components/agregardestinatariofinal/agregardestinatariofinal.component';
import { AnimalesVivoContenedoraComponent } from './components/animales-vivo-contenedora/animales-vivo-contenedora.component';
import { NgModule } from '@angular/core';
import { ZoosanitarioPageComponent } from './pages/zoosanitario-page/zoosanitario-page.component';

export const ROUTES_ZOOSANITARIO: Routes = [
  {
    path: 'zoosanitario',
    component: ZoosanitarioPageComponent,
  },
  {
    path:'agregar-destinatario',
    component:AgregardestinatarioComponent
  },
  {
  path: 'agregar-destinatario/:id',
  component: AgregardestinatarioComponent
  },
   {
    path:'agregar-destinatariofinal',
    component:AgregardestinatariofinalComponent
  },
  {
    path:'agregar-destinatariofinal/:id',
    component:AgregardestinatariofinalComponent
  },
    {
    path: 'animales-vivo',
    component: AnimalesVivoContenedoraComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'zoosanitario',
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_ZOOSANITARIO)],
  exports: [RouterModule]
})
export class CertificadoZoosanitario { }
