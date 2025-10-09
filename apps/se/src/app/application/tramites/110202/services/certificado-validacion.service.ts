import { Catalogo, ENVIRONMENT, HttpCoreService, JSONResponse, JsonResponseCatalogo } from '@libs/shared/data-access-user/src';
import { ColumnasTabla, SeleccionadasTabla } from '../constantes/modificacion.enum';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Tramite110202Store, TramiteState } from '../estados/tramite110202.store';
import { API_ROUTES } from '../servers/api-route';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { Tramite110202Query } from '../estados/tramite110202.query';

@Injectable({
  providedIn: 'root'
})
export class CertificadoValidacionService {
  /**
   * URL base del servidor principal.
   */
  urlServer = ENVIRONMENT.URL_SERVER;

  /**
   * URL base del servidor de catálogos auxiliares.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

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
    public tramite110202Store: Tramite110202Store,
    public Tramite110202Query: Tramite110202Query,
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
    this.tramite110202Store.update((state) => ({
      ...state,
      ...DATOS
    }));

  }
  /**
   * Obtiene el catálogo de tratados.
   * @returns Observable con la respuesta del catálogo de tratados.
   */
  getTratado(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/tratado.json');
  }

  /**
   * Obtiene el catálogo de países.
   * @returns Observable con la respuesta del catálogo de países.
   */
  getPais(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/pais.json');
  }
  
/**
 * Obtiene todos los datos del estado almacenado en el store.
 * @returns {Observable<Solicitud110201State>} Observable con todos los datos del estado.
 */
getAllState(): Observable<TramiteState> {
  return this.Tramite110202Query.selectSolicitud$;
}

  /**
   * Obtiene el catálogo de idiomas.
   * @returns Observable con la respuesta del catálogo de idiomas.
   */
  getIdioma(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/idioma.json');
  }

  /**
   * Obtiene el catálogo de países de destino.
   * @returns Observable con la respuesta del catálogo de países de destino.
   */
  getPaisDestino(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/pais-destino.json');
  }

  /**
   * Obtiene el catálogo de transportes.
   * @returns Observable con la respuesta del catálogo de transportes.
   */
  getTransporte(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/transporte.json');
  }
  obtenerDatosAno(): Observable<Catalogo[]> {
      return this.http.get<Catalogo[]>('assets/json/120403/ano.json');
    }

  /**
   * Obtiene el catálogo de entidades.
   * @returns Observable con la respuesta del catálogo de entidades.
   */
  getEntidad(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/entidad.json');
  }

  /**
   * Obtiene el catálogo de representaciones.
   * @returns Observable con la respuesta del catálogo de representaciones.
   */
  getRepresentacion(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/representacion.json');
  }

  /**
   * Obtiene el catálogo de tipos de factura.
   * @returns Observable con la respuesta del catálogo de tipos de factura.
   */
  getTipoFactura(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/tipofactura.json');
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial (UMC).
   * @returns Observable con la respuesta del catálogo de UMC.
   */
  getUMC(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/umc.json');
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   * @returns Observable con la respuesta del catálogo de unidades de medida.
   */
  getUnidadMedida(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110201/umc.json');
  }

  /**
   * Obtiene un catálogo específico por su identificador.
   * @param id Identificador del catálogo.
   * @returns Observable con la respuesta del catálogo solicitado.
   */
  getCatalogoById(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`);
  }

  /**
    * Recupera la lista de "Registro de Solicitudes" desde un archivo JSON.
    *
    * @returns {Observable<ColumnasTabla[]>} Un observable que contiene un array de objetos RegistroDeSolicitudesTabla.
    *
    * @throws Lanzará un error si la solicitud HTTP falla.
    */
  public getSolicitudesTabla(): Observable<ColumnasTabla[]> {
    return this.http.get<ColumnasTabla[]>('assets/json/110201/mercancia-disponsible.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getSolicitudesDataTabla(): Observable<SeleccionadasTabla[]> {
    return this.http.get<SeleccionadasTabla[]>('assets/json/110201/mercancia-seleccionadas.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
buscarMercanciasCert(body: any): Observable<any> {
  // return this.httpService.post<any>(
  //   'http://localhost:8080/api/sat-t110202/solicitud/buscar-mercancias',
  //   { body: body }
  // );
   return this.httpService.post<any>(this.apiRoutes.BUSCAR, { body: body });
}

/**
 * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
 * 
 * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
 * @returns Observable con la respuesta de la solicitud POST.
 */
guardarDatosPost(body: any) : Observable<any>{
  return this.httpService.post<any>(this.apiRoutes.GUARDAR, { body: body });
  // return this.httpService.post<any>('http://localhost:8080/api/sat-t110202/solicitud/guardar', { body: body });
}
}
