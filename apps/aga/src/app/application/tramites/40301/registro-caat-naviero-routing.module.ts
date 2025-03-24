import { RouterModule, Routes } from '@angular/router';
import { RegistroCaatNavieroPageComponent } from './pages/cancelacion-extraordinarios-page/cancelacion-extraordinarios-page.component';
import { NgModule } from '@angular/core';


export const ROUTES_SOLICITUDES: Routes = [
  {
    path: 'cancelacion-extraordinarios',
    component: RegistroCaatNavieroPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_SOLICITUDES)],
  exports: [RouterModule],
})
export class RegistroCaatNavieroRoutingModule {}
