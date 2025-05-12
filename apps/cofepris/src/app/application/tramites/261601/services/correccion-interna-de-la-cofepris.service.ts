
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TramitesAsociados } from '../models/destinatario.model';

@Injectable({
  providedIn: 'root'
})
export class CorreccionInternaDeLaCofeprisService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(private http: HttpClient) {}

  /**
   * Método para obtener los trámites asociados desde un archivo JSON.
   * @returns Un observable que emite una lista de trámites asociados.
   */
  getTramitesAsociados(): Observable<TramitesAsociados[]> {
      return this.http.get<TramitesAsociados[]>('./assets/json/261601/tramitesasociados.json');
    }

  /**
   * Método para obtener los datos de la solicitud desde un archivo JSON.
   * @returns Un observable que emite una lista con los datos de la solicitud.
   */
  getSolicitudData(): Observable<TramitesAsociados[]> {
    return this.http.get<TramitesAsociados[]>('./assets/json/261601/solicitud.json');
  }

}
