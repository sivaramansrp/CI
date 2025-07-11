import {
  EnvironmentInjector,
  inject,
  runInInjectionContext
} from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { NotificacionesService } from '../services/shared/notificaciones.service';

/**
 * Interceptor HTTP que añade un token de autorización a todas las solicitudes salientes
 * y maneja errores que puedan ocurrir durante la comunicación HTTP.
 *
 * @param req - La solicitud HTTP original.
 * @param next - El siguiente manejador en la cadena de interceptores.
 * @returns Una solicitud HTTP modificada con el encabezado de autorización y manejo de errores.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const httpInterceptorFn: HttpInterceptorFn = (req, next) => {

  const INJECTOR = inject(EnvironmentInjector);

  return runInInjectionContext(INJECTOR, () => {
    const NOTIF = inject(NotificacionesService);

    const REQ = req.clone({
      setHeaders: {
        Authorization: 'Bearer dummy-token' // El token se obtiene desde localStorage o sessionStorage.
      }
    });
  
    return next(REQ).pipe(
      catchError((error) => {
       // Note : reemplazar con el objeto necesario para modificar el cuadro de diálogo de mensaje de error
        NOTIF.showNotification({
          tipoNotificacion: 'toastr',
          categoria: 'danger',
          mensaje: 'An error occurred.',
          titulo: 'Error',
          modo: '',
          cerrar: true,
          txtBtnAceptar: 'OK',
          txtBtnCancelar: 'Cancel',
        });
  
        // Re-lanza el error para que otras partes de la aplicación también puedan manejarlo
        return throwError(() => error);
      })
    );
  });
 
};
