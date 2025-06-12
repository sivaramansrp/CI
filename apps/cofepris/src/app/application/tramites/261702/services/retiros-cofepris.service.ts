import { RetirosCofepris261702State, Tramite261702Store } from '../../../estados/tramites/tramite261702.store';
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
export class RetirosCofeprisService {

  /**
   * Crea una nueva instancia del servicio RetirosCofeprisService.
   * 
   * @param http Instancia de HttpClient utilizada para realizar solicitudes HTTP.
   * @param tramite261702Store Instancia de Tramite261702Store para gestionar el estado relacionado con el trámite 261702.
   * 
   * @remarks
   * Puede incluir lógica de inicialización adicional si es necesario.
   */
  constructor(private http: HttpClient, private tramite261702Store: Tramite261702Store) { 
   // Lógica de inicialización si es necesario
  }

  /**
   * Obtiene los datos de importación definitiva desde un archivo JSON local.
   *
   * @returns Un observable que emite el estado de RetirosCofepris261702State con los datos de importación definitiva.
   */
   getImportacionDefinitivaData(): Observable<RetirosCofepris261702State> {
    return this.http.get<RetirosCofepris261702State>('assets/json/261702/registro_toma_muestras_mercancias.json');
    
  }

  /**
   * Actualiza el estado de un campo específico en el formulario del trámite 261702.
   *
   * @param campo - El nombre del campo del formulario que se desea actualizar.
   * @param valor - El nuevo valor que se asignará al campo especificado.
   */
   actualizarEstadoFormulario(campo: string, valor: unknown): void {
    this.tramite261702Store.setDynamicFieldValue(campo, valor);
  }
}
