import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

@Injectable({
  providedIn: 'root',
})
export class ExportacionMineralesDeHierroService {
  constructor(private http: HttpClient) {
    // Constructor del servicio. Actualmente no realiza ninguna acción específica.
  }
  /**
   * @metodo
   * @nombre getListaDePaisesDisponibles
   * @descripcion Obtiene la lista de países disponibles desde un archivo JSON.
   * Este método realiza una solicitud HTTP GET para recuperar los datos de un archivo local.
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo` con la información de los países disponibles.
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130108/pais-procenia.json');
  }
  /**
   * @metodo
   * @nombre obtenerListaDeCiudades
   * @descripcion Obtiene la lista de todas las ciudades desde un archivo JSON.
   * Este método realiza una solicitud HTTP GET para recuperar los datos de un archivo local.
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo` con la información de las ciudades disponibles.
   */
  obtenerListaDeCiudades(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130108/todas-las-ciudades.json');
  }

   /**
   * @metodo
   * @nombre getPaisesPorBloque
   * @descripcion Obtiene la lista de países por bloque desde un archivo JSON.
   * Este método realiza una solicitud HTTP GET para recuperar los datos de un archivo local.
   * @param {number} _bloqueId - Identificador del bloque para filtrar los países.
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo` con la información de los países por bloque.
   */
   getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130108/paises-por-bloque.json');
  }

 /**
   * @metodo
   * @nombre getEstado
   * @descripcion Obtiene la lista de entidades federativas desde un archivo JSON.
   * Este método realiza una solicitud HTTP GET para recuperar los datos de un archivo local.
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo` con la información de las entidades federativas.
   */
 getEstado(): Observable<Catalogo[]> {
  return this.http.get<Catalogo[]>('/assets/json/130108/estado.json');
}

 /**
   * @metodo
   * @nombre getRepresentacionFederal
   * @descripcion Obtiene la lista de representaciones federales desde un archivo JSON.
   * Este método realiza una solicitud HTTP GET para recuperar los datos de un archivo local.
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo` con la información de las representaciones federales.
   */
 getRepresentacionFederal(): Observable<Catalogo[]> {
  return this.http.get<Catalogo[]>('/assets/json/130108/representacion-federal.json');
}

 /**
   * @metodo
   * @nombre getSolicitudeOptions
   * @descripcion Obtiene las opciones de solicitud desde un archivo JSON.
   * Este método realiza una solicitud HTTP GET para recuperar los datos de un archivo local.
   * @returns {Observable<ProductoResponse>} Observable que emite un objeto `ProductoResponse` con la información de las opciones de solicitud.
   */
 getSolicitudeOptions(): Observable<ProductoResponse> {
  return this.http.get<ProductoResponse>('assets/json/130108/solicitude-options.json');
}

 /**
   * @metodo
   * @nombre getProductoOptions
   * @descripcion Obtiene las opciones de producto desde un archivo JSON.
   * Este método realiza una solicitud HTTP GET para recuperar los datos de un archivo local.
   * @returns {Observable<ProductoResponse>} Observable que emite un objeto `ProductoResponse` con la información de las opciones de producto.
   */
 getProductoOptions(): Observable<ProductoResponse> {
  return this.http.get<ProductoResponse>('assets/json/130108/producto-otions.json');
}
}