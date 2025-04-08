import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudCatologo } from '../../models/solicitud.model';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
/**
 * Servicio `SolicitudService` encargado de manejar las solicitudes relacionadas con los catálogos de trámites.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Servicio `SolicitudService` encargado de manejar las solicitudes relacionadas con los catálogos de trámites.
 */
export class SolicitudService {
  /**
   * @description Constructor del servicio donde se inyecta el cliente HTTP para realizar peticiones.
   * @param http Cliente HTTP proporcionado por Angular para realizar solicitudes a recursos externos.
   */
  constructor(public http: HttpClient) {
    // Inicialización si se requiere.
  }

  /**
   * @description Método que obtiene el catálogo de solicitudes desde un archivo JSON local.
   * Utiliza el cliente HTTP para realizar la petición y gestiona errores en caso de que ocurran.
   * @returns {Observable<SolicitudCatologo>} Un observable con la respuesta del archivo JSON.
   */
  public conseguirSolicitudCatologo(): Observable<SolicitudCatologo> {
    return this.http
      .get<SolicitudCatologo>('assets/json/6101/solicitud-catalogo.json')
      .pipe(
        catchError((error) => {
          // En caso de error, se lanza la excepción utilizando `throwError`.
          return throwError(() => error);
        })
      );
  }
}
