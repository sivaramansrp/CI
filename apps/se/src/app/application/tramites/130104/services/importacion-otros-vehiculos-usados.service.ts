/**
 * ImportacionOtrosVehiculosUsadosService
 */
import { Tramite130104State, Tramite130104Store } from '../../../estados/tramites/tramite130104.store';
import { Catalogo, CatalogoServices, HttpCoreService, JsonResponseCatalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { PROC_130104 } from '../servers/api-route';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';
import { Tramite130104Query } from '../../../estados/queries/tramite130104.query';

/**
 * ImportacionOtrosVehiculosUsadosService
 **/

@Injectable({
  providedIn: 'root',
})
export class ImportacionOtrosVehiculosUsadosService {
  constructor(private http: HttpClient, 
    private tramite130104Store:Tramite130104Store,
    private tramite130104Query: Tramite130104Query,
    public httpService: HttpCoreService,
    private catalogoServices: CatalogoServices
  ) {
    //
  }
  // /**
  //  * Obtiene la lista de países disponibles desde un archivo JSON.
  //  * @returns {Observable<Catalogo[]>}
  //  */
  // getListaDePaisesDisponibles(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>('/assets/json/130104/pais-procenia.json');
  // }
  // /**
  //  * Obtiene la lista de países por bloque desde un archivo JSON.
  //  * @param {number} _bloqueId - El ID del bloque.
  //  * @returns {Observable<Catalogo[]>}
  //  */
  // getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(
  //     '/assets/json/130104/paises-por-bloque.json'
  //   );
  // }
  // /**
  //  * Obtiene la lista de entidades federativas desde un archivo JSON.
  //  * @returns {Observable<Catalogo[]>}
  //  */
  // getEntidadFederativa(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(
  //     '/assets/json/130104/entidad-federativa.json'
  //   );
  // }
  // /**
  //  * Obtiene la lista de representaciones federales desde un archivo JSON.
  //  * @returns {Observable<Catalogo[]>}
  //  */
  // getRepresentacionFederal(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(
  //     '/assets/json/130104/representacion-federal.json'
  //   );
  // }

  // /**
  //  * Obtiene las opciones de solicitud desde un archivo JSON.
  //  * @returns {Observable<ProductoResponse>}
  //  */
  // getSolicitudeOptions(): Observable<ProductoResponse> {
  //   return this.http.get<ProductoResponse>(
  //     'assets/json/130104/solicitude-options.json'
  //   );
  // }

  // /**
  //  * Obtiene las opciones de producto desde un archivo JSON.
  //  * @returns {Observable<ProductoResponse>}
  //  */
  // getProductoOptions(): Observable<ProductoResponse> {
  //   return this.http.get<ProductoResponse>(
  //     'assets/json/130104/producto-otions.json'
  //   );
  // }
  // /**
  //  * Obtiene los datos de la tabla de partidas de la mercancía desde un archivo JSON.
  //  */
  // getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
  //     return this.http.get<PartidasDeLaMercanciaModelo[]>(
  //           'assets/json/130104/partidas-de-la.json'
  //         );
  //   }

  /**
  * Actualiza el estado del formulario en el store.
  * @param DATOS Estado actualizado del trámite.
  */
  actualizarEstadoFormulario(DATOS: Tramite130104State): void {
      this.tramite130104Store.actualizarEstado(DATOS);
  }
  
  /**
  * Obtiene los datos de la solicitud.
  * @returns Observable con los datos de la solicitud.
  */
  getDatosDeLaSolicitud(): Observable<Tramite130104State> {
      return this.http.get<Tramite130104State>('assets/json/130104/datos-de-la-solicitud.json');
  }

   /**
     * Obtiene todos los datos del estado almacenado en el store.
     * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
     */
  getAllState(): Observable<Tramite130104State> {
    return this.tramite130104Query.selectSolicitud$;
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
      PROC_130104.TIPO_FACTURA,
      {},
      false
    );
  }

  /**
   * Obtiene la lista de países asociados a un bloque comercial según el trámite y el identificador proporcionado.
   *
   * @param {string} tramite - Identificador del trámite o tipo de operación que se está realizando.
   * @param {string} ID - Identificador del bloque o parámetro necesario para la consulta.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de elementos del catálogo de países.
   */
  getPaisesPorBloqueService(tramite: string, ID: string): Observable<Catalogo[]> {
    return this.catalogoServices.getpaisesBloqueCatalogo(tramite, ID)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }

  /**
  * Obtiene la lista de entidades federativas desde un archivo JSON.
  * @returns {Observable<Catalogo[]>}
  */
  getEntidadFederativa(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.entidadesFederativasCatalogo(tramite).pipe(
      map(res => res?.datos ?? [])
    );
  }

  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getRepresentacionFederal(tramite: string, cveEntidad: string): Observable<Catalogo[]> {
    return this.catalogoServices.representacionFederalCatalogo(tramite, "MEX").pipe(
      map(res => res?.datos ?? [])
    );
  }

  /**
   *  Obtiene el catálogo de entidades federativas asociado a un identificador.
   * @param ID Identificador para obtener las entidades federativas
   * @returns Observable con un arreglo de entidades federativas (o vacío si no hay datos)
   */
  getEntidadesFederativasCatalogo(ID: string): Observable<Catalogo[]> {
    return this.catalogoServices.entidadesFederativasCatalogo(ID).pipe(
      map(res => res?.datos ?? [])
    );
  }

  /**
   *  Obtiene el catálogo de representación federal asociado a un identificador y clave de entidad.
   * @param ID Identificador para obtener la representación federal
   * @param cveEntidad Clave de la entidad para filtrar la representación federal
   * @returns Observable con un arreglo de representación federal (o vacío si no hay datos)
   */
  getRepresentacionFederalCatalogo(ID: string, cveEntidad: string): Observable<Catalogo[]> {
    return this.catalogoServices.representacionFederalCatalogo(ID, cveEntidad).pipe(
      map(res => res?.datos ?? [])
    );
  }

  /**
   *  Obtiene el catálogo de unidades de medida tarifaria asociado a un identificador y fracción arancelaria.
   * @param ID Identificador para obtener las unidades de medida tarifaria
   * @param FRACCION_ID Identificador de la fracción arancelaria
   * @returns Observable con un arreglo de unidades de medida tarifaria (o vacío si no hay datos)
   */
  getUMTService(ID: string, FRACCION_ID: string): Observable<Catalogo[]> {
    return this.catalogoServices.unidadesMedidaTarifariaCatalogo(ID, FRACCION_ID)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }

  /**
   * Obtiene el catálogo de clasificaciones de régimen asociado a un trámite.
   * @param tramitesID Identificador del trámite
   * @returns Observable con un arreglo de clasificaciones de régimen (o vacío si no hay datos)
   */
  getClasificacionRegimenCatalogo(tramitesID: string): Observable<Catalogo[]> {
    const PAYLOAD_DATOS = { tramite: 'TITPEX.130104', id: tramitesID };
    return this.catalogoServices.clasificacionRegimenCatalogo('130104', PAYLOAD_DATOS)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }
  
}
