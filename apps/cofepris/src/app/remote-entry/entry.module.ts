import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { appRoutes } from '../app.routes';

/**
 * Módulo de entrada remoto para la aplicación Cofepris.
 * 
 * @export
 * @class RemoteEntryModule
 */
@NgModule({
  declarations: [
    // No hay declaraciones en este módulo
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RemoteEntryComponent
  ],
  providers: [
    provideRouter(appRoutes),
  ],
  bootstrap: []
})
export class RemoteEntryModule { }