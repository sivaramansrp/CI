/**
 * Módulo de rutas: RegistroComoEmpresaRoutingModule
 * -------------------------------------------------
 * Este módulo define las rutas para la navegación entre los componentes principales
 * del proceso de registro como empresa en el trámite 120602.
 *
 * Uso:
 * Importar este módulo en el módulo principal de la funcionalidad para habilitar la navegación
 * entre los componentes de datos de empresa, domicilio, datos generales de socios y carga de archivos.
 *
 * Funcionalidad:
 * - Define rutas para los componentes principales del flujo de registro.
 * - Permite la navegación y el enrutamiento entre las diferentes vistas del proceso.
 *
 * Autor: [Agregar nombre del autor si se desea]
 */
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// eslint-disable-next-line sort-imports
import { CargarArchivosComponent } from './component/cargar-archivos/cargar-archivos.component';
import { DatosGeneralesSociosComponent } from './component/datos-generales-socios/datos-generales-socios.component';
import { DomicilioComponent } from './component/domicilio/domicilio.component';

import { DatosComponent } from './pages/datos/datos.component';

const ROUTES: Routes = [
  {
    path: 'datos-empresa',
    component: DatosComponent,

  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'datos',
  },
  {
    path: 'domicilio',
    component: DomicilioComponent
  },
  {
    path: 'datos-generales-socios',
    component: DatosGeneralesSociosComponent
  },
  {
    path:'cargar-archivos',
    component:CargarArchivosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RegistroComoEmpresaRoutingModule { }
