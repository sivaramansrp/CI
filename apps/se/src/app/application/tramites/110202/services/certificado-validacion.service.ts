import { Catalogo, HttpCoreService, JsonResponseCatalogo } from '@libs/shared/data-access-user/src';
import { Observable, map } from 'rxjs';
import { Tramite110202Store, TramiteState } from '../estados/tramite110202.store';
import { API_ROUTES } from '../servers/api-route';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

@Injectable({
  providedIn: 'root'
})
export class CertificadoValidacionService {

  /**
   * Almacena el nombre o identificador del procedimiento actual.
   *
   * @private
   */
  private _procedure: string = 'sat-t110202';

  /**
   * Almacena el nombre o identificador del procedimiento actual.
   *
   * @private
   */
  private _procedureNo: string = '';

  constructor(
    private http: HttpClient,
    public tramite110222Store: Tramite110202Store,
    public httpService: HttpCoreService) {
    // No se necesita lógica de inicialización adicional.
  }

    /**
     * Obtiene las rutas de la API específicas para el procedimiento actual.
     *
     * @returns Un objeto con las rutas de la API generadas por la función `API_ROUTES` usando el procedimiento actual.
     */
    private get apiRoutes(): ReturnType<typeof API_ROUTES> {
      return API_ROUTES(this._procedure, this._procedureNo);
    }

  /**
   * Obtiene la lista de TratadoAcuerdo desde un archivo JSON local.
   * @method obtenerListaTratadoAcuerdo
   * @returns {Observable<Catalogo[]>} Observable con la lista de TratadoAcuerdo.
   */
  obtenerListaTratadoAcuerdo(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('./assets/json/110202/tratado-acuerdo.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene la lista de países bloque desde un archivo JSON local.
   * @method obtenerPaisBloque
   * @returns {Observable<Catalogo[]>} Observable con la lista de países bloque.
   */
  obtenerPaisBloque(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110202/pais-bloque.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene la lista de mercancías desde un archivo JSON local.
   * @method obtenerMercancia
   * @returns {Observable<Mercancia[]>} Observable con la lista de mercancías.
   */
  obtenerMercancia(): Observable<Mercancia[]> {
    return this.http
      .get<{ data: Mercancia[] }>('assets/json/110202/mercancia.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene la lista de idiomas desde un archivo JSON local.
   * @method obtenerIdioma
   * @returns {Observable<Catalogo[]>} Observable con la lista de idiomas.
   */
  obtenerIdioma(): Observable<Catalogo[]> {
    return this.httpService.get<Catalogo[]>(
          this.apiRoutes.IDIOMA,
          {},
          false
        );
  }

  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON local.
   * @method obtenerEntidadFederativa
   * @returns {Observable<Catalogo[]>} Observable con la lista de entidades federativas.
   */
  obtenerEntidadFederativa(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
          this.apiRoutes.ENTIDAD_FEDERATIVA,
          {},
          false
        );
  }

  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON local.
   * @method obtenerRepresentacionFederal
   * @returns {Observable<Catalogo[]>} Observable con la lista de representaciones federales.
   */
  obtenerRepresentacionFederal(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
          this.apiRoutes.REPRESENTACION_FEDERAL,
          {},
          false
        );
  }

  /**
 * Obtiene la lista de facturas desde un archivo JSON local.
 * @method obtenerFacturas
 * @returns {Observable<Catalogo[]>} Observable con la lista de facturas.
 */
  obtenerFacturas(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110202/factura.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene la lista de UMC desde un archivo JSON local.
   * @method obtenerUmc
   * @returns {Observable<Catalogo[]>} Observable con la lista de UMC.
   */
  obtenerUmc(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110202/umc.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene una lista de países destino desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un Observable que emite un arreglo de objetos Catalogo con la información de los países destino.
   */
  obtenerPaisDestino(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>(`assets/json/110202/pais-destinatario.json`)
      .pipe(map((res) => res.data));
  }

  /**
  * Obtiene una lista de medios de transporte desde un archivo JSON.
  * @returns {Observable<Catalogo[]>} Un Observable que emite un arreglo de objetos Catalogo con la información de los medios de transporte.
  */
  obtenerMedioDeTransporte(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>(`assets/json/110202/medio-de-transporte.json`)
      .pipe(map((res) => res.data));
  }
  /**
 * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
 * 
 * @returns Observable con los datos del estado de la solicitud `TramiteState`,
 *          cargados desde el archivo JSON especificado en la ruta de `assets`.
 */
  getRegistroTomaMuestrasMercanciasData(): Observable<TramiteState> {
    return this.http.get<TramiteState>('assets/json/110202/datos-previos.json');
  }


  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * 
   * @param DATOS - Estado de la solicitud `TramiteState` con la información 
   *                del tipo de solicitud a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: TramiteState): void {
    this.tramite110222Store.update((state) => ({
      ...state,
      ...DATOS
    }))

  }

}
