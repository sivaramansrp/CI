import { Catalogo, CatalogoServices, HttpCoreService } from '@ng-mf/data-access-user';
import { Observable, map} from 'rxjs';
import { Tramite130112State, Tramite130112Store } from '../estados/tramites/tramites130112.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PROC_130112 } from '../servers/api-route';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';
import { Tramite130112Query } from '../estados/queries/tramite130112.query';

/**
 * @descripcion
 * Servicio que proporciona métodos para obtener datos relacionados con el trámite de importación
 * de material de investigación científica. Este servicio realiza solicitudes HTTP para obtener
 * datos desde archivos JSON estáticos.
 *
 * @decorador @Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class ImportacionMaterialDeInvestigacionCientificaService {
  /**
   * @descripcion
   * Constructor del servicio. Inyecta el cliente HTTP para realizar solicitudes.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient, private tramite130112Store:Tramite130112Store, private catalogoServices: CatalogoServices, private httpService: HttpCoreService, private query: Tramite130112Query,) {}

  /** Obtiene el catálogo de bloques para el trámite especificado.  
 *  @param {string} tramite - El identificador del trámite.
 *  @returns {Observable<Catalogo[]>} - Un observable que emite una lista de catálogos de bloques.
 */
  getBloque(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.tratadosAcuerdoCatalogo(tramite, "TITRAC.TA").pipe(
      map(res => res?.datos ?? [])
    );
  }

  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * @param {number} _bloqueId - El ID del bloque.
   * @returns {Observable<Catalogo[]>}
   */
  getPaisesPorBloque(tramite: string, _bloqueId: string): Observable<Catalogo[]> {
    return this.catalogoServices.getpaisesBloqueCatalogo(tramite, _bloqueId).pipe(
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
   * @descripcion
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable que emite la lista de representaciones federales.
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130112/representacion-federal.json'
    );
  }

  /**
   * @descripcion
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * @returns {Observable<ProductoResponse>} Observable que emite las opciones de solicitud.
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130112/solicitude-options.json'
    );
  }

  /**
   * @descripcion
   * Obtiene las opciones de producto desde un archivo JSON.
   * @returns {Observable<ProductoResponse>} Observable que emite las opciones de producto.
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130112/producto-options.json'
    );
  }

  /**
   * @descripcion
   * Obtiene la lista de partidas de la mercancía desde un archivo JSON.
   * @returns {Observable<PartidasDeLaMercanciaModelo[]>} Observable que emite la lista de partidas.
   */
  getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
      return this.http.get<PartidasDeLaMercanciaModelo[]>(
            'assets/json/130112/partidas-de-la.json'
          );
    }
    
  /**
  * Actualiza el estado del formulario en el store.
  * @param DATOS Estado actualizado del trámite.
  */
  actualizarEstadoFormulario(DATOS: Tramite130112State): void {
    this.tramite130112Store.actualizarEstado(DATOS);
  }

  /**
  * Obtiene los datos de la solicitud.
  * @returns Observable con los datos de la solicitud.
  */
  getDatosDeLaSolicitud(): Observable<Tramite130112State> {
    return this.http.get<Tramite130112State>('assets/json/130112/datos-de-la-solicitud.json');
  }

  /** Obtiene el catálogo de regímenes para el trámite especificado.  
   *  @param {string} tramite - El identificador del trámite.
   *  @returns {Observable<Catalogo[]>} - Un observable que emite una lista de catálogos de regímenes.
   */
  getRegimenes(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.regimenesCatalogo(tramite).pipe(
      map(res => res?.datos ?? [])
    );
  }

  /** Obtiene el catálogo de clasificaciones de régimen para el trámite especificado.  
   *  @param {string} tramite - El identificador del trámite.
   *  @returns {Observable<Catalogo[]>} - Un observable que emite una lista de catálogos de clasificaciones de régimen.
   */
  getRegimenClasificacion(tramite: string, cveClasificacion: string): Observable<Catalogo[]> {
    return this.catalogoServices.getRegimenClasificacion(tramite, cveClasificacion).pipe(
      map(res => res?.datos ?? [])
    );
  }

  /** Obtiene el catálogo de fracciones arancelarias para el trámite especificado.  
   *  @param {string} tramite - El identificador del trámite.
   *  @returns {Observable<Catalogo[]>} - Un observable que emite una lista de catálogos de fracciones arancelarias.
   */
  getFraccionesArancelarias(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.fraccionesArancelariasCatalogo(tramite, "TITPEX.130112").pipe(
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

  guardarDatosPost(
    body: Record<string, unknown>
  ): Observable<Record<string, unknown>> {
    return this.httpService.post<Record<string, unknown>>(PROC_130112.GUARDAR, {
      body: body,
    });
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Tramite130112State> {
    return this.query.selectSolicitud$;
  }

  /** Obtiene el catálogo de unidades de medida para el trámite especificado.  
   *  @param {string} tramite - El identificador del trámite.
   *  @returns {Observable<Catalogo[]>} - Un observable que emite una lista de catálogos de unidades de medida.
   */
  getUMTCatalogo(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.getUMTCatalogo(tramite, "06011008").pipe(
      map(res => res?.datos ?? [])
    );
  }

  getPayloadDatos(item: Tramite130112State): unknown {
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