import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { ConsultaCapturistaPrivadoComponent } from './consulta-capturista-privado/consulta-capturista-privado.component';
import { ConsultaPersonaNotificacionesComponent } from './consulta-persona-notificaciones/consulta-persona-notificaciones.component';
import { ConsultaSocioAccionistaComponent } from './consulta-socio-accionista/consulta-socio-accionista.component';
import { FirmaPageComponent } from '@libs/shared/data-access-user/src';
import { NgModule } from '@angular/core';
import { RegistroCapturistaPrivadoComponent } from './registro-capturista-privado/registro-capturista-privado.component';
import { RegistroPersonaNotificacionesComponent } from './registro-persona-notificaciones/registro-persona-notificaciones.component';
import { RegistroSocioAccionistaComponent } from './registro-socio-accionista/registro-socio-accionista.component';

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
    path: 'registro-notificadores',
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
  {
    path: 'registro-capturista-privado',
    component: RegistroCapturistaPrivadoComponent
  },
  {
    path: 'consulta-capturista',
    component: ConsultaCapturistaPrivadoComponent
  },
  {
    path: 'registro-socio-accionista',
    component: RegistroSocioAccionistaComponent
  },
  {
    path: 'consulta-socio-accionista',
    component: ConsultaSocioAccionistaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AUTH)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
