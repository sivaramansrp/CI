import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { AcusePageComponent } from '@libs/shared/data-access-user/src';

const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdaceRoutingModule { }
