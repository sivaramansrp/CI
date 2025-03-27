import { Injectable } from '@angular/core';
import { PermisoModel } from '../../shared/models/aviso-exportacion.model';

import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio que proporciona métodos para obtener datos relacionados con la exportación.
 */
@Injectable({
  providedIn: 'root'
})
export class ExportacionService {

  /**
   * Constructor del servicio `ExportacionService`.
   * @param http Cliente HTTP para realizar solicitudes a los archivos JSON.
   */
  constructor(private http: HttpClient) {
    //constructor
  }

  /**
   * Obtiene los datos de la localidad desde un archivo JSON.
   * @returns Un observable que emite los datos de la localidad.
   * En caso de error, lanza un observable con el error capturado.
   */
  getLocalidaddata(): Observable<unknown> {
    return this.http.get('assets/json/260604/exportacion.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos de la tabla de permisos desde un archivo JSON.
   * @returns Un observable que emite una lista de objetos `PermisoModel` con los datos de los permisos.
   */
  getTable(): Observable<PermisoModel[]> {
    return this.http.get<PermisoModel[]>('assets/json/260604/terceros.json');
  }
}