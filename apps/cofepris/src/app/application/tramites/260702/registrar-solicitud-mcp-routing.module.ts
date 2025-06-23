import { RouterModule, Routes } from '@angular/router';
import { AcusePageComponent } from '@libs/shared/data-access-user/src/tramites/pages/acuse-page/acuse-page.component';
import { NgModule } from '@angular/core';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';

const ROUTES: Routes = [

  {
    path: 'registro',
    component: RegistroPageComponent,
   },
  {
    path: 'acuse',
    component: AcusePageComponent,
  },
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registro', 
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RegistrarSolicitudMCPRoutingModule { }
