import { catchError, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';

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

  const REQ = req.clone({
    setHeaders: {
      Authorization: 'Bearer dummy-token' // El token se obtiene desde localStorage o sessionStorage.
    }
  });

  return next(REQ).pipe(
    catchError((error) => {
      // Puedes registrar el error o mostrar un mensaje al usuario
      console.error('Error HTTP:', error);

      // Opcionalmente, personaliza la lógica de manejo de errores aquí

      // Re-lanza el error para que otras partes de la aplicación también puedan manejarlo
      return throwError(() => error);
    })
  );
};
