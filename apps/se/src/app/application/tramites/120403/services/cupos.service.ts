import { Catalogo } from '../state/Tramite120403.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con los cupos.
 * Proporciona métodos para obtener datos necesarios para el trámite.
 */
@Injectable({
  providedIn: 'root',
})
export class CuposService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos del catálogo de años.
   * Realiza una solicitud HTTP para obtener los datos desde un archivo JSON.
   * @returns Un observable que emite una lista de objetos del tipo `Catalogo`.
   */
  obtenerDatosAno(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120403/ano.json');
  }
}