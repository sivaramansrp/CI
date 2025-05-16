import { Route } from '@angular/router';

/**
 * Rutas principales para la aplicación Cofepris.
 * 
 * @export
 * @const {Route[]}
 */
export const APP_ROUTES: Route[] = [
  /**
   * Ruta principal que carga las rutas remotas.
   * 
   * @type {Route}
   */
  {
    path: '',
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
];