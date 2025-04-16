import { RouterModule, Routes } from '@angular/router';
import { ModificacionPermisoImportacionComponent } from './pages/modificacion-permiso-importacion/modificacion-permiso-importacion.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
   {
        path: 'modificacion-permiso',
        component: ModificacionPermisoImportacionComponent,
    
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'modificacion-permiso',
      }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PermisoImportacionRoutingModule { }
