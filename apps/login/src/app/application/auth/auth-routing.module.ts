import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { ConsultaPersonaNotificacionesComponent } from './consulta-persona-notificaciones/consulta-persona-notificaciones.component';
import { FirmaPageComponent } from '@libs/shared/data-access-user/src';
import { NgModule } from '@angular/core';
import { RegistroPersonaNotificacionesComponent } from './registro-persona-notificaciones/registro-persona-notificaciones.component';

export const ROUTES_AUTH: Routes = [
  {
    path: '',
    component: AuthPageComponent
  },
  {
    path: 'cambio-contrasena',
    component: CambioContrasenaComponent
  },
  {
    path: 'registro-notificaciones',
    component: RegistroPersonaNotificacionesComponent
  },
  {
    path: 'consulta-registro-notificador',
    component: ConsultaPersonaNotificacionesComponent
  },
  {
    path: 'firma-electronica',
    component: FirmaPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AUTH)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
