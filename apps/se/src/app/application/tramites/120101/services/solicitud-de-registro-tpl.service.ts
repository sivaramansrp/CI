import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsumosTabla } from '../models/insumos.model';
import { Observable } from 'rxjs';
import { RespuestaCuposTabla } from '../../120201/models/cupos.model';

/**
 * @Injectable
 * @description
 * Marca la clase `SolicitudDeRegistroTplService` como un servicio inyectable en Angular.
 * @providedIn 'root' - Indica que el servicio está disponible en el inyector raíz.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudDeRegistroTplService {
  /**
 * @property tablaInsumosTemp
 * @description
 * Almacena temporalmente los datos de la tabla de insumos en el servicio `SolicitudDeRegistroTplService`.
 * @type {InsumosTabla[]}
 */
  private tablaInsumosTemp: InsumosTabla[] = [];

  /**
   * @constructor
   * @description
   * Inicializa el servicio con una instancia de HttpClient para realizar solicitudes HTTP.
   * @param {HttpClient} http - Cliente HTTP para realizar las solicitudes.
   */
  constructor(private http: HttpClient) {
    //
  }

  /**
   * @method getClasificacionRegimenData
   * @description
   * Obtiene los datos del catálogo de monedas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de datos de monedas.
   */
  getClasificacionRegimenData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      'assets/json/120101/clasificacion-del-regimen.json'
    );
  }

  /**
   * @method getPaisData
   * @description
   * Obtiene los datos del catálogo de monedas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de datos de monedas.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120101/pais.json');
  }

  /**
   * Método para obtener datos de solicitud de tabla de cupos.
   * @returns Observable<ResquestaCatalogos> - Observable que emite la resquesta del cupos.
   * @description Método para obtener el tablón de cupos.
   */
  obtenerTablaDatos(): Observable<RespuestaCuposTabla> {
    return this.http.get<RespuestaCuposTabla>(
      'assets/json/120201/tabla-cupos.json'
    );
  }

  /**
   * @method getEstadosDatos
   * @description
   * Obtiene los datos del catálogo de monedas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de datos de monedas.
   */
  getEstadosDatos(): Observable<Catalogo> {
    return this.http.get<Catalogo>('assets/json/120101/estados.json');
  }

  /**
   * @method getRepresentacionFederalDatos
   * @description
   * Obtiene los datos del catálogo de monedas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de datos de monedas.
   */
  getRepresentacionFederalDatos(): Observable<Catalogo> {
    return this.http.get<Catalogo>(
      'assets/json/120101/representacion-federal.json'
    );
  }

  /**
 * @method obtenerDatosTablaInsumos
 * @description
 * Obtiene los datos de la tabla de insumos desde un archivo JSON.
 * 
 * Funcionalidad:
 * - Realiza una solicitud HTTP GET para obtener los datos de insumos.
 * - Devuelve un observable que emite una lista de objetos `InsumosTabla`.
 * 
 * @returns {Observable<InsumosTabla[]>} - Un observable que emite los datos de la tabla de insumos.
 * 
 * @example
 * this.solicitudDeRegistroTplService.obtenerDatosTablaInsumos().subscribe((datos) => {
 *   console.log(datos);
 * });
 */
  obtenerDatosTablaInsumos(): Observable<InsumosTabla[]> {
    return this.http.get<InsumosTabla[]>(
      'assets/json/120101/insumos-tabla.json'
    );
  }

  /**
 * @method obtenerDatosFraccionArancelaria
 * @description
 * Obtiene los datos del catálogo de fracciones arancelarias desde un archivo JSON.
 * 
 * Funcionalidad:
 * - Realiza una solicitud HTTP GET para obtener los datos de fracciones arancelarias.
 * - Devuelve un observable que emite una lista de objetos `Catalogo`.
 * 
 * @returns {Observable<Catalogo[]>} - Un observable que emite los datos del catálogo de fracciones arancelarias.
 * 
 * @example
 * this.solicitudDeRegistroTplService.obtenerDatosFraccionArancelaria().subscribe((datos) => {
 *   console.log(datos);
 * });
 */
  obtenerDatosFraccionArancelaria(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120101/pais.json');
  }

  /**
 * @method obtenerDatosEstados
 * @description
 * Obtiene los datos del catálogo de estados desde un archivo JSON.
 * 
 * Funcionalidad:
 * - Realiza una solicitud HTTP GET para obtener los datos de estados.
 * - Devuelve un observable que emite una lista de objetos `Catalogo`.
 * 
 * @returns {Observable<Catalogo[]>} - Un observable que emite los datos del catálogo de estados.
 * 
 * @example
 * this.solicitudDeRegistroTplService.obtenerDatosEstados().subscribe((datos) => {
 *   console.log(datos);
 * });
 */
  obtenerDatosEstados(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120101/estados.json');
  }

  /**
 * @method obtenerIndicarData
 * @description
 * Obtiene los datos del catálogo de opciones para el control de tipo radio en el formulario de proceso productivo.
 * 
 * Funcionalidad:
 * - Realiza una solicitud HTTP GET para obtener los datos desde un archivo JSON.
 * - Devuelve un observable que emite una lista de objetos con propiedades `label` y `value`.
 * 
 * @returns {Observable<{ label: string; value: string }[]>} - Un observable que emite los datos del catálogo.
 * 
 * @example
 * this.solicitudDeRegistroTplService.obtenerIndicarData().subscribe((datos) => {
 *   console.log(datos);
 * });
 */
  obtenerIndicarData(): Observable<{ label: string; value: string }[]> {
    return this.http.get<{ label: string; value: string }[]>(
      'assets/json/120101/proceso-productivo.json'
    );
  }

  /**
 * @method establecerTablaInsumos
 * @description
 * Establece los datos de la tabla de insumos en el servicio `SolicitudDeRegistroTplService`.
 * 
 * Funcionalidad:
 * - Actualiza la propiedad `tablaInsumosTemp` con los datos proporcionados.
 * - Permite almacenar temporalmente los datos de la tabla de insumos para su uso en otros componentes o servicios.
 * 
 * @param {InsumosTabla[]} data - Lista de objetos `InsumosTabla` que representan los datos de la tabla de insumos.
 * 
 * @example
 * const insumos = [
 *   { descripcionFraccionArancelaria: 'Textiles', fraccionArancelaria: '5201.00.00', paisDeOrigen: 'México' },
 * ];
 * this.solicitudDeRegistroTplService.establecerTablaInsumos(insumos);
 */
  establecerTablaInsumos(data: InsumosTabla[]): void {
    this.tablaInsumosTemp = data;
  }

  /**
 * @method obtenerTablaInsumos
 * @description
 * Obtiene los datos almacenados temporalmente de la tabla de insumos en el servicio `SolicitudDeRegistroTplService`.
 * 
 * Funcionalidad:
 * - Devuelve el contenido de la propiedad `tablaInsumosTemp`, que contiene los datos de la tabla de insumos.
 * 
 * @returns {InsumosTabla[]} - Lista de objetos `InsumosTabla` que representan los datos de la tabla de insumos.
 * 
 * @example
 * const insumos = this.solicitudDeRegistroTplService.obtenerTablaInsumos();
 * console.log(insumos);
 */
  obtenerTablaInsumos(): InsumosTabla[] {
    return this.tablaInsumosTemp;
  }
}
