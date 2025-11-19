import { Catalogo, CatalogoServices, JSONResponse } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { Tramite130113State, Tramite130113Store } from '../estados/tramites/tramites130113.store';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MostrarPartidas } from '@libs/shared/data-access-user/src';
import { PROC_130113 } from '../servers/api-route';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';
import { Tramite130113Query } from '../estados/queries/tramite130113.query';


/**
 * 
 * Servicio que proporciona métodos para obtener datos relacionados con el trámite de importación
 * de material de investigación científica. Este servicio realiza solicitudes HTTP para obtener
 * datos desde archivos JSON estáticos.
 *
 * @decorador @Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class ImportacionEquipoAnticontaminanteService {
  /**
   * 
   * Constructor del servicio. Inyecta el cliente HTTP para realizar solicitudes.
   * {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient,public tramite130113Query: Tramite130113Query,private tramite130113Store: Tramite130113Store, private catalogoServices: CatalogoServices) {
  /**
   * Constructor vacío.
   */
  }

  /**
   * 
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * {Observable<Catalogo[]>} Observable que emite la lista de países.
   */
  // getListaDePaisesDisponibles(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>('/assets/json/130113/pais-procenia.json');
  // }

  /**
   * 
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * {number} _bloqueId - El ID del bloque.
   * {Observable<Catalogo[]>} Observable que emite la lista de países por bloque.
   */
  // getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(
  //     '/assets/json/130113/paises-por-bloque.json'
  //   );
  // }

  /**
   * 
   * Obtiene la ista de entidades federativas desde un archivo JSON.
   * {Observable<Catalogo[]>} Observable que emite la lista de entidades federativas.
   */
  // getEntidadFederativa(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(
  //     '/assets/json/130113/entidad-federativa.json'
  //   );
  // }

  /**
   * 
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * {Observable<Catalogo[]>} Observable que emite la lista de representaciones federales.
   */
  // getRepresentacionFederal(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(
  //     '/assets/json/130113/representacion-federal.json'
  //   );
  // }

  /**
   * 
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * {Observable<ProductoResponse>} Observable que emite las opciones de solicitud.
   */
  // getSolicitudeOptions(): Observable<ProductoResponse> {
  //   return this.http.get<ProductoResponse>(
  //     'assets/json/130113/solicitude-options.json'
  //   );
  // }

  /**
   * 
   * Obtiene las opciones de producto desde un archivo JSON.
   * {Observable<ProductoResponse>} Observable que emite las opciones de producto.
   */
  // getProductoOptions(): Observable<ProductoResponse> {
  //   return this.http.get<ProductoResponse>(
  //     'assets/json/130113/producto-otions.json'
  //   );
  // }

  /**
   * 
   * Obtiene la lista de fracciones y descripciones de partidas de la mercancía desde un archivo JSON.
   * {Observable<Catalogo[]>} Observable que emite la lista de fracciones y descripciones.
   */
  // getFraccionDescripcionPartidasDeLaMercancia(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(
  //     '/assets/json/130113/fraccion-descripcion-partidas-de-la-mercancia.json'
  //   );
  // }

  /**
   * Obtiene la tabla de datos de partidas de la mercancía desde un archivo JSON.
   * {Observable<PartidasDeLaMercanciaModelo[]>} Observable que emite la lista de partidas de la mercancía.
   */
  // getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
  //     return this.http.get<PartidasDeLaMercanciaModelo[]>(
  //           'assets/json/130113/partidas-de-la.json'
  //         );
  //   }

  /**
   * Actualiza el estado del formulario en el store.
   * @param DATOS Estado actualizado del trámite.
   */
  actualizarEstadoFormulario(DATOS: Tramite130113State): void {
      this.tramite130113Store.actualizarEstado(DATOS);
  }
  
   /**
       * Obtiene todos los datos del estado almacenado en el store.
       * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
       */
    getAllState(): Observable<Tramite130113State> {
      return this.tramite130113Query.selectSolicitud$;
    }
  
     getPayloadDatos(item: Tramite130113State): unknown {
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
          unidadMedidaClave: item.unidadMedida,
          unidadMedidaDescripcion: row.unidadDeMedida
        }));
      }

  /**
   * Obtiene los datos de la solicitud.
   * @returns Observable con los datos de la solicitud.
   */
  getDatosDeLaSolicitud(): Observable<Tramite130113State> {
      return this.http.get<Tramite130113State>('assets/json/130113/datos-de-la-solicitud.json');
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
      const PAYLOAD_DATOS = { tramite: 'TITPEX.130113', id: tramitesID };
      return this.catalogoServices.clasificacionRegimenCatalogo('130113', PAYLOAD_DATOS)
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
      return this.catalogoServices.fraccionesArancelariasCatalogo(ID, 'TITPEX.130113')
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
      return this.catalogoServices.unidadesMedidasTarifariasCatalogo(ID, FRACCION_ID)
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
      const ENDPOINT = PROC_130113.MOSTAR_PARTIDAS + solicitud_id;
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

   getFraccionDescripcionPartidasDeLaMercanciaService(tramite: string, ID: string): Observable<Catalogo[]> {
    return this.catalogoServices.getFraccionesArancelariasAutoCompleteCatalogo(tramite, ID)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }

    /**
       * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
       *
       * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
       * @returns Observable con la respuesta de la solicitud POST.
       */
    guardarDatosPost(body: Record<string, unknown>): Observable<JSONResponse> {
      return this.http.post<JSONResponse>(PROC_130113.GUARDAR, body);
    }
}