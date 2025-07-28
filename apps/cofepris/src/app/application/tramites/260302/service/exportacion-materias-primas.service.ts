import { Facturador } from '../../../shared/models/terceros-relacionados.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite260302Store } from '../estados/tramite260302Store.store';

/**
 * Servicio para manejar las operaciones relacionadas con el trámite de exportación de materias primas 260302.
 * 
 * Este servicio proporciona métodos para:
 * - Obtener datos de facturadores desde archivos JSON
 * - Actualizar el estado del formulario en el store
 * - Cargar datos del trámite desde archivos JSON locales
 */
@Injectable({
  providedIn: 'root',
})
export class ExportacionMateriasPrimasService {
  /**
   * Ruta base para los archivos JSON que contienen datos relacionados con el trámite 260301.
   * 
   * Esta propiedad define la ubicación de los archivos JSON que se utilizan
   * para cargar información desde el frontend (carpeta assets).
   * 
   * @type {string}
   * @private
   * @readonly
   * @default 'assets/json/260301/'
   * @example
   * // Se utiliza para construir rutas como:
   * // 'assets/json/260301/buscar-otros.json'
   */
  private jsonUrl = 'assets/json/260301/';

  /**
   * Constructor del servicio ExportacionMateriasPrimasService.
   * 
   * Inicializa las dependencias necesarias para el funcionamiento del servicio,
   * incluyendo el cliente HTTP para realizar peticiones y el store para manejar
   * el estado del formulario del trámite 260302.
   * 
   * @param {HttpClient} httpServicios - Cliente HTTP de Angular para realizar peticiones HTTP
   * @param {Tramite260302Store} tramite260302Store - Store para manejar el estado del trámite 260302
   * @memberof ExportacionMateriasPrimasService
   * @constructor
   */
  constructor(public httpServicios: HttpClient, private tramite260302Store: Tramite260302Store) {
    // Constructor necesario para inyectar el servicio HttpClient
  }

  /**
   * Obtiene datos de un facturador desde un archivo JSON remoto.
   * 
   * Este método realiza una solicitud HTTP GET a la URL especificada para
   * obtener información de un facturador desde el archivo 'buscar-otros.json'.
   * La petición es asíncrona y devuelve un observable que emite los datos
   * cuando la respuesta está disponible.
   * 
   * @method obtenerOstro
   * @returns {Observable<Facturador>} Observable que emite los datos del facturador
   * @throws {Error} Puede lanzar errores relacionados con la petición HTTP
   * @example
   * ```typescript
   * this.exportacionService.obtenerOstro().subscribe({
   *   next: (facturador) => console.log(facturador),
   *   error: (error) => console.error('Error al obtener facturador:', error)
   * });
   * ```
   * @see {@link Facturador} - Modelo de datos del facturador
   * @memberof ExportacionMateriasPrimasService
   */
  obtenerOstro(): Observable<Facturador> {
    return this.httpServicios.get<Facturador>(
      this.jsonUrl + 'buscar-otros.json'
    );
  }
  /**
   * Actualiza el estado del formulario del trámite 260302 en el store.
   * 
   * Este método toma los datos proporcionados y los fusiona con el estado actual
   * del store utilizando el operador spread. Esto permite actualizar parcialmente
   * el estado sin perder información existente.
   * 
   * @method actualizarEstadoFormulario
   * @param {Tramite260302Store} datos - Objeto con los nuevos datos del estado del formulario
   * @returns {void} No retorna ningún valor
   * @example
   * ```typescript
   * const nuevosDatos: Tramite260302Store = {
   *   // ... propiedades del formulario
   * };
   * this.exportacionService.actualizarEstadoFormulario(nuevosDatos);
   * ```
   * @see {@link Tramite260302Store} - Interfaz del estado del trámite 260302
   * @memberof ExportacionMateriasPrimasService
   */
 actualizarEstadoFormulario(datos: Tramite260302Store): void {
   this.tramite260302Store.update((state) => {
     return {
       ...state, ...datos
     }
   });
 }

 /**
  * Obtiene los datos del trámite 260302 desde un archivo JSON local.
  * 
  * Este método realiza una petición HTTP GET para cargar los datos del trámite
  * desde el archivo 'datos.json' ubicado en la carpeta de assets. Los datos
  * obtenidos contienen la información completa del estado del trámite 260302.
  * 
  * @method getTramiteDatos
  * @returns {Observable<Tramite260302Store>} Observable que emite el estado completo del trámite 260302
  * @throws {Error} Puede lanzar errores relacionados con la petición HTTP o la estructura del archivo JSON
  * @example
  * ```typescript
  * this.exportacionService.getTramiteDatos().subscribe({
  *   next: (datos) => {
  *     console.log('Datos del trámite cargados:', datos);
  *     // Procesar los datos del trámite
  *   },
  *   error: (error) => console.error('Error al cargar datos del trámite:', error)
  * });
  * ```
  * @see {@link Tramite260302Store} - Interfaz del estado del trámite 260302
  * @memberof ExportacionMateriasPrimasService
  */
 getTramiteDatos(): Observable<Tramite260302Store> {
   return this.httpServicios.get<Tramite260302Store>('assets/json/260302/datos.json');
 }

}
