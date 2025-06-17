import { AppSedenaModule } from '../../app.module';
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '../models/datos-solicitud.model';
import { Tramite240118State } from '../../tramites/240118/estados/tramite240118Store.store';
import { map } from 'rxjs';
import { Tramite240114State } from '../../tramites/240114/estados/tramite240114Store.store';

@Injectable({
  providedIn: AppSedenaModule,
})
export class DatosSolicitudService {
  /**
   * @property {string} jsonUrl
   * Ruta relativa al archivo JSON que contiene los datos del domicilio.
   * Usado para cargar información desde el frontend (assets).
   * @private
   */
  private jsonUrl = 'assets/json/sedena/domicilio.json';

  // eslint-disable-next-line no-empty-function
  constructor(public httpServicios: HttpClient) {}
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
   * Obtiene la lista de países desde el archivo JSON.
   *
   * @method obtenerListaPaises
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de países.
   */
  obtenerListaPaises(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ pais: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.pais));
  }

  /**
   * Obtiene la lista de entidades federativas (estados) desde el archivo JSON.
   *
   * @method obtenerListaEstados
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de estados.
   */
  obtenerListaEstados(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ estado: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.estado));
  }

  /**
   * Obtiene la lista de municipios desde el archivo JSON.
   *
   * @method obtenerListaMunicipios
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de municipios.
   */
  obtenerListaMunicipios(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ municipio: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.municipio));
  }

  /**
   * Obtiene la lista de localidades desde el archivo JSON.
   *
   * @method obtenerListaLocalidades
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de localidades.
   */
  obtenerListaLocalidades(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ localidad: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.localidad));
  }

  /**
   * Obtiene la lista de códigos postales desde el archivo JSON.
   *
   * @method obtenerListaCodigosPostales
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de códigos postales.
   */
  obtenerListaCodigosPostales(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ codigo_postal: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.codigo_postal));
  }

  /**
   * Obtiene la lista de colonias desde el archivo JSON.
   *
   * @method obtenerListaColonias
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de colonias.
   */
  obtenerListaColonias(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ colonia: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.colonia));
  }

  /**
   * Obtiene el catálogo de bancos desde el archivo JSON.
   *
   * @method obtenerBancos
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de bancos.
   */
  obtenerBancos(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ banco: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.banco));
  }

  /**
   * Obtiene el catálogo de fracciones arancelarias desde el archivo JSON.
   *
   * @method obtenerFraccionesCatalogo
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de fracciones arancelarias.
   */
  obtenerFraccionesCatalogo(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ fraccionesCatalogo: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.fraccionesCatalogo));
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial (UMC) desde el archivo JSON.
   *
   * @method obtenerUMCCatalogo
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de UMC.
   */
  obtenerUMCCatalogo(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ umcCatalogo: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.umcCatalogo));
  }

  /**
   * Obtiene el catálogo de tipos de moneda desde el archivo JSON.
   *
   * @method obtenerMonedaCatalogo
   * @returns {Observable<Catalogo[]>} Observable con el catálogo de monedas.
   */
  obtenerMonedaCatalogo(): Observable<Catalogo[]> {
    return this.httpServicios
      .get<{ monedaCatalogo: Catalogo[] }>(this.jsonUrl)
      .pipe(map((res) => res.monedaCatalogo));
  }

  /**
   * Obtiene los datos de registro de toma de muestras de mercancías.
   * @returns Observable con los datos del formulario de registro.
   */
  obtenerRegistroTomarMuestrasDatos240118(): Observable<Tramite240118State> {
    return this.httpServicios.get<Tramite240118State>(
      'assets/json/240118/respuestaDeActualizacionDe.json'
    );
  }
  /**
   * Obtiene los datos de registro de toma de muestras de mercancías.
   * @returns Observable con los datos del formulario de registro.
   */
  obtenerRegistroTomarMuestrasDatos(): Observable<Tramite240114State> {
    return this.httpServicios.get<Tramite240114State>(
      'assets/json/240114/respuestaDeActualizacionDe.json'
    );
  }
}
