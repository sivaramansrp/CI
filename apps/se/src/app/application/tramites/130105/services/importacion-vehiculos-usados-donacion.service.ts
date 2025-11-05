
/**
 * Importación de vehículos usados por donación.
 * Este servicio proporciona métodos para obtener datos relacionados con la importación de vehículos usados por donación.
 */
import { Tramite130105State, Tramite130105Store } from '../../../estados/tramites/tramites130105.store';
import { Catalogo, CatalogoServices } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

/**
 * Servicio para gestionar la importación de vehículos.
 * Este servicio proporciona métodos para obtener datos relacionados con la importación de vehículos,
 * como listas de países, entidades federativas, representaciones federales y opciones de productos.
 */
@Injectable({
  providedIn: 'root',
})
export class ImportacionVehiculosUsadosDonacionService {
  /**
   * Constructor del servicio.
   * Servicio HttpClient para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient, private tramite130105Store: Tramite130105Store, private catalogoServices: CatalogoServices) {
    //
  }

  /**
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * Un observable que emite una lista de países.
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130105/pais-procenia.json');
  }

  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * El ID del bloque.
   * Un observable que emite una lista de países agrupados por bloque.
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130105/paises-por-bloque.json'
    );
  }

  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * Un observable que emite una lista de entidades federativas.
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130105/entidad-federativa.json'
    );
  }

  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * Un observable que emite una lista de representaciones federales.
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130105/representacion-federal.json'
    );
  }

  /**
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * Un observable que emite las opciones de solicitud.
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130105/solicitude-options.json'
    );
  }

  /**
   * Obtiene las opciones de producto desde un archivo JSON.
   * Un observable que emite las opciones de producto.
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130105/producto-otions.json'
    );
  }
  /**
   * Obtiene la lista de clasificaciones desde un archivo JSON.
   */
  getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
    return this.http.get<PartidasDeLaMercanciaModelo[]>(
      'assets/json/130105/partidas-de-la.json'
    );
  }

  /**
  * Actualiza el estado del formulario en el store.
  * @param DATOS Estado actualizado del trámite.
  */
  actualizarEstadoFormulario(DATOS: Tramite130105State): void {
    this.tramite130105Store.actualizarEstado(DATOS);
  }
  /**
  * Obtiene los datos de la solicitud.
  * @returns Observable con los datos de la solicitud.
  */
  getDatosDeLaSolicitud(): Observable<Tramite130105State> {
    return this.http.get<Tramite130105State>('assets/json/130105/datos-de-la-solicitud.json');
  }

  /**
    * Obtiene el catálogo de tratados/acuerdos asociados a un trámite.
    * @param tramitesID - Identificador del trámite
    * @param tratadoAsociado - Clave del tratado asociado
    * @returns Observable con un arreglo de tratados (o vacío si no hay datos)
    */
  getRegimenCatalogo(tramitesID: string): Observable<any[]> {
    return this.catalogoServices.regimenesCatalogo(tramitesID)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }

  getClasificacionRegimenCatalogo(tramitesID: string): Observable<any[]> {
    const payloadDatos = { tramite: 'TITPEX.130108', id: tramitesID };
    return this.catalogoServices.clasificacionRegimenCatalogo('130105', payloadDatos)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }

  getFraccionCatalogoService(ID: string): Observable<any[]> {
    return this.catalogoServices.fraccionesArancelariasCatalogo(ID, 'TITPEX.130118')
      .pipe(
        map(res => res?.datos ?? [])
      );
  }

  getUMTService(ID: string, FRACCION_ID: string): Observable<any[]> {
    return this.catalogoServices.unidadesMedidaTarifariaCatalogo(ID, FRACCION_ID)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }

  getEntidadesFederativasCatalogo(ID: string): Observable<any[]> {
    return this.catalogoServices.entidadesFederativasCatalogo(ID).pipe(
      map(res => res?.datos ?? [])
    );
  }

  getRepresentacionFederalCatalogo(ID: string, cveEntidad: string): Observable<any[]> {
    return this.catalogoServices.representacionFederalCatalogo(ID, cveEntidad).pipe(
      map(res => res?.datos ?? [])
    );
  }

  getBloqueService(ID: string): Observable<any[]> {
    return this.catalogoServices.bloqueCatalogo(ID)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }

  getPaisesPorBloqueService(tramite: string, ID: string): Observable<any[]> {
    return this.catalogoServices.paisesPorBloqueCatalogo(tramite, ID)
      .pipe(
        map(res => res?.datos ?? [])
      );
  }
}