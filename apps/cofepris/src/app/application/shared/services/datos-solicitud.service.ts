import { Observable, map } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '../models/datos-solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class DatosSolicitudService {
  /**
   * @property {string} jsonUrl
   * Ruta relativa al archivo JSON que contiene los datos del domicilio.
   * Usado para cargar información desde el frontend (assets).
   * @private
   */
  private jsonUrl = 'assets/json/cofepris/domicilio.json';

  constructor(public httpServicios: HttpClient) {
    // No se necesita lógica de inicialización adicional.
  }
  /**
   * Obtiene una respuesta desde una URL y asigna los datos a una variable.
   *
   * @param {string} variable - El nombre de la variable donde se almacenarán los datos de la respuesta.
   * @param {string} url - La URL desde la cual se obtendrá la respuesta.
   * @param {Object} self - El objeto que contiene la variable donde se almacenarán los datos de la respuesta.
   * @returns {void}
   * @author Muneez
   * @remarks
   * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
   * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
   * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obtenerRespuestaPorUrl(self: any, variable: string, url: string): void {
    if (self && variable && url) {
      this.httpServicios
        .get<RespuestaCatalogos>(`assets/json${url}`)
        .subscribe((resp): void => {
          self[variable] = resp?.code === 200 && resp.data ? resp.data : [];
        });
    }
  }

  /**
   * @name obtenerListaPaises
   * @description Obtiene una lista de países desde un archivo JSON ubicado en la ruta especificada por `jsonUrl`.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de objetos de tipo `Catalogo` representando los países.
   */
  obtenerListaPaises(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ pais: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.pais));
  }

  /**
   * @name obtenerListaEstados
   * @description Obtiene una lista de estados desde un archivo JSON ubicado en la ruta especificada por `jsonUrl`.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de objetos de tipo `Catalogo` representando los estados.
   */
  obtenerListaEstados(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ estado: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.estado));
  }

  /**
   * @name getBancoDatos
   * @description Obtiene una lista de bancos desde un archivo JSON específico ubicado en `assets/json/cofepris/bancoDatos.json`.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de objetos de tipo `Catalogo` representando los bancos.
   */
  getBancoDatos(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ banco: Catalogo[] }>('assets/json/cofepris/bancoDatos.json')
      .pipe(map((res) => res.banco));
  }

  /**
   * @name obtenerListaMunicipios
   * @description Obtiene una lista de municipios desde un archivo JSON ubicado en la ruta especificada por `jsonUrl`.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de objetos de tipo `Catalogo` representando los municipios.
   */
  obtenerListaMunicipios(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ municipio: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.municipio));
  }

  /**
   * @name obtenerListaLocalidades
   * @description Obtiene una lista de localidades desde un archivo JSON ubicado en la ruta especificada por `jsonUrl`.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de objetos de tipo `Catalogo` representando las localidades.
   */
  obtenerListaLocalidades(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ localidad: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.localidad));
  }

  /**
   * @name obtenerListaCodigosPostales
   * @description Obtiene una lista de códigos postales desde un archivo JSON ubicado en la ruta especificada por `jsonUrl`.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de objetos de tipo `Catalogo` representando los códigos postales.
   */
  obtenerListaCodigosPostales(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ codigo_postal: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.codigo_postal));
  }

  /**
   * @name obtenerListaColonias
   * @description Obtiene una lista de colonias desde un archivo JSON ubicado en la ruta especificada por `jsonUrl`.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de objetos de tipo `Catalogo` representando las colonias.
   **/
  obtenerListaColonias(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ colonia: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.colonia));
  }
}
