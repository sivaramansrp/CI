import {CamState, camCertificadoStore} from '../estados/cam-certificado.store';
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

/**
 * Servicio para la gestión de solicitudes del certificado zoosanitario.
 * Este servicio permite actualizar y obtener información relacionada con el proceso de captura
 * de la solicitud, incluyendo datos del solicitante, movilización, terceros relacionados, pagos y validaciones.
 *
 * @export
 * @class CamCertificadoService
 * @description Servicio para gestionar la obtención y actualización de datos relacionados con el certificado CAM.
 * Proporciona métodos para obtener menús desplegables, datos de tablas y el estado completo del certificado CAM desde archivos JSON,
 * así como para actualizar el estado del formulario en el store correspondiente.
 *
 * @author
 * @version 1.0
 * @date 2024-06-07
 * @export
 * @class CamCertificadoService
 * @see CamState
 * @see Catalogo
 * @see Mercancia
 * @see camCertificadoStore
 * @see RespuestaCatalogos
 * @see HttpClient
 * @see Observable
 * @see Injectable
 * @see map
 * @see obtenerMenuDesplegable
 * @see obtenerTablaDatos
 * @see obtenerTodosDatosCamCertificado
 * @see actualizarEstadoFormulario
 * @compodoc
 */
@Injectable({
  providedIn: 'root'
})

export class CamCertificadoService {
  url: string = '../../../../../assets/json/110211/';

  constructor(private readonly http: HttpClient,private tramite110211Store:camCertificadoStore ) { }
 
  /**
   * * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * @description Obtiene un array de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un array de objetos `Catalogo`.
   * @method obtenerMenuDesplegable
   * @memberof CamCertificadoService
   * @usageNotes
   * 
   * Ejemplo:
   * ```typescript
   * this.camCertificadoService.obtenerMenuDesplegable('menu.json').subscribe(menu => {
   *   console.log(menu);
   * });
   * ```
   * @compodoc
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
      map(response => response.data)
    );
  }

  /**
   * @description Obtiene un array de objetos `Mercancia` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un array de objetos `Mercancia`.
   * @method obtenerTablaDatos
   * @memberof CamCertificadoService
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * 
   * Ejemplo:
   * ```typescript
   * this.camCertificadoService.obtenerTablaDatos('data.json').subscribe(data => {
   *   console.log(data);
   * });
   * ```
   * @compodoc
   */
  obtenerTablaDatos(fileName: string): Observable<Mercancia[]> {
    const JSON_URL = this.url + fileName;
      return this.http.get<Mercancia[]>(JSON_URL);
  }

  /**
   * @description Obtiene todos los datos del certificado CAM desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un objeto `CamState`.
   * @method obtenerTodosDatosCamCertificado
   * @memberof CamCertificadoService
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * 
   * Ejemplo:
   * ```typescript
   * this.camCertificadoService.obtenerTodosDatosCamCertificado('camcertificado.json').subscribe(data => {
   *   console.log(data);
   * });
   * ```
   * @compodoc
   */
  obtenerTodosDatosCamCertificado(fileName: string): Observable<CamState> {
    const JSON_URL = this.url + fileName;
    return this.http.get<CamState>(JSON_URL);
  }

  /**
   *
   * Actualiza el estado completo del formulario en el store correspondiente usando los datos recibidos.
   * @method actualizarEstadoFormulario
   * @description Actualiza el estado del formulario con los datos proporcionados.
   * @param {CamState} DATOS - Objeto que contiene el nuevo estado del formulario.
   * @returns {void}
   *
   * @memberof CamCertificadoService
   *
   */
  actualizarEstadoFormulario(DATOS:CamState):void{
    this.tramite110211Store.setEstadoCompleto(DATOS);
  }

}
