import { Catalogo, HttpCoreService, JsonResponseCatalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { MercanciasHistorico, ProductorExportador } from '../models/peru-certificado.module';
import { Observable, map } from 'rxjs';
import { Tramite110222State, Tramite110222Store } from '../estados/tramite110222.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { PROC_110222 } from '../servers/api-route';
import { Tramite110222Query } from '../estados/tramite110222.query';

/**
 * @descripcion
 * Servicio encargado de validar y obtener datos iniciales para el trámite de certificado.
 * Proporciona métodos para consultar catálogos, tablas de datos, productores/exportadores y actualizar el estado del formulario.
 */
@Injectable({
  providedIn: 'root'
})
export class ValidarInicialmenteCertificadoService {
  url: string = '../../../../../assets/json/110222/';

  /**
   * @constructor
   * @descripcion
   * Inyecta el cliente HTTP y el store del trámite para manipular el estado y realizar peticiones.
   * @param http Cliente HTTP para realizar solicitudes.
   * @param tramite110222Store Store para manipular el estado del trámite.
   */
  constructor(
    private readonly http: HttpClient,
    public tramite110222Store: Tramite110222Store,
    public httpService: HttpCoreService,
    private tramite110222Query: Tramite110222Query
  ) { }

  /**
   * @method obtenerMenuDesplegable
   * @descripcion
   * Obtiene un arreglo de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un arreglo de objetos `Catalogo`.
   * @usageNotes
   * Este método construye la URL completa al agregar el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
      map(response => response.data)
    );
  }

  /**
   * @method obtenerTablaDatos
   * @descripcion
   * Obtiene un arreglo de objetos `Mercancia` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un arreglo de objetos `Mercancia`.
   * @usageNotes
   * Este método construye la URL completa al agregar el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerTablaDatos(fileName: string): Observable<Mercancia[]> {
    const JSON_URL = this.url + fileName;
    return this.http.get<Mercancia[]>(JSON_URL);
  }

  /**
   * @method obtenerProductorPorExportador
   * @descripcion
   * Obtiene la lista de productores/exportadores disponibles desde un archivo JSON.
   * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
   */
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http
      .get<ProductorExportador>('assets/json/110222/productor-exportador.json');
  }

  /**
   * @method obtenerMercancia
   * @descripcion
   * Obtiene el historial de mercancías seleccionadas desde un archivo JSON local.
   * @returns {Observable<MercanciasHistorico>} Un observable que emite los datos del historial de mercancías.
   */
  obtenerMercancia(): Observable<MercanciasHistorico> {
    return this.http
      .get<MercanciasHistorico>('assets/json/110222/mercancias-seleccionadas.json');
  }

  /**
   * @method getRegistroTomaMuestrasMercanciasData
   * @descripcion
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   * @returns Observable con los datos del estado de la solicitud `Tramite110222State`,
   *          cargados desde el archivo JSON especificado en la ruta de `assets`.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite110222State> {
    return this.http.get<Tramite110222State>('assets/json/110222/datos-prefill.json');
  }

  /**
   * @method actualizarEstadoFormulario
   * @descripcion
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param DATOS - Estado de la solicitud `Tramite110222State` con la información 
   *                del tipo de solicitud a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: Tramite110222State): void {
    this.tramite110222Store.update((state) => ({
      ...state,
      ...DATOS
    }))
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
      PROC_110222.TIPO_FACTURA,
      {},
      false
    );
  }

  /**
   * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
   * 
   * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
   * @returns Observable con la respuesta de la solicitud POST.
   */
  guardarDatosPost(body: any) {
    return this.httpService.post<any>(PROC_110222.GUARDAR, { body: body });
    // return this.httpService.post<any>('http://localhost:8080/api/sat-t110201/solicitud/guardar', { body: body });
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<Tramite110222State>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Tramite110222State> {
    return this.tramite110222Query.selectTramite$;
  }
  buscarMercanciasCert(body: any): Observable<any> {
    // return this.httpService.post<any>(
    //   'http://localhost:8080/api/sat-t110201/solicitud/buscar-mercancias',
    //   { body: body }
    // );
     return this.httpService.post<any>(PROC_110222.BUSCAR, { body: body });
  }
}