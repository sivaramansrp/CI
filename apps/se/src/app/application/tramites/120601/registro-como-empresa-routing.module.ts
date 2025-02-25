import { NgModule } from '@angular/core';
// eslint-disable-next-line sort-imports
import { DatosGeneralesSociosComponent } from './component/datos-generales-socios/datos-generales-socios.component';
import { DomicilioComponent } from './component/domicilio/Domicilio.component';
import { RouterModule, Routes } from '@angular/router';
import { CargarArchivosComponent } from './component/cargar-archivos/cargar-archivos.component';

const ROUTES: Routes = [
   { path: '', pathMatch: 'full', redirectTo: 'domicilio' },
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
