import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TramiteAsociados } from '../../../shared/models/tramite-asociados.model';
import { CancelacionPeticion261701State, Tramite261701Store } from '../estados/store/tramite261701.store';

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
  constructor(private http: HttpClient, private tramite261701Store: Tramite261701Store,) { }

  /**
   * Actualiza el estado del formulario estableciendo cada propiedad individualmente en el store
   */
  actualizarEstadoFormulario(DATOS: CancelacionPeticion261701State): void {
    Object.entries(DATOS).forEach(([key, value]) => {
      // Llamar a establecerDatos con cada clave y valor individual
      this.tramite261701Store.establecerDatos(key, value);
    });
  }

  /**
   * Obtiene los trámites asociados desde un archivo JSON.
   * Devuelve un observable con la lista de trámites asociados.
   */
  obtenerTramitesAsociados(): Observable<TramiteAsociados[]> {
    return this.http.get<TramiteAsociados[]>(
      'assets/json/261701/tramite-asociados.json'
    );
  }

  /**
   * Obtiene el estado de la cancelación de la petición desde un archivo JSON.
   * Devuelve un observable con el estado de la cancelación de la petición.
   */
  obtenerCancelacionPeticion(): Observable<CancelacionPeticion261701State> {
    return this.http.get<CancelacionPeticion261701State>('assets/json/261701/cancelacion-peticion.json');
  }
}