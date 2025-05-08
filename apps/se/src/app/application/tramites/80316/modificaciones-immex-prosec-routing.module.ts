import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { RegistroModificacionComponent } from './components/registro-modificacion/registro-modificacion.component';
import { TipoDePersonaComponent } from './components/tipo-de-persona/tipo-de-persona.component';

const routes: Routes = [
  {
    path: 'solicitud',
    component: SolicitudPageComponent,
  },
  {
    path: 'registro-modificacion',
    component: RegistroModificacionComponent,
  },
  {
    path: 'tipo-de-persona',
    component: TipoDePersonaComponent,
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
export class ModificacionesImmexProsecRoutingModule { }
