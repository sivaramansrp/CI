import { ModPermisoSanitarioImportacion260904Component } from './pages/mod-permiso-sanitario-importacion-260904/mod-permiso-sanitario-importacion-260904.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
    {
      path: 'sanitary-permit',
      component: ModPermisoSanitarioImportacion260904Component,
  
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'sanitary-permit',
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ModificaciónDelPermisoSanitarioDeImportaciónDeInsumosRoutingModule { }
