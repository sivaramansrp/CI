import { RouterModule, Routes } from '@angular/router';
import { CartificadoValidacionPageComponent } from './pages/cartificado-validacion-page/cartificado-validacion-page.component';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
  {
    path: 'validacion',
    component: CartificadoValidacionPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'modalidad',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CertificadoValidacionRoutingModule { }
