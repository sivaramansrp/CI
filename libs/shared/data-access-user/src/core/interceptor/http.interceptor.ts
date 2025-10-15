import {
  EnvironmentInjector,
  inject,
  runInInjectionContext
} from '@angular/core';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
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

  /**
   * Injector de entorno utilizado para crear un nuevo contexto de inyección
   * fuera del ciclo de vida típico de un componente o servicio.
   */
  const INJECTOR = inject(EnvironmentInjector);

  /**
   * Ejecuta una función dentro del contexto de inyección proporcionado por `INJECTOR`.
   * Esto permite inyectar dependencias como servicios, incluso fuera del contexto típico de Angular.
   */
  return runInInjectionContext(INJECTOR, () => {
    /**
     * Servicio responsable de mostrar notificaciones en la aplicación.
     * Puede utilizarse para mostrar mensajes tras interceptar una solicitud.
     */
    const NOTIF = inject(NotificacionesService);

    /**
     * Clona la solicitud HTTP original y le agrega un encabezado `Authorization`
     * con un token de autenticación. El token puede obtenerse desde localStorage o sessionStorage.
     */
    const REQ = req.clone({
      setHeaders: {
        Authorization: 'Bearer dummy-token' // El token se obtiene desde localStorage o sessionStorage.
      }
    });

    return next(REQ).pipe(
      // Soft business-code handling for HTTP 200 responses
      tap((event) => {
        if (event instanceof HttpResponse) {
          const RESPONSE_BODY: unknown = event.body;
          // Narrow check that RESPONSE_BODY is an object with potential codigo field
          if (RESPONSE_BODY && typeof RESPONSE_BODY === 'object' && 'codigo' in (RESPONSE_BODY as Record<string, unknown>)) {
            const CODIGO = String((RESPONSE_BODY as { codigo?: unknown }).codigo ?? '');
            const IS_OK = (CODIGO === '00' || Number(CODIGO) === 0);
            if (!IS_OK) {
              const MENSAJE = (RESPONSE_BODY as { mensaje?: unknown }).mensaje as string || '"Ocurrió un error."';
              NOTIF.showNotification({
                tipoNotificacion: 'toastr',
                categoria: 'danger',
                mensaje: MENSAJE,
                titulo: 'Error',
                modo: '',
                cerrar: true,
                txtBtnAceptar: 'Aceptar',
                txtBtnCancelar: 'Cancelar',
              });
              // Soft mode: do not throw; allow existing success flows to continue
            }
          }
        }
      }),
      // HTTP error handling (non-2xx)
      catchError((error) => {
        const BACKEND_MSG = error?.error?.mensaje;
        const MENSAJE = BACKEND_MSG || '"Ocurrió un error."';
        NOTIF.showNotification({
          tipoNotificacion: 'toastr',
          categoria: 'danger',
          mensaje: MENSAJE,
          titulo: 'Error',
          modo: '',
          cerrar: true,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: 'Cancelar',
        });
        return throwError(() => error);
      })
    );
  });

};
