import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con la solicitud del trámite 31803.
 * Proporciona métodos para obtener datos necesarios desde fuentes externas.
 */
@Injectable({
  providedIn: 'root',
})
export class RegistroSolicitudService {
  /**
   * Constructor del servicio.
   * Se utiliza para la inyección de dependencias.
   *
   * @param http Cliente HTTP para realizar solicitudes a servicios externos.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene los datos del catálogo de bancos.
   * Realiza una solicitud HTTP para obtener la lista de bancos desde un archivo JSON.
   *
   * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
   */
  obtenerDatosBanco(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/31803/banco.json');
  }
}
