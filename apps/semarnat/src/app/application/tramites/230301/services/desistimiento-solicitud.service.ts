import { Solicitud230301State, Solicitud230301Store } from '../estados/tramites/tramites230301.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaDesistimientoSolicitud } from '../models/disponsibles.model';
import { URL } from '../enum/constants';


@Injectable({
  providedIn: 'root'
})
export class DesistimientoSolicitudService {

  /**
   * URL base para las solicitudes HTTP.
   * @type {string}
   */
  url: string = URL;

  /**
   * Constructor de la clase `DesistimientoSolicitudService`.
   * Inicializa el servicio HTTP para realizar solicitudes.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(private readonly http: HttpClient,
    public tramite230301Store:Solicitud230301Store,
  ) { 
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * Obtiene los datos de desistimiento de una solicitud desde el servidor.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de desistimiento
   * de una solicitud específica.
   * 
   * @param {string} name - Nombre del recurso o archivo a obtener.
   * @returns {Observable<any>} Observable que emite los datos obtenidos del servidor.
   */
  
  getDesistimientoSolicitud(name: string): Observable<RespuestaDesistimientoSolicitud> {
    const BASEURL = this.url + name;
    return this.http.get<RespuestaDesistimientoSolicitud>(BASEURL);
  }

    /**
 * Actualiza el estado del formulario con los datos proporcionados.
 * 
 * @param DATOS - Estado de la solicitud `Solicitud230401State` con la información 
 *                del tipo de solicitud a actualizar en el store.
 */
actualizarEstadoFormulario(DATOS: Solicitud230301State): void {
  this.tramite230301Store.update((state) => ({
    ...state,
    ...DATOS
  }))

}

/**
* Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
* 
* @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
*          cargados desde el archivo JSON especificado en la ruta de `assets`.
*/
getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud230301State> {
  return this.http.get<Solicitud230301State>('assets/json/230301/respuestaDeActualizacionDe.json');
}
}