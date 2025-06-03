import { ImportacionDefinitiva130103State, Tramite130103Store } from '../../../estados/tramites/tramite130103.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @Injectable
 * @providedIn root
 * @description
 * Decorador que marca la clase `ImportacionDefinitivaService` como un servicio inyectable en Angular.
 */
@Injectable({
  providedIn: 'root'
})

export class ImportacionDefinitivaService {

   /**
 * @constructor
 * @description
 * Constructor del servicio `ImportacionDefinitivaService`.
 * @param {HttpClient} http - Servicio de Angular para realizar solicitudes HTTP.
 * @param {Tramite130103Store} tramite130103Store - Store para manejar el estado del trámite 130103.
 */
  constructor(private http: HttpClient, private tramite130103Store: Tramite130103Store) {
    // Lógica de inicialización si es necesario
  }

  /**
 * @method getImportacionDefinitivaData
 * @description
 * Obtiene los datos de la empresa para el trámite 120602 desde un archivo JSON local.
 * 
 * Detalles:
 * - Realiza una petición HTTP GET para recuperar la información de la empresa almacenada en el archivo `empresa-solicitud.json`.
 * - Devuelve un observable que emite un objeto de tipo `ImportacionDefinitiva130103State` con los datos obtenidos.
 * 
 * @returns {Observable<ImportacionDefinitiva130103State>} Observable con los datos de la empresa para el trámite.
 * 
 * @example
 * this.importacionDefinitivaService.getImportacionDefinitivaData().subscribe(data => {
 *   console.log(data);
 * });
 */
  getImportacionDefinitivaData(): Observable<ImportacionDefinitiva130103State> {
    return this.http.get<ImportacionDefinitiva130103State>('assets/json/130103/importacion-definitiva.json');
  }

  /**
 * @method actualizarEstadoFormulario
 * @description
 * Actualiza el valor de un campo específico en el store `Tramite120101Store` de manera dinámica.
 * 
 * Detalles:
 * - Utiliza el método `setDynamicFieldValue` del store para modificar el valor del campo indicado.
 * - Permite mantener sincronizado el estado global del trámite con los cambios realizados en el formulario.
 * 
 * @param {string} campo - Nombre del campo que se desea actualizar en el store.
 * @param {unknown} valor - Valor que se asignará al campo especificado.
 * 
 * @example
 * this.actualizarEstadoFormulario('pais', 'México');
 * // Actualiza el campo 'pais' en el store con el valor 'México'.
 */
  actualizarEstadoFormulario(campo: string, valor: unknown): void {
    this.tramite130103Store.setDynamicFieldValue(campo, valor);
  }
}
