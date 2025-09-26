import {
  AnexoDosEncabezado,
  AnexoUnoEncabezado,
} from '../models/nuevo-programa-industrial.model';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import {
  Catalogo,
  HttpCoreService,
  JSONResponse,
  JsonResponseCatalogo,
} from '@ng-mf/data-access-user';
import { API_ROUTES } from '../servers/api-route';
import { ENVIRONMENT } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlantsEmpresaSubfabricante } from '../../tramites/130118/model/request/guardar-solicitud-request.model';
import { PlantasSubfabricante } from '../models/empresas-subfabricanta.model';

@Injectable({
  providedIn: 'root',
})
export class ComplimentosService {
  /**
   * Subject que mantiene la fila seleccionada del Anexo Uno.
   * Permite emitir y reaccionar a cambios en la selección de filas de forma reactiva.
   */
  private _anexoUnoFilaSeleccionada$ =
    new BehaviorSubject<AnexoUnoEncabezado | null>(null);
  /**
   * Observable que expone la fila seleccionada del Anexo Uno.
   * Permite a otros componentes suscribirse a los cambios sin modificar directamente el estado.
   */
  public anexoUnoFilaSeleccionada$ =
    this._anexoUnoFilaSeleccionada$.asObservable();
  /**
   * Subject que almacena la fila seleccionada del Anexo Dos.
   * Facilita la comunicación reactiva cuando cambia la selección de filas en el Anexo Dos.
   */
  private _anexoDosFilaSeleccionada$ =
    new BehaviorSubject<AnexoDosEncabezado | null>(null);

  /**
   * Almacena el nombre o identificador del procedimiento actual.
   *
   * @private
   */
  private _procedure: string = '';

  /**
   * Almacena el nombre o identificador del procedimiento actual.
   *
   * @private
   */
  private _procedureNo: string = '';

  /**
   * Observable que expone la fila seleccionada del Anexo Dos.
   * Permite a otros componentes reaccionar a los cambios en la selección de filas sin modificar el estado directamente.
   */
  public anexoDosFilaSeleccionada$ =
    this._anexoDosFilaSeleccionada$.asObservable();

  constructor(
    private readonly http: HttpClient,
    public httpService: HttpCoreService
  ) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<RespuestaCatalogos>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<Catalogo[]> {
    return (
      this.http
        .get<Catalogo[]>('assets/json/funcionario/estado.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((res: any) => res.data))
    );
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
   * @method getDatos
   * Método para obtener datos desde un archivo JSON.
   * @returns {Observable<unknown>} Un Observable que emite los datos obtenidos o un error.
   */
  getDatos(): Observable<unknown> {
    return this.http
      .get('assets/json/80102/pagoderechos.json') // Realiza una solicitud GET al archivo JSON.
      .pipe(
        catchError((error: unknown) => {
          // Maneja errores en la solicitud.
          return throwError(() => error); // Lanza el error para que pueda ser manejado por el suscriptor.
        })
      );
  }

  /**
   * Recupera una lista de países desde el API de catálogo.
   *
   * @returns Un Observable que emite la respuesta con un arreglo de países.
   */
  getPais(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      this.apiRoutes.PAIS,
      {},
      false
    );
  }

  /**
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getEstado(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      this.apiRoutes.ESTADO,
      {},
      false
    );
  }
  /**
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getActividadProductiva(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      this.apiRoutes.ActividadProductiva,
      {},
      false
    );
  }

  /**
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getRepresentacion(id: string): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      `${this.apiRoutes.RepresentacionFederal}/${id}`,
      {},
      false
    );
  }

  /**
   * Obtiene la información de un tipo de documento específico según su identificador.
   *
   * @param id - El identificador único del tipo de documento a consultar.
   * @returns Un observable que emite la respuesta JSON con los datos del catálogo del tipo de documento.
   */
  getTipoDocumento(id: number): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      `${this.apiRoutes.TipoDocumento}/${id}`,
      {},
      false
    );
  }

  /**
   * Obtiene el catálogo de municipios de México correspondientes a una entidad específica.
   *
   * @param cveEntidad - Clave numérica de la entidad federativa para la cual se desean obtener los municipios.
   * @returns Un observable que emite la respuesta en formato `JsonResponseCatalogo` con el listado de municipios.
   */
  getmunicipio(cveEntidad: string): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      `${this.apiRoutes.estadoImex}/${cveEntidad}`,
      {},
      false
    );
  }

  /**
   * Obtiene el estado IMEX correspondiente a la clave de entidad proporcionada.
   *
   * @param cveEntidad - Clave de la entidad para la cual se solicita el estado IMEX.
   * @returns Un observable que emite la respuesta en formato JsonResponseCatalogo.
   */
  getEstadoImex(cveEntidad: string): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      `${this.apiRoutes.estadoImex}/${cveEntidad}`,
      {},
      false
    );
  }


  /**
   * Obtiene la información de una categoría de tipo según el valor de la clave enumerada proporcionada.
   *
   * @param cveEnum - Clave enumerada que identifica el tipo de categoría a consultar.
   * @returns Un observable que emite la respuesta JSON del catálogo correspondiente.
   */
  getTipCategoria(cveEnum: string): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      `${this.apiRoutes.tipoCategoria}/${cveEnum}`,
      {},
      false
    );
  }

  /**
   * Obtiene información del servicio IMMEX desde el catálogo correspondiente.
   *
   * Realiza una solicitud HTTP GET al endpoint definido en `apiRoutes.servicoImex`
   * y retorna la respuesta como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo IMMEX.
   */
  getServicoImmex(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      this.apiRoutes.servicoImex,
      {},
      false
    );
  }

  /**
   * Establece la fila seleccionada del Anexo Uno.
   * Emite el nuevo valor a todos los suscriptores del observable correspondiente.
   */
  setAnexoUnoFilaSeleccionada(row: AnexoUnoEncabezado | null): void {
    this._anexoUnoFilaSeleccionada$.next(row);
  }

  /**
   * Establece la fila seleccionada del Anexo Dos.
   * Emite el nuevo valor a todos los suscriptores del observable correspondiente.
   */
  setAnexoDosFilaSeleccionada(row: AnexoDosEncabezado | null): void {
    this._anexoDosFilaSeleccionada$.next(row);
  }

  /**
   * Establece el procedimiento actual.
   *
   * @param procedure - El nombre del procedimiento a asignar.
   */
  setProcedure(procedure: string): void {
    this._procedure = procedure;
  }

   /**
   * Establece el procedimiento actual.
   * @param procedureNo - El nombre del procedimiento a asignar.
   */
  setProcedureNo(procedureNo: string): void {
    this._procedureNo = procedureNo;
  }

  /**
   * Obtiene información del tipo inversion desde el catálogo correspondiente.
   *
   * Realiza una solicitud HTTP GET al endpoint definido en `apiRoutes.tipoInversion`
   * y retorna la respuesta como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de tipo inversión.
   */
  getTipoInversion(tipo: string): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      `${this.apiRoutes.tipoInversion}/${tipo}`,
      {},
      false
    );
  }

  /**
   * Obtiene información del tipo categoria desde el catálogo correspondiente.
   *
   * Realiza una solicitud HTTP GET al endpoint definido en `apiRoutes.tipoCategoria`
   * y retorna la respuesta como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de tipo categoría.
   */
  getTipoCategoria(tipo: string): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      `${this.apiRoutes.tipoCategoria}/${tipo}`,
      {},
      false
    );
  }

    /**
     * Obtiene la lista de subfabricantes disponibles.
     * @method getSubfabricantesDisponibles
     * @returns {Observable<TableData>} Observable con la lista de subfabricantes disponibles.
     */
    getSubfabricantesDisponibles(body: PlantsEmpresaSubfabricante): Observable<JSONResponse> {
      return this.http.post<JSONResponse>(API_ROUTES().buscarPlantas, body).pipe(
        map((response) => response),
        catchError(() => {
          const ERROR = new Error(`Error al obtener la lista de subfabricantes en ${API_ROUTES().buscarPlantas}`);
          return throwError(() => ERROR);
        })
      );
    }

    /**
 * Construye el domicilio fiscal completo a partir de los datos de domicilio
 * @param domicilio - Objeto domicilioDto
 * @param empresaDomicilio - Objeto domicilioSolicitud de empresaDto
 * @returns String con el domicilio fiscal completo
 */
// eslint-disable-next-line class-methods-use-this
private buildDomicilioFiscal(domicilio: any, empresaDomicilio: any = {}): string {
  const CALLE = domicilio.calle || empresaDomicilio.calle || '';
  const NUM_EXTERIOR = domicilio.numExterior || empresaDomicilio.numExterior || '';
  const NUM_INTERIOR = domicilio.numInterior || empresaDomicilio.numInterior || '';
  const COLONIA = domicilio.colonia || empresaDomicilio.colonia || '';
  const MUNICIPIO = domicilio.municipio || empresaDomicilio.municipio || domicilio.delegacionMunicipio || '';
  const ENTIDAD = domicilio.entidadFederativa?.nombre || empresaDomicilio.entidadFederativa?.nombre || '';
  const CODIGO_POSTAL = domicilio.codigoPostal || empresaDomicilio.codigoPostal || '';

  const PARTS = [CALLE, NUM_EXTERIOR, NUM_INTERIOR, COLONIA, MUNICIPIO, ENTIDAD, CODIGO_POSTAL]
    .filter(part => part && part.toString().trim() !== '')
    .map(part => part.toString().trim());

  return PARTS.join(', ');
}

/**
 * Mapea la respuesta de la API a un arreglo de objetos PlantasSubfabricante.
 * @param apiResponse - Respuesta de la API que contiene los datos de las plantas subfabricantes.
 * @returns Arreglo de objetos PlantasSubfabricante mapeados.
 */
  // eslint-disable-next-line class-methods-use-this
  mapApiResponseToPlantasSubfabricante(apiResponse: any[]): PlantasSubfabricante[] {
    // eslint-disable-next-line complexity
    return apiResponse.map(item => {
      const DOMICILIO = item.domicilioDto || {};
      const EMPRESA = item.empresaDto || {};
      const EMPRESA_DOMICILIO = EMPRESA.domicilioSolicitud || {};

      return {
        calle: DOMICILIO.calle || EMPRESA_DOMICILIO.calle || item.calle || '',
        numExterior: parseInt(DOMICILIO.numExterior || EMPRESA_DOMICILIO.numExterior || item.numeroExterior, 10) || 0,
        numInterior: parseInt(DOMICILIO.numInterior || EMPRESA_DOMICILIO.numInterior || item.numeroInterior, 10) || 0,
        codigoPostal: parseInt(DOMICILIO.codigoPostal || EMPRESA_DOMICILIO.codigoPostal || item.codigoPostal, 10) || 0,
        colonia: DOMICILIO.colonia || EMPRESA_DOMICILIO.colonia || item.colonia || '',
        municipio: DOMICILIO.municipio || EMPRESA_DOMICILIO.municipio || DOMICILIO.delegacionMunicipio || item.delegacionMunicipio || '',
        entidadFederativa: DOMICILIO.entidadFederativa?.nombre || EMPRESA_DOMICILIO.entidadFederativa?.nombre || item.entidadFederativa || '',
        pais: DOMICILIO.pais?.nombre || EMPRESA_DOMICILIO.pais?.nombre || item.pais || '',
        rfc: EMPRESA.rfc || item.rfc || '',
        domicilioFiscal: this.buildDomicilioFiscal(DOMICILIO, EMPRESA_DOMICILIO),
        razonSocial: EMPRESA.razonSocial || item.razonSocial || ''
      };
    });
  }
}
