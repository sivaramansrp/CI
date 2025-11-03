import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { REMOTE_ROUTES } from './entry.routes';

/**
 * Wrapper NgModule para las rutas de privados.
 * Este módulo es necesario para la integración con Module Federation
 * desde el dashboard (shell), ya que el dashboard espera un NgModule,
 * no rutas standalone directamente.
 */
@NgModule({
  imports: [RouterModule.forChild(REMOTE_ROUTES)],
  exports: [RouterModule],
})
export class RemoteEntryModule {}

