import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';


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
  constructor(private http: HttpClient) {
  /**
   * Constructor vacío.
   */
  }

  /**
   * 
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * {Observable<Catalogo[]>} Observable que emite la lista de países.
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130113/pais-procenia.json');
  }

  /**
   * 
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * {number} _bloqueId - El ID del bloque.
   * {Observable<Catalogo[]>} Observable que emite la lista de países por bloque.
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130113/paises-por-bloque.json'
    );
  }

  /**
   * 
   * Obtiene la ista de entidades federativas desde un archivo JSON.
   * {Observable<Catalogo[]>} Observable que emite la lista de entidades federativas.
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130113/entidad-federativa.json'
    );
  }

  /**
   * 
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * {Observable<Catalogo[]>} Observable que emite la lista de representaciones federales.
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130113/representacion-federal.json'
    );
  }

  /**
   * 
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * {Observable<ProductoResponse>} Observable que emite las opciones de solicitud.
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130113/solicitude-options.json'
    );
  }

  /**
   * 
   * Obtiene las opciones de producto desde un archivo JSON.
   * {Observable<ProductoResponse>} Observable que emite las opciones de producto.
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130113/producto-otions.json'
    );
  }

  /**
   * 
   * Obtiene la lista de fracciones y descripciones de partidas de la mercancía desde un archivo JSON.
   * {Observable<Catalogo[]>} Observable que emite la lista de fracciones y descripciones.
   */
  getFraccionDescripcionPartidasDeLaMercancia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130113/fraccion-descripcion-partidas-de-la-mercancia.json'
    );
  }

  /**
   * Obtiene la tabla de datos de partidas de la mercancía desde un archivo JSON.
   * {Observable<PartidasDeLaMercanciaModelo[]>} Observable que emite la lista de partidas de la mercancía.
   */
  getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
    return this.http.get<PartidasDeLaMercanciaModelo[]>(
      'assets/json/130113/partidas-de-la.json'
    );
  }
}