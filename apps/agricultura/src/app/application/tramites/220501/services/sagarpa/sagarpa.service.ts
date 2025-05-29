import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

/**
 * Servicio para gestionar las operaciones relacionadas con SAGARPA.
 */
@Injectable({
  providedIn: 'root'
})
export class SagarpaService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Método para obtener los medios de transporte.
   * @returns Observable con la respuesta de los catálogos de medios de transporte.
   */
  getMediodetransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/medio-transporte.json');
  }
}
