import { AcusePageComponent } from '@libs/shared/data-access-user/src';
import { NgModule } from '@angular/core';
import { RouterModule, } from '@angular/router';
import { Routes } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { RegistroModificacionComponent } from './components/registro-modificacion/registro-modificacion.component';
const ROUTES_CONTENEDOR: Routes = [
  {
    component: SolicitudPageComponent,
    path: 'solicitud',
  },
  {
    component: RegistroModificacionComponent,
    path: 'registro-modificacion',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'solicitante',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_CONTENEDOR)],
  exports: [RouterModule],
})
export class ImmexModificationRoutingModule { }
