import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TramiteAsociados } from '../../../shared/models/tramite-asociados.model';

/**
 * Servicio para gestionar la cancelación de peticiones.
 * Este servicio se encarga de realizar solicitudes HTTP
 * para obtener información relacionada con la cancelación de peticiones.
 */
@Injectable({
  providedIn: 'root',
})
export class CancelacionPeticionService {
  /**
   * Constructor del servicio.
   * Inicializa el cliente HTTP para realizar solicitudes.
   * http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los trámites asociados desde un archivo JSON.
   * Devuelve un observable con la lista de trámites asociados.
   */
  obtenerTramitesAsociados(): Observable<TramiteAsociados[]> {
    return this.http.get<TramiteAsociados[]>(
      'assets/json/261701/tramite-asociados.json'
    );
  }
}