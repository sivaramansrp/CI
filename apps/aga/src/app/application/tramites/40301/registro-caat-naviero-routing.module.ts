import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistroCaatNavieroPageComponent } from './pages/registro-caat-naviero-page/registro-caat-naviero-page.component';


export const ROUTES_SOLICITUDES: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    redirectTo: 'caat-naviero',
  },
  {
    path: 'caat-naviero',
    component: RegistroCaatNavieroPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule],
})
export class RegistroCaatNavieroRoutingModule {}
