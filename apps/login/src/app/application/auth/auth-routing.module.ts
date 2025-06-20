import { RouterModule, Routes } from '@angular/router';
import { AceptaAccionesUsoComponent } from './acepta-acciones-uso/acepta-acciones-uso.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { CondicionesUsoComponent } from './condiciones-uso/condiciones-uso.component';
import { ConsultaCapturistaPrivadoComponent } from './consulta-capturista-privado/consulta-capturista-privado.component';
import { ConsultaPersonaNotificacionesComponent } from './consulta-persona-notificaciones/consulta-persona-notificaciones.component';
import { FirmaPageComponent } from '@libs/shared/data-access-user/src';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { ModificarCorreoElectronicoComponent } from './modificar-correo-electronico/modificar-correo-electronico.component';
import { NgModule } from '@angular/core';
import { RegistroCapturistaPrivadoComponent } from './registro-capturista-privado/registro-capturista-privado.component';
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
    path: 'modificar-correo',
    component: ModificarCorreoElectronicoComponent
  },
  {
    path: 'menu-usuario',
    component: MenuUsuarioComponent
  },
  {
    path: 'condiciones-uso',
    component: CondicionesUsoComponent
  },
  {
    path: 'acepta-condiciones',
    component: AceptaAccionesUsoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_AUTH)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
