import { API_POST_SOLICITUD, BUSCAR_PRODUCTOR, PROC_110205 } from '../servers/api-route'; 
import { Catalogo, HttpCoreService, JsonResponseCatalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { HistoricoColumnas, MercanciaTabla, MercanciasHistorico, ProductorExportador } from '../models/peru-certificado.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tramite110205State, Tramite110205Store } from '../estados/tramite110205.store';
import { catchError, throwError } from 'rxjs';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { GuadarSolicitudResponse } from '../models/response/guardar-solicitud-response.model';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { Tramite110205Query } from '../estados/tramite110205.query';


/**
 * @service PeruCertificadoService
 * @description
 * Servicio para gestionar operaciones relacionadas con el certificado de Perú para el trámite 110205.
 * Proporciona métodos para obtener catálogos, datos de mercancías, productores/exportadores,
 * historial de mercancías y para actualizar el estado del formulario en el store correspondiente.
 *
 * @see Tramite110205Store
 * @see Catalogo
 * @see Mercancia
 * @see ProductorExportador
 * @see MercanciasHistorico
 * @see Tramite110205State
 *
 * @example
 * constructor(private peruCertificadoService: PeruCertificadoService) {}
 *
 * this.peruCertificadoService.obtenerMenuDesplegable('menu.json').subscribe(menu => {
 *   console.log(menu);
 * });
 */
@Injectable({
  providedIn: 'root',
})
export class PeruCertificadoService {
  /**
   * @property {string} url
   * @description Ruta base para acceder a los archivos JSON utilizados en el trámite 110205.
   */
  url: string = '../../../../../assets/json/110205/';

  /**
   * La URL base del servidor al que se realizarán las solicitudes.
   * Esta propiedad es de solo lectura y se utiliza para construir las rutas de los servicios.
   */
  private readonly servidor: string;

  /**
   * @constructor
   * @description
   * Inicializa el servicio con las dependencias necesarias.
   * @param {HttpClient} http - Servicio para realizar solicitudes HTTP.
   * @param {Tramite110205Store} tramite110205Store - Store para gestionar el estado del trámite 110205.
   */
  constructor(
    private readonly http: HttpClient,
    public httpService: HttpCoreService,
    public tramite110205Store: Tramite110205Store,
    public query: Tramite110205Query
  ) {
    this.servidor = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * @method obtenerMenuDesplegable
   * @description
   * Obtiene un array de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param {string} fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns {Observable<Catalogo[]>} Un observable que emite un array de objetos `Catalogo`.
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`)
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http
      .get<RespuestaCatalogos>(BASE_URL)
      .pipe(map((response) => response.data));
  }

  /**
   * @method obtenerTablaDatos
   * @description
   * Obtiene un array de objetos `Mercancia` desde un archivo JSON ubicado en la URL especificada.
   * @param {string} fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns {Observable<Mercancia[]>} Un observable que emite un array de objetos `Mercancia`.
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`)
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerTablaDatos(fileName: string): Observable<Mercancia[]> {
    const JSON_URL = this.url + fileName;
    return this.http.get<Mercancia[]>(JSON_URL);
  }

  /**
   * @method obtenerProductorPorExportador
   * @description
   * Obtiene la lista de productores/exportadores disponibles desde un archivo JSON local.
   * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
   */
  obtenerProductorPorExportador(rfc: string): Observable<ProductorExportador> {
    return this.httpService.get<ProductorExportador>(BUSCAR_PRODUCTOR(rfc));
  }

  /**
   * @method obtenerProductorPorExportador
   * @description
   * Obtiene la lista de productores/exportadores disponibles desde un archivo JSON local.
   * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
   */
  obtenerProductoruNevo(body: { rfc_solicitante: string }): Observable<unknown> {
    return this.httpService.post<unknown>(PROC_110205.AGREGAR_PRODUCTOR, {
      body: body,
    });
  }

  /**
   * @method obtenerMercancia
   * @description
   * Obtiene el historial de mercancías seleccionadas desde un archivo JSON local.
   * @returns {Observable<MercanciasHistorico>} Un observable que emite los datos del historial de mercancías.
   */
  obtenerMercancia(): Observable<MercanciasHistorico> {
    return this.http.get<MercanciasHistorico>(
      'assets/json/110205/mercancias-seleccionadas.json'
    );
  }

  /**
   * @method actualizarEstadoFormulario
   * @description
   * Actualiza el estado del formulario en el store con los datos proporcionados.
   * @param {Tramite110205State} DATOS - Objeto que contiene los nuevos datos para actualizar el estado.
   * @returns {void}
   */
  actualizarEstadoFormulario(DATOS: Tramite110205State): void {
    this.tramite110205Store.update((state) => ({
      ...state,
      ...DATOS,
    }));
  }

  /**
   * @method getRegistroTomaMuestrasMercanciasData
   * @description
   * Obtiene los datos de prellenado para el formulario desde un archivo JSON local.
   * @returns {Observable<Tramite110205State>} Observable que emite los datos de prellenado.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite110205State> {
    return this.http.get<Tramite110205State>(
      'assets/json/110205/datos-prefill.json'
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
  getTipoFactura(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      PROC_110205.TIPO_FACTURA,
      {},
      false
    );
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Tramite110205State> {
    return this.query.selectPeru$;
  }
  guardarDatosPost(
    body: Record<string, unknown>
  ): Observable<Record<string, unknown>> {
    return this.httpService.post<Record<string, unknown>>(PROC_110205.GUARDAR, {
      body: body,
    });
  }

  /**
   * Guarda la solicitud del trámite 80208.
   * @param solicitud Objeto que contiene los datos de la solicitud a guardar.
   * @returns Observable con la respuesta del servidor.
   */
  postSolicitud(
    solicitud: unknown
  ): Observable<BaseResponse<GuadarSolicitudResponse>> {
    const ENDPOINT = `${this.servidor}` + API_POST_SOLICITUD;
    return this.http
      .post<BaseResponse<GuadarSolicitudResponse>>(ENDPOINT, solicitud)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((httpError) => {
          if (httpError instanceof HttpErrorResponse) {
            return throwError(() => ({
              success: false,
              error: httpError.error,
            }));
          }
          const ERROR = new Error(
            `Ocurrió un error al guardar la información ${ENDPOINT} `
          );
          return throwError(() => ERROR);
        })
      );
  }

  buscarMercanciasCert(body: { [key: string]: unknown }): Observable<{ [key: string]: unknown }> {
    return this.httpService.post<{ [key: string]: unknown }>(PROC_110205.BUSCAR, { body: body });
  }

  /** Construye el objeto destinatario a partir del estado del trámite 110214. */
  buildProductoresPorExportador(data: HistoricoColumnas[]): unknown[] {
    return data.map(item => ({
      "nombreCompleto": item.nombreProductor,
      "rfc": item.numeroRegistroFiscal,
      "direccionCompleta": item.direccion,
      "correoElectronico": item.correoElectronico,
      "telefono": item.telefono,
      "fax": item.fax
    }));
  }

  /** Construye el objeto destinatario a partir del estado del trámite 110214. */
  buildMercanciasProductor(data: MercanciaTabla[]): unknown[] {
    return data.map(item => ({
      "fraccionArancelaria": item.fraccionArancelaria,
      "cantidadComercial": item.cantidad,
      "descUnidadMedidaComercial": item.unidadMedida,
      "valorTransaccional": item.valorMercancia,
      "descFactura": item.fetchFactura,
      "fechaFactura": item.fetchFactura,
      "numeroFactura": item.numeroFactura,
      "complementoDescripcion": item.complementoDescripcion,
      "rfcProductor": item.rfcProductor1
    }));
  }
}
