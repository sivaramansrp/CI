import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar la obtención de datos relacionados con los catálogos del trámite 32514.
 */
@Injectable({
  providedIn: 'root'
})
export class AdaceService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP utilizado para realizar solicitudes a los recursos JSON.
   */
  constructor(private http: HttpClient) {
    // Constructor utilizado para la creación de objetos requeridos en el componente
  }

  /**
   * Obtiene los datos del catálogo de años.
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo` con los datos de los años.
   */
  obtenerDatosAno(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32514/ano.json');
  }

  /**
   * Obtiene los datos del catálogo de meses.
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo` con los datos de los meses.
   */
  obtenerDatosMes(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32514/mes.json');
  }
}