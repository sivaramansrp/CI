import { Facturador } from '../../../shared/models/terceros-relacionados.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite260302Store } from '../estados/tramite260302Store.store';

@Injectable({
  providedIn: 'root',
})
export class ExportacionMateriasPrimasService {
  /**
   * @property {string} jsonUrl
   * Ruta relativa al archivo JSON que contiene los datos del domicilio.
   * Usado para cargar información desde el frontend (assets).
   * @private
   */
  private jsonUrl = 'assets/json/260301/';

  constructor(public httpServicios: HttpClient, private tramite260302Store: Tramite260302Store) {
    // Constructor necesario para inyectar el servicio HttpClient
  }

  /**
   * Método para obtener datos de un "Facturador" desde un archivo JSON remoto.
   * Realiza una solicitud HTTP GET a la URL especificada y devuelve un observable
   * que emite el resultado de la petición.
   * 
   * @returns {Observable<Facturador>} Un observable que emite los datos de un facturador.
   */
  obtenerOstro(): Observable<Facturador> {
    return this.httpServicios.get<Facturador>(
      this.jsonUrl + 'buscar-otros.json'
    );
  }
  /*
  * Actualiza el estado del formulario en el store a partir de los datos proporcionados.
  * @param datos Estado actual del formulario de trámite 260206.
  */
 actualizarEstadoFormulario(datos: Tramite260302Store): void {
   this.tramite260302Store.update((state) => {
     return {
       ...state, ...datos
     }
   });
 }

 /**
  * Obtiene los datos del trámite 260206 desde un archivo JSON local.
  *
  * @returns {Observable<Tramite260206State>} Un observable que emite el estado del trámite 260206.
  */
 getTramiteDatos(): Observable<Tramite260302Store> {
   return this.httpServicios.get<Tramite260302Store>('assets/json/260302/datos.json');
 }

}
