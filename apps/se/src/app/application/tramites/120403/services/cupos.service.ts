import { Catalogo, Solicitud120403State, Tramite120403Store } from '../state/Tramite120403.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con los cupos.
 * Proporciona métodos para obtener datos necesarios para el trámite.
 */
@Injectable({
  providedIn: 'root',
})
export class CuposService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient, private tramite120403Store: Tramite120403Store) {}
/**
     * Actualiza el estado global del formulario con los datos proporcionados.
     * @param DATOS Objeto con los datos del formulario de tipo Solicitud120403State.
     */
  actualizarEstadoFormulario(DATOS: Solicitud120403State): void {
    this.tramite120403Store.setAsignacionRadio(DATOS.asignacionRadio);
    this.tramite120403Store.setAsignacionsolitud(DATOS.asignacionsolitud);
    this.tramite120403Store.setNumTramite(DATOS.numTramite);
  }
  /**
     * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
     * @returns Observable con los datos del formulario.
     */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud120403State> {
    return this.http.get<Solicitud120403State>('assets/json/120403/registro_toma_muestras_mercancias.json');
  }
  /**
   * Obtiene los datos del catálogo de años.
   * Realiza una solicitud HTTP para obtener los datos desde un archivo JSON.
   * @returns Un observable que emite una lista de objetos del tipo `Catalogo`.
   */
  obtenerDatosAno(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120403/ano.json');
  }
}