import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Tramite40403Store } from './tramite40403.store';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class Tramite40403Service {
  /**
   * Ruta base para acceder a los archivos JSON locales relacionados con el trámite.
   */
  baseUrl = '../../../../../assets/json/40403/';

  /**
   * Constructor del servicio.
   * @param tramite40403Store - Almacén de estado para gestionar datos relacionados con el trámite.
   * @param http - Cliente HTTP para realizar solicitudes a la API o cargar recursos.
   */
  constructor(
    private tramite40403Store: Tramite40403Store,
    private http: HttpClient
  ) {}

  /**
   * Obtiene el catálogo de tipos de CAAT aéreo desde un archivo JSON local.
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
   */
  getTipoDeCaatAerea(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40403/tipo-CAAT-aéreo.json');
  }

  /**
   * Obtiene el catálogo de códigos de transportación aérea desde un archivo JSON local.
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
   */
  geTideCodTransportacionAerea(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40403/codigo.json');
  }

  /**
   * Busca una solicitud utilizando el valor de `claveFolioCAAT` proporcionado.
   * @param claveFolioCAAT - Clave única del folio CAAT para realizar la búsqueda.
   * @returns Un observable que emite los datos de la solicitud encontrada o un error en caso de fallo.
   */
  buscarSolicitudPorCAATe(claveFolioCAAT: string): Observable<any> {
    const baseUrl = `/api/solicitud/buscarPorCAAT?claveFolioCAAT=${claveFolioCAAT}`;
    return this.http.get<any>(baseUrl).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
