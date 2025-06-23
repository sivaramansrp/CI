/**
 * @Injectable
 * @description Servicio para obtener los datos del permiso IMMEX.
 */
import { ImmexRegistroState, ImmexRegistroStore } from '../../estados/tramites/tramite80203.store';
import { ImmexTablaJson, immexRegistroform } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { HttpClient } from '@angular/common/http';
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
  private jsonUrl = '/assets/json/80203/immex-table.json';

  /**
   * @constructor
   * @description Constructor que inicializa el cliente HTTP para realizar solicitudes.
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private httpClient: HttpClient,private readonly tramite80203Store:ImmexRegistroStore) {}

  /**
   * @method getDatos
   * @description Obtiene los datos del permiso IMMEX desde el archivo JSON.
   * @returns {Observable<any[]>} Observable que emite los datos del permiso IMMEX.
   */
  getDatos(): Observable<ImmexTablaJson> {
    return this.httpClient.get<ImmexTablaJson>(this.jsonUrl).pipe(
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
  getRegistroTomaMuestrasMercanciasData(): Observable<ImmexRegistroState> {
    return this.httpClient.get<ImmexRegistroState>('assets/json/80203/immexRegistro.json');
  }
  /**
   * @method actualizarEstadoFormulario
   * @description
   * Actualiza el estado del formulario IMMEX en el store con los datos proporcionados.
   *
   * @param {immexRegistroform} DATOS - Los datos del formulario IMMEX a registrar en el estado.
   *
   * @returns {void}
   */
   actualizarEstadoFormulario(DATOS:immexRegistroform): void {
    this.tramite80203Store.setImmexRegistro(DATOS);
   }
}
