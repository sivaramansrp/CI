import { MercanciasDestruidasFormaComponent } from './components/mercancias-destruidas-forma/mercancias-destruidas-forma.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'acta-de-hechos',
  },
  {
    path: 'acta-de-hechos',
    component: SolicitudPageComponent,
  },
  {
    path: 'mercancias-destruidas-forma',
    component: MercanciasDestruidasFormaComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ActaDeHechosRoutingModule { }
