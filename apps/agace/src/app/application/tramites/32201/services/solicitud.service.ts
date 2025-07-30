import { Solicitud32201State, Tramite32201Store } from '../estados/tramite32201.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
 
  constructor(private http: HttpClient, private tramite32201Store: Tramite32201Store) { }

  /**
       * Actualiza el estado global del formulario con los datos proporcionados.
       * @param DATOS Objeto con los datos del formulario de tipo Solicitud32201State.
       */
  actualizarEstadoFormulario(DATOS: Solicitud32201State): void {
    this.tramite32201Store.setRegimen_0(DATOS.regimen_0);
    this.tramite32201Store.setRegimen_1(DATOS.regimen_1);
    this.tramite32201Store.setRegimen_2(DATOS.regimen_2);
    this.tramite32201Store.setRegimen_3(DATOS.regimen_3);
    this.tramite32201Store.setManifiesto(DATOS.manifiesto);

  }
  /**
   * @method getDatosConsulta
   * @description Obtiene los datos de consulta desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de consulta simulados desde el archivo `consultaDatos.json`.
   * 
   * @returns {Observable<RespuestaConsulta>} Un observable que emite la respuesta de los datos de consulta.
   */
  getDatosConsulta(): Observable<Solicitud32201State> {
    return this.http.get<Solicitud32201State>('assets/json/32201/consultaDatos.json');
  }

}
