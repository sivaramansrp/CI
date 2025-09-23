/**
 * @Injectable
 * @description Servicio para obtener los datos del permiso IMMEX.
 */
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { ImmexAmpliacionSensiblesStore } from '../estados/immex-ampliacion-sensibles.store';
import { ImmexRegistroform } from '../models/immex-ampliacion-sensibles.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { immexRegistroform } from '../../80203/modelos/immex-registro-de-solicitud-modality.model';


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
  getRegistroTomaMuestrasMercanciasData(): Observable<immexRegistroform> {
    return this.httpClient.get<immexRegistroform>('assets/json/80202/immexRegistro.json');
  }
  getNicos(): Observable<Catalogo[]> {
    return this.httpClient.get<Catalogo[]>('assets/json/80202/nico.json');
  }

   /**
   * Actualiza el estado del formulario en el store de Akita con los datos proporcionados.
   * @param {immexRegistroform} DATOS - Datos del formulario de registro IMMEX.
   * @returns {void}
   */
  actualizarEstadoFormulario(DATOS: ImmexRegistroform): void {
    this.tramite80202Store.setImmexRegistro(DATOS);
  }

}
