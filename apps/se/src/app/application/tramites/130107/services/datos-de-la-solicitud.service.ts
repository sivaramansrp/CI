import { ImportacionesAgropecuariasState, ImportacionesAgropecuariasStore } from '../estados/importaciones-agropecuarias.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @Injectable
 * @providedIn root
 * @description
 * Decorador que marca la clase `DatosDeLaSolicitudService` como un servicio inyectable en Angular.
 */
@Injectable({
  providedIn: 'root'
})
export class DatosDeLaSolicitudService {

  /**
   * @constructor
   * @description
   * Constructor del servicio `RegistroDeSolicitudService`.
   * Inyecta el servicio HttpClient para realizar peticiones HTTP y el store para manejar el estado de cancelación.
   * @param {HttpClient} http - Servicio de Angular para realizar solicitudes HTTP.
   * @param {CancelacionStore} cancelacionStore - Store para manejar el estado del cancelacionStore.
   */
  constructor(private http: HttpClient , private importacionesAgropecuariasStore: ImportacionesAgropecuariasStore) {
    // Lógica de inicialización si es necesario
  }

  /**
   * @method getImportacionDefinitivaData
   * @description
   * Obtiene los datos de importación definitiva desde un archivo JSON local.
   * Realiza una petición HTTP GET y retorna un observable con el estado de cancelación.
   * @returns {Observable<CancelacionState>} Observable con los datos del estado de cancelación.
   */
  getImportacionDefinitivaData(): Observable<ImportacionesAgropecuariasState> {
    return this.http.get<ImportacionesAgropecuariasState>('assets/json/130107/solicitud-datos.json');
  }

  /**
   * @method actualizarEstadoFormulario
   * @description
   * Actualiza el valor de un campo específico en el store `CancelacionStore` de manera dinámica.
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
    this.importacionesAgropecuariasStore.setDynamicFieldValue(
      campo,
      valor as string | number | boolean | null | undefined
    );
  }
  
}