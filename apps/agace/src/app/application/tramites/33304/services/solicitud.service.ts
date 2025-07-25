import { Solicitud33304State, Solicitud33304Store } from '../estados/solicitud33304Store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService{
  constructor(
    private http: HttpClient,
    private solicitud33304Store: Solicitud33304Store
  ) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario de la solicitud en el store con la información proporcionada.
   * Cada propiedad del objeto recibido es asignada al store correspondiente.
   * 
   * @param DATOS Objeto con la estructura completa del estado del formulario del trámite 31601.
   */
  actualizarEstadoFormulario(DATOS:Solicitud33304State): void {
    this.solicitud33304Store.actualizarEstado(DATOS);
 }

  /**
   * Obtiene el tipo de aviso desde un archivo JSON precargado.
   * @returns Observable con la estructura del estado del formulario del trámite 33304.
   */
  getTipoDeAviso(): Observable<Solicitud33304State> {
    return this.http.get<Solicitud33304State>('assets/json/33304/tipo-de-aviso.json');
  }
}
