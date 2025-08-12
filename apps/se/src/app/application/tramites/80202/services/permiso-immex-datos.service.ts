/**
 * @Injectable
 * @description Servicio para obtener los datos del permiso IMMEX.
 */
import { HttpClient } from '@angular/common/http';
import { ImmexAmpliacionSensiblesState } from '../estados/immex-ampliacion-sensibles.store';
import { ImmexAmpliacionSensiblesStore } from '../estados/immex-ampliacion-sensibles.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoImmexDatosService {
  /**
   * @property {string} jsonUrl
   * @description URL del archivo JSON que contiene los datos del permiso IMMEX.
   */
  private jsonUrl = '/assets/json/80202/immex-table.json';

  /**
   * @constructor
   * @description Constructor que inicializa el cliente HTTP para realizar solicitudes.
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private httpClient: HttpClient,private readonly tramite80202Store:ImmexAmpliacionSensiblesStore) {}

  /**
   * @method getDatos
   * @description Obtiene los datos del permiso IMMEX desde el archivo JSON.
   * @returns {Observable<unknown[]>} Observable que emite los datos del permiso IMMEX.
   */
  getDatos(): Observable<unknown> {
    return this.httpClient.get<unknown[]>(this.jsonUrl).pipe(
    );
  }  
  /**
   * @description
   * Obtiene los datos del registro de toma de muestras de mercancías para el trámite IMMEX.
   * Realiza una petición HTTP GET para recuperar la información desde un archivo JSON local.
   *
   * @returns Un observable que emite el estado del registro IMMEX.
   *
   * @memberof PermisoImmexDatosService
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<ImmexAmpliacionSensiblesState> {
    return this.httpClient.get<ImmexAmpliacionSensiblesState>('assets/json/80202/immexRegistro.json');
  }

  /**
   * Actualiza el estado del formulario de la solicitud en el store con la información proporcionada.
   * Cada propiedad del objeto recibido es asignada al store correspondiente.
   */
  actualizarEstadoFormulario(DATOS: ImmexAmpliacionSensiblesState): void {
    this.tramite80202Store.actualizarEstado(DATOS);
  }

}
