import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ZoosanitarioPageComponent } from './pages/zoosanitario-page/zoosanitario-page.component';

/**
 * @fileoverview Módulo de enrutamiento para el certificado zoosanitario.
 * Este módulo define las rutas para el componente principal del certificado zoosanitario.
 * @module certificadoZoosanitario
 */

/**
 * Rutas para el certificado zoosanitario.
 * @constant ROUTES_ZOOSANITARIO
 * @type {Routes}
 */
export const ROUTES_ZOOSANITARIO: Routes = [
  {
    path: 'zoosanitario',
    component: ZoosanitarioPageComponent,
    /**
     * @description Data asociada a la ruta.
     * @property {object} data
     * @property {string} data.title - Título de la página.
     */
    data: {
      title: 'Certificado Zoosanitario' // Ejemplo: Puedes agregar un título para la página.
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'zoosanitario',
  },

];

/**
 * Módulo de enrutamiento para el certificado zoosanitario. --220201
 * @class CertificadoZoosanitario
 */
@NgModule({
  imports: [RouterModule.forChild(ROUTES_ZOOSANITARIO)],
  exports: [RouterModule]
})
export class CertificadoZoosanitario { }