
import { ApiResponseSolicitante, CatalogoLista, VehiculoTabla } from '../../models/registro-muestras-mercancias.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IniciarResponse } from '../../../40101/pages/solicitante-page/solicitante-page.component';
/**
 * @service modificarTerrestreService
 * @description
 * Servicio para gestionar las operaciones relacionadas con el aviso de traslado terrestre en el trámite 40102.
 * Proporciona métodos para obtener catálogos, tablas de vehículos y otros datos necesarios para el trámite.
 *
 * @providedIn root
 */
@Injectable({
  providedIn: 'root'
})
export class modificarTerrestreService {
  private static getApiHeaders(): HttpHeaders {
    const CLAVEUSUARIO = localStorage.getItem('ClaveUsuario') || '';
    const RFC = localStorage.getItem('Rfc') || '';
    const CVEROLE = localStorage.getItem('CveRole') || '';

    return new HttpHeaders({
      'ClaveUsuario': CLAVEUSUARIO,
      'Rfc': RFC,
      'CveRole': CVEROLE
    });
  }
  /**
  * Constructor del servicio.
  * @param http Cliente HTTP para realizar peticiones a recursos locales o remotos.
  */
  constructor(private http: HttpClient) {
    // Constructor
  }

  guardarDatosTramite(datos: unknown): Observable<IniciarResponse> {
    const FULL_URL = '/api/sat-t40102/solicitud/renovar/guardar';
    return this.http.post<IniciarResponse>(FULL_URL, datos, { headers: modificarTerrestreService.getApiHeaders() });
  }

  /**
    * Obtiene el catálogo de tipos de vehículo de arrastre.
    * @returns Observable con la lista de catálogos de tipos de vehículo.
    */
  obtenerTipoDeVehiculo(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/40102/tipo-vehiculo-arrastre.json`);
  }

  /**
     * Obtiene los datos del solicitante desde el API.
     * @returns Observable con los datos del solicitante.
     */
  obtenerDatosSolicitante(): Observable<ApiResponseSolicitante> {
    const FULL_URL = '/api/sat-t40102/solicitud/renovar/iniciar';
    return this.http.get<ApiResponseSolicitante>(FULL_URL, { headers: modificarTerrestreService.getApiHeaders() });
  }


  /**
   * Obtiene la tabla de pedimentos de vehículos.
   * @returns Observable con la tabla de vehículos.
   */
  obtenerPedimentoTabla(): Observable<VehiculoTabla> {
    return this.http.get<VehiculoTabla>(`assets/json/40102/vahiculo-dummy.json`);
  }


  firmaDatos(datos: unknown): Observable<IniciarResponse> {
    const FULL_URL = '/api/sat-t40102/solicitud/renovar/202819905/firmar';
    return this.http.post<IniciarResponse>(FULL_URL, datos, { headers: modificarTerrestreService.getApiHeaders() });
  }

}