import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const routes: Routes = [
  {
    path: 'sensbles',
    component: SolicitudPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sensbles',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImmexAmpliacionSensiblesRoutingModule {}
