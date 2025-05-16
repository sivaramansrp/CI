import { MercanciasDestruidasFormaComponent } from './components/mercancias-destruidas-forma/mercancias-destruidas-forma.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

/**
 * Rutas para el módulo de Acta de Hechos.
 * Define las rutas disponibles dentro del módulo y los componentes asociados.
 */
const ROUTES: Routes = [
  /**
   * Ruta raíz que redirige a la página principal del acta de hechos.
   * @path ''
   * @redirectTo 'acta-de-hechos'
   */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  },
  /**
   * Ruta para la página principal del acta de hechos.
   * @path 'acta-de-hechos'
   * @component SolicitudPageComponent
   */
  {
    path: 'solicitud',
    component: SolicitudPageComponent,
  },
  /**
   * Ruta para el formulario de mercancías destruidas.
   * @path 'mercancias-destruidas-forma'
   * @component MercanciasDestruidasFormaComponent
   */
  {
    path: 'mercancias-destruidas-forma',
    component: MercanciasDestruidasFormaComponent,
  },
];

/**
 * Módulo de enrutamiento para el Acta de Hechos.
 * Configura las rutas y exporta el módulo de enrutamiento.
 */
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ActaDeHechosRoutingModule { }
