import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Solicitud130106State, Tramite130106Store } from '../../../estados/tramites/tramite130106.store';
import { Catalogo, CatalogoServices } from '@libs/shared/data-access-user/src';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

@Injectable({
  providedIn: 'root',
})
/** Servicio responsable de la lógica del trámite 130106
 *.  
 *  Maneja la comunicación con APIs y gestión de estado relacionada. */
export class Solocitud130106Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  // URL base para consumir los catálogos auxiliares desde el servidor.
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  tramiteId: string = '130106';

  /** Constructor que inyecta servicios HTTP y el store del trámite 130106.  
   *  Utilizado para inicializar dependencias necesarias en el componente. */
  constructor(private http: HttpClient, private tramite130106Store: Tramite130106Store, private catalogoServices: CatalogoServices) {
    // Lógica de inicialización si es necesario
  }
  /** Actualiza el estado del formulario en el store con los datos proporcionados.  
   *  Establece el régimen seleccionado desde el objeto de estado.
   *  */
  actualizarEstadoFormulario(DATOS: Solicitud130106State): void {
    this.tramite130106Store.setRegimen(DATOS.regimen);
    this.tramite130106Store.setClasificacion(DATOS.clasificacion);
    this.tramite130106Store.setSolicitudDescripcion(DATOS.solicitudDescripcion);
    this.tramite130106Store.setFraccion(DATOS.fraccion);
    this.tramite130106Store.setCantidad(DATOS.cantidad);
    this.tramite130106Store.setFactura(DATOS.factura);
    this.tramite130106Store.setUmt(DATOS.umt);
    this.tramite130106Store.setMercanciaCantidad(DATOS.mercanciaCantidad);
    this.tramite130106Store.setMercanciaFactura(DATOS.mercanciaFactura);
    this.tramite130106Store.setDescripcion(DATOS.descripcion);
    this.tramite130106Store.setEspecifico(DATOS.especifico);
    this.tramite130106Store.setJustificacion(DATOS.justificacion);
    this.tramite130106Store.setObservaciones(DATOS.observaciones);
    this.tramite130106Store.setEntidad(DATOS.entidad);
    this.tramite130106Store.setRepresentacion(DATOS.representacion);
    this.tramite130106Store.setBloque(DATOS.bloque);
    this.tramite130106Store.setDisponible(DATOS.disponible);
    this.tramite130106Store.setSeleccionado(DATOS.seleccionado);
    this.tramite130106Store.setSolicitud(DATOS.solicitud);
    this.tramite130106Store.setProducto(DATOS.producto);
    this.tramite130106Store.updateSelectRangoDias(DATOS.selectRangoDias);
  }
  /** Obtiene los datos simulados del registro de toma de muestras de mercancías  
   *  desde un archivo JSON local para el trámite 130106. */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud130106State> {
    return this.http.get<Solicitud130106State>('assets/json/130106/serviciosExtraordinarios.json');
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
  getClasificacionRegimen(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.getClasificacionRegimen(this.tramiteId, "01").pipe(
      map(res => res?.datos ?? [])
    );
  }
  /** Obtiene el catálogo de fracciones arancelarias para el trámite especificado.  
   *  @param {string} tramite - El identificador del trámite.
   *  @returns {Observable<Catalogo[]>} - Un observable que emite una lista de catálogos de fracciones arancelarias.
   */
  getFraccionesArancelarias(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.getFraccionesCatalogo(tramite).pipe(
      map(res => res?.datos ?? [])
    );
  }
  /** Obtiene el catálogo de unidades de medida para el trámite especificado.  
   *  @param {string} tramite - El identificador del trámite.
   *  @returns {Observable<Catalogo[]>} - Un observable que emite una lista de catálogos de unidades de medida.
   */
  getUMTCatalogo(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.getUMTCatalogo(tramite, "87012301").pipe(
      map(res => res?.datos ?? [])
    );
  }
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
    * Obtiene las opciones de solicitud desde un archivo JSON.
    * @returns {Observable<ProductoResponse>}
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130202/solicitude-options.json'
    );
  }


  /**
   * Obtiene las opciones de producto desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130202/producto-options.json'
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
    return this.catalogoServices.representacionFederalCatalogo(tramite, "SIN").pipe(
      map(res => res?.datos ?? [])
    );
  }
  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * @param {number} _bloqueId - El ID del bloque.
   * @returns {Observable<Catalogo[]>}
   */
  getPaisesPorBloque(tramite: string, _bloqueId: number): Observable<Catalogo[]> {
    return this.catalogoServices.getpaisesBloqueCatalogo(tramite, _bloqueId.toString()).pipe(
      map(res => res?.datos ?? [])
    );
  }

}