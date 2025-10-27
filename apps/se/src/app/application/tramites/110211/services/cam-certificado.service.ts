import {
  CamState,
  camCertificadoStore,
} from '../estados/cam-certificado.store';
import {
  Catalogo,
  ENVIRONMENT,
  JSONResponse,
  RespuestaCatalogos,
} from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { PROC_110211 } from '../servers/api-route';
import { camCertificadoQuery } from '../estados/cam-certificado.query';

/**
 * Servicio para la gestión de solicitudes del certificado zoosanitario.
 * Este servicio permite actualizar y obtener información relacionada con el proceso de captura
 * de la solicitud, incluyendo datos del solicitante, movilización, terceros relacionados, pagos y validaciones.
 *
 * @export
 * @class CamCertificadoService
 * @description Servicio para gestionar la obtención y actualización de datos relacionados con el certificado CAM.
 * Proporciona métodos para obtener menús desplegables, datos de tablas y el estado completo del certificado CAM desde archivos JSON,
 * así como para actualizar el estado del formulario en el store correspondiente.
 *
 * @author
 * @version 1.0
 * @date 2024-06-07
 * @export
 * @class CamCertificadoService
 * @see CamState
 * @see Catalogo
 * @see Mercancia
 * @see camCertificadoStore
 * @see RespuestaCatalogos
 * @see HttpClient
 * @see Observable
 * @see Injectable
 * @see map
 * @see obtenerMenuDesplegable
 * @see obtenerTablaDatos
 * @see obtenerTodosDatosCamCertificado
 * @see actualizarEstadoFormulario
 * @compodoc
 */
@Injectable({
  providedIn: 'root',
})
export class CamCertificadoService {
  url: string = '../../../../../assets/json/110211/';

  /**
   * URL base del servidor de catálogos auxiliares.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(
    private readonly http: HttpClient,
    private tramite110211Store: camCertificadoStore,
    public camCertificadoQuery: camCertificadoQuery
  ) {}

  /**
   * * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`)
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * @description Obtiene un array de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un array de objetos `Catalogo`.
   * @method obtenerMenuDesplegable
   * @memberof CamCertificadoService
   * @usageNotes
   *
   * Ejemplo:
   * ```typescript
   * this.camCertificadoService.obtenerMenuDesplegable('menu.json').subscribe(menu => {
   *   console.log(menu);
   * });
   * ```
   * @compodoc
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
   * @description Obtiene todos los datos del certificado CAM desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un objeto `CamState`.
   * @method obtenerTodosDatosCamCertificado
   * @memberof CamCertificadoService
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`)
   * y realiza una solicitud HTTP GET para recuperar los datos.
   *
   * Ejemplo:
   * ```typescript
   * this.camCertificadoService.obtenerTodosDatosCamCertificado('camcertificado.json').subscribe(data => {
   *   console.log(data);
   * });
   * ```
   * @compodoc
   */
  obtenerTodosDatosCamCertificado(fileName: string): Observable<CamState> {
    const JSON_URL = this.url + fileName;
    return this.http.get<CamState>(JSON_URL);
  }

  /**
   *
   * Actualiza el estado completo del formulario en el store correspondiente usando los datos recibidos.
   * @method actualizarEstadoFormulario
   * @description Actualiza el estado del formulario con los datos proporcionados.
   * @param {CamState} DATOS - Objeto que contiene el nuevo estado del formulario.
   * @returns {void}
   *
   * @memberof CamCertificadoService
   *
   */
  actualizarEstadoFormulario(DATOS: CamState): void {
    this.tramite110211Store.setEstadoCompleto(DATOS);
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
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<CamState> {
    return this.camCertificadoQuery.selectCam$;
  }

  /**
   * Realiza una búsqueda de mercancías utilizando los criterios proporcionados en el cuerpo de la solicitud.
   * @param body Objeto que contiene los criterios de búsqueda.
   * @returns Observable con la respuesta de la búsqueda de mercancías.
   */
  buscarMercanciasCert(
    body: Record<string, unknown>
  ): Observable<JSONResponse> {
    return this.http.post<JSONResponse>(PROC_110211.BUSCAR, body);
  }

    /**
   * Construye un arreglo de mercancías seleccionadas a partir de los datos proporcionados.
   * @param arr Arreglo de objetos con los datos de las mercancías seleccionadas.
   * @returns Arreglo de objetos con la estructura requerida para las mercancías seleccionadas.
   * */
  buildMercanciaSeleccionadas(array: unknown[]): unknown[] {
    const RESULT: unknown[] = [];

    array.forEach((arr) => {
      const ITEM = arr as {
        id?: number;
        fraccionArancelaria: string;
        cantidad?: string;
        valorMercancia?: string;
        nombreTecnico: string;
        nombreComercial: string;
        numeroDeRegistrodeProductos: string;
        umc?: string;
        fechaExpedicion: string;
        fechaVencimiento: string;
        tipoFactura?: string;
        numeroFactura?: string;
        complementoDescripcion?: string;
        fechaFactura?: string;
      };

      RESULT.push({
        id: ITEM.id,
        fraccion_arancelaria: ITEM.fraccionArancelaria,
        cantidad:ITEM.cantidad,
        unidad_medida:ITEM.umc,
        valor_mercancia:ITEM.valorMercancia,
        nombreTecnico:ITEM.nombreTecnico,
        nombre_comercial:ITEM.nombreComercial,
        registro_producto:ITEM.numeroDeRegistrodeProductos,
        fechaExpedicion:ITEM.fechaExpedicion,
        fechaVencimiento:ITEM.fechaVencimiento,
        tipo_factura:ITEM.tipoFactura,
        num_factura:ITEM.numeroFactura,
        complemento_descripcion:ITEM.complementoDescripcion,
        fecha_factura:ITEM.fechaFactura,
      });
    });

    return RESULT;
  }

  /**
     * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
     *
     * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
     * @returns Observable con la respuesta de la solicitud POST.
     */
    guardarDatosPost(body: Record<string, unknown>): Observable<JSONResponse> {
      return this.http.post<JSONResponse>(PROC_110211.GUARDAR, {
        body: body,
      });
    }
}
