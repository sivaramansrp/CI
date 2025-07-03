import { Injectable } from '@angular/core';
import { Catalogo } from '../state/Tramite30506.store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  /**
    * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
    */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * Se utiliza para la inyección de dependencias.
   *
   * @param http Cliente HTTP para realizar solicitudes a servicios externos.
   */
  constructor(
    private http: HttpClient,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene los datos del catálogo de bancos.
   * Realiza una solicitud HTTP para obtener la lista de bancos desde un archivo JSON.
   *
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
   */
  obtenerDatosBanco(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/30506/banco.json');
  }

}
