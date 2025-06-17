/**
 * @Injectable
 * @description Servicio para obtener los datos del permiso IMMEX.
 */
import { HttpClient } from '@angular/common/http';
import { ImmexAmpliacionSensiblesState } from '../estados/immex-ampliacion-sensibles.store';
import { ImmexAmpliacionSensiblesStore } from '../estados/immex-ampliacion-sensibles.store';
import { ImmexAmplicationSensibleDatosDelFormulario } from '../models/immex-ampliacion-sensibles.model';
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
   * @returns {Observable<any[]>} Observable que emite los datos del permiso IMMEX.
   */
  getDatos(): Observable<any> {
    return this.httpClient.get<any[]>(this.jsonUrl).pipe(
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
   * @method actualizarEstadoFormulario
   * @description
   * Actualiza el estado del formulario IMMEX en el store con los datos proporcionados.
   *
   * @param {immexRegistroform} DATOS - Los datos del formulario IMMEX a registrar en el estado.
   *
   * @returns {void}
   */
   actualizarEstadoFormulario(DATOS:ImmexAmplicationSensibleDatosDelFormulario): void {
    this.tramite80202Store.setFraccionArancelariaSensibles(DATOS.fraccionArancelariaSensibles);
    this.tramite80202Store.setFraccionArancelaria(DATOS.fraccionArancelaria);
    this.tramite80202Store.setDescripcionDelProducto(DATOS.descripciondelproducto);
    this.tramite80202Store.setTablaFraccionArancelaria(DATOS.tablaFraccionArancelaria);
    this.tramite80202Store.setTablaFraccionDeImportacion(DATOS.tablaFraccionDeImportacion);
   }
}
