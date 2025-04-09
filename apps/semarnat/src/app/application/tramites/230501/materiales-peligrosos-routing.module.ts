import { RouterModule, Routes } from '@angular/router';
import { ComposicionComponent } from './components/composicion/composicion.component';
import { NgModule } from '@angular/core';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

const ROUTES: Routes = [
  {
    path: 'solicitud',
    component: SolicitudPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitud',
  },
  {
    path: 'composicion',
    component: ComposicionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class MaterialesPeligrososRoutingModule {}
