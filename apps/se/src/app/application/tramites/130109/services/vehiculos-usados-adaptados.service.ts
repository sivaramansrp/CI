import { Tramite130109State, Tramite130109Store } from '../../../estados/tramites/tramites130109.store';

import { Catalogo, CatalogoServices, JSONResponse, MostrarPartidas } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';
import { Tramite130109Query } from '../../../estados/queries/tramite130109.query';

import { PROC_130109 } from '../servers/api-route';

import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';

/**
 * Servicio para gestionar la importación de vehículos.
 * Este servicio proporciona métodos para obtener datos relacionados con la importación de vehículos,
 * como listas de países, entidades federativas, representaciones federales y opciones de productos.
 */
@Injectable({
  providedIn: 'root',
})
export class VehiculosUsadosAdaptadosService {
   /**
   * Constructor del servicio.
   * Servicio HttpClient para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient, 
    private tramite130109Store:Tramite130109Store, 
    private tramite130109Query:Tramite130109Query,
    private vehiculosUsadosAdaptadosService: VehiculosUsadosAdaptadosService,
    private catalogoServices: CatalogoServices,
) {
    // 
   }

    /**
        * Obtiene todos los datos del estado almacenado en el store.
        * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
        */
     getAllState(): Observable<Tramite130109State> {
       return this.tramite130109Query.selectSolicitud$;
     }
 /**
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * Un observable que emite una lista de países.
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130109/pais-procenia.json');
  }
/**
     * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
     *
     * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
     * @returns Observable con la respuesta de la solicitud POST.
     */
  guardarDatosPost(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.http.post<JSONResponse>(PROC_130109.GUARDAR, body);
  }
  
    /**
      * Obtiene el catálogo de tratados/acuerdos asociados a un trámite.
      * @param tramitesID - Identificador del trámite
      * @param tratadoAsociado - Clave del tratado asociado
      * @returns Observable con un arreglo de tratados (o vacío si no hay datos)
      */
    getRegimenCatalogo(tramitesID: string): Observable<Catalogo[]> {
      return this.catalogoServices.regimenesCatalogo(tramitesID)
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
    const PAYLOAD_DATOS = { tramite: 'TITPEX.130108', id: tramitesID };
    return this.catalogoServices.clasificacionRegimenCatalogo('130109', PAYLOAD_DATOS)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }
/**
   *  Obtiene el catálogo de fracciones arancelarias asociado a un identificador.
   * @param ID Identificador para obtener las fracciones arancelarias
   * @returns Observable con un arreglo de fracciones arancelarias (o vacío si no hay datos)
   */
  getFraccionCatalogoService(ID: string): Observable<Catalogo[]> {
    return this.catalogoServices.fraccionesArancelariasCatalogo(ID, 'TITPEX.130109')
      .pipe(
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
   *  Obtiene el catálogo de todos los países seleccionados asociado a un identificador.
   * @param ID Identificador para obtener los países seleccionados
   * @returns Observable con un arreglo de países seleccionados (o vacío si no hay datos)
   */
  getTodosPaisesSeleccionados(ID: string): Observable<Catalogo[]> {
    return this.catalogoServices.todosPaisesSeleccionados(ID).pipe(
      map(res => res?.datos ?? [])
    );
  }
  
  /**
   * Obtiene la lista de bloques comerciales (tratados o acuerdos) según el trámite proporcionado.
   *
   * @param {string} tramite - Identificador del trámite o tipo de operación para la consulta del catálogo.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de elementos del catálogo de bloques.
   */
  getBloqueService(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.tratadosAcuerdoCatalogo(tramite, 'TITRAC.TA')
      .pipe(
        map(res => res?.datos ?? [])
      );
  }
  
    /**
     *  Obtiene el catálogo de mostrar partidas asociado a un trámite e identificador.
     * @param tramite Identificador del trámite
     * @param ID Identificador para obtener las mostrar partidas
     * @returns Observable con un arreglo de mostrar partidas (o vacío si no hay datos)
     */
    getMostrarPartidasService(solicitud_id: number): Observable<BaseResponse<MostrarPartidas[]>> {
      const ENDPOINT = PROC_130109.MOSTAR_PARTIDAS + solicitud_id;
      return this.http.get<BaseResponse<MostrarPartidas[]>>(ENDPOINT);
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
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * El ID del bloque.
   * Un observable que emite una lista de países agrupados por bloque.
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130109/paises-por-bloque.json'
    );
  }

  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * Un observable que emite una lista de entidades federativas.
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130109/entidad-federativa.json'
    );
  }

  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * Un observable que emite una lista de representaciones federales.
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130109/representacion-federal.json'
    );
  }

  /**
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * Un observable que emite las opciones de solicitud.
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130109/solicitude-options.json'
    );
  }

  /**
   * Obtiene las opciones de producto desde un archivo JSON.
   * Un observable que emite las opciones de producto.
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130109/producto-opciones.json'
    );
  }

  /**
  * Obtiene los datos de la tabla de partidas de la mercancía.
  * @returns Observable con los datos de la tabla.
  */
  getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
    return this.http.get<PartidasDeLaMercanciaModelo[]>(
          'assets/json/130109/partidas-de-la.json'
        );
  }

  /**
  * Actualiza el estado del formulario en el store.
  * @param DATOS Estado actualizado del trámite.
  */
  actualizarEstadoFormulario(DATOS: Tramite130109State): void {
    this.tramite130109Store.actualizarEstado(DATOS);
  }

  /**
  * Obtiene los datos de la solicitud.
  * @returns Observable con los datos de la solicitud.
  */
  getDatosDeLaSolicitud(): Observable<Tramite130109State> {
    return this.http.get<Tramite130109State>('assets/json/130109/datos-de-la-solicitud.json');
  }

  
    /**
     * Genera el payload de datos para el trámite 130109 basado en la información proporcionada.
     *
     * @param {Tramite130109State} item - Objeto que contiene la información del trámite,
     * incluyendo datos de tabla y valores autorizados.
     *
     * @returns {any[]} Arreglo de objetos con los datos transformados para ser enviados
     * en el payload del trámite.
     *
     * @description
     * Este método toma las filas de `tableBodyData` dentro del objeto `item` y construye un
     * arreglo de objetos con los valores solicitados y autorizados.  
     * Convierte valores numéricos, extrae descripciones y agrega claves arancelarias y de unidad de medida.
     */
    getPayloadDatos(item: Tramite130109State): unknown {
      const ROWS = Array.isArray(item.tableBodyData) ? item.tableBodyData : [];
      return ROWS.map(row => ({
        unidadesSolicitadas: Number(row.cantidad),
        unidadesAutorizadas: Number(item.cantidad),
        descripcionSolicitada: row.descripcion,
        descripcionAutorizada: item.descripcion,
        importeUnitarioUSD: Number(row.precioUnitarioUSD),
        importeTotalUSD: Number(row.totalUSD),
        autorizada: true,
        importeUnitarioUSDAutorizado: Number(row.precioUnitarioUSD),
        importeTotalUSDAutorizado: Number(item.valorFacturaUSD),
        fraccionArancelariaClave: item.fraccion,
        unidadMedidaClave: item.unidadMedida
      }));
    }

}