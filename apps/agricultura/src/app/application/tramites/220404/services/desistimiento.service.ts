import { DesistimientoForm } from '../modelos/desistimiento.model';
import { DesistimientoStore } from '../estados/tramite220404.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DesistimientoService {

  /**
   * URL base para obtener los datos simulados desde archivos JSON.
   * @private
   * @type {string}
   */
  private desistimientoUrl = '/assets/json/220404/';

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient,public DesistimientoStore: DesistimientoStore) {
    /** No se necesita lógica de inicialización adicional. */
  }

  /**
   * Obtiene los datos simulados para el formulario de cambio de modalidad.
   * 
   * @returns {Observable<SolicitudForm>} Observable que emite los datos del formulario.
   */
  getDesistimientoSolicitud(): Observable<DesistimientoForm> {
    return this.http.get<DesistimientoForm>(`${this.desistimientoUrl}desistimiento.json`);
  }

  /**
   * Guarda los datos del formulario de desistimiento en el store.
   * 
   * @param {Partial<DesistimientoForm>} datos - Datos parciales del formulario a guardar.
   */
  guardarFormularioDesistimiento(datos: Partial<DesistimientoForm>): void {
    this.DesistimientoStore.update((state) => ({
      ...state,
      ...datos
    }));
  }

  
/**
 * Actualiza el estado del formulario de desistimiento en el store.
 * 
 * @param {Partial<DesistimientoForm>} DATOS - Datos parciales del formulario para actualizar el estado.
 */
actualizarEstadoFormulario(DATOS: Partial<DesistimientoForm>): void {
  this.DesistimientoStore.update((state) => ({
    ...state,
    ...DATOS
  }));
}



/**
 * Obtiene los datos del formulario de desistimiento para la toma de muestras de mercancías.
 *
 * Realiza una petición HTTP GET para recuperar el objeto `DesistimientoForm` desde un archivo JSON local.
 *
 * @returns Un observable que emite los datos del formulario de desistimiento.
 */
getRegistroTomaMuestrasMercanciasData(): Observable<DesistimientoForm> {
  return this.http.get<DesistimientoForm>(`assets/json/220404/descripcion.json`);
}
}