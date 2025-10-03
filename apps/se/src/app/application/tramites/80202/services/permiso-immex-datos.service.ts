import { ImmexAmpliacionSensiblesStore, ImmexRegistroState } from '../estados/immex-ampliacion-sensibles.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { ImmexAmpliacionSensiblesQuery } from '../estados/immex-ampliacion-sensibles.query';
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
  constructor(private httpClient: HttpClient,private readonly tramite80202Store:ImmexAmpliacionSensiblesStore, private tramite80202Query: ImmexAmpliacionSensiblesQuery) {}

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<Solicitud110201State>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<ImmexRegistroState> {
    return this.tramite80202Query.selectSolicitud$;
  }
  
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
  getRegistroTomaMuestrasMercanciasData(): Observable<ImmexRegistroState> {
    return this.httpClient.get<ImmexRegistroState>('assets/json/80202/immexRegistro.json');
  }
  getNicos(): Observable<Catalogo[]> {
    return this.httpClient.get<Catalogo[]>('assets/json/80202/nico.json');
    
  }

   /**
   * Actualiza el estado del formulario en el store de Akita con los datos proporcionados.
   * @param {immexRegistroform} DATOS - Datos del formulario de registro IMMEX.
   * @returns {void}
   */
  actualizarEstadoFormulario(DATOS: ImmexRegistroState): void {
    this.tramite80202Store.updateImportacionAndExportacion(DATOS.importacion, DATOS.exportacion);
  }

}
