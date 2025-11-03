import { ApiResponseSolicitante, CatalogoLista, VehiculoTabla } from '../../models/registro-muestras-mercancias.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * @service modificarTerrestreService
 * @description
 * Servicio para gestionar las operaciones relacionadas con el aviso de traslado terrestre en el trámite 40103.
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
    // Lógica constructora
  }

  /**
   * Obtiene el catálogo de tipos de vehículo.
   * @returns Observable con la lista de catálogos de tipos de vehículo.
   */
  obtenerTipoDeVehiculo(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/40103/tipo-de-vehiculo.json`);
  }

  /**
   * Obtiene el catálogo de colores de vehículos.
   * @returns Observable con la lista de catálogos de colores de vehículos.
   */
  obtenerColorVehiculo(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/40103/vehiculo-color.json');
  }

  /**
    * Obtiene el catálogo de tipos de vehículo de arrastre.
    * @returns Observable con la lista de catálogos de vehículo de arrastre.
    */
  obtenerTipoArrastre(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/40103/tipo-vehiculo-arrastre.json`);
  }
  /**
  * Obtiene el catálogo de años.
  * @returns Observable con la lista de catálogos de años.
  */
  obtenerAno(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/40103/ano.json`);
  }

  /**
   * Obtiene la solicitud del país.
   * @returns Observable con la solicitud del país.
   */
  obtenerPaisEmisor(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/40103/pais-emisor-2da-placa.json`);
  }

  /**
   * Obtiene la tabla de pedimentos de vehículos.
   * @returns Observable con la tabla de vehículos.
   */
  obtenerPedimentoTabla(): Observable<VehiculoTabla> {
    return this.http.get<VehiculoTabla>(`assets/json/40103/vahiculo-dummy.json`);
  }

  /**
   * Obtiene los datos del solicitante desde la API.
   * @returns Observable con los datos del solicitante.
   */
  obtenerDatosSolicitante(): Observable<ApiResponseSolicitante> {
    const FULL_URL = `/api/sat-t40103/solicitud/modificar/iniciar`;
    return this.http.get<ApiResponseSolicitante>(FULL_URL, { headers: modificarTerrestreService.getApiHeaders() });
  }

}