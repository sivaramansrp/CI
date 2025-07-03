import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { AcusePageComponent } from '@libs/shared/data-access-user/src';

const ROUTES: Routes = [
  {
      path: 'solicitud',
      component: SolicitudPageComponent,
    },
    {
      path: 'acuse',
      component: AcusePageComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'solicitud',
    },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
