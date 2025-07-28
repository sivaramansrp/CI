import {
  Solicitud33304State,
  Solicitud33304Store,
} from '../estados/solicitud33304Store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(
    private http: HttpClient,
    private solicitud33304Store: Solicitud33304Store
  ) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Obtiene el tipo de aviso desde un archivo JSON precargado.
   * @returns Observable con la estructura del estado del formulario del trámite 33304.
   */
  getTipoDeAviso(): Observable<Solicitud33304State> {
    return this.http.get<Solicitud33304State>(
      'assets/json/33304/tipo-de-aviso.json'
    );
  }

  /**
   * Obtiene el catálogo de estatus desde un archivo JSON local.
   * @returns Observable que emite la respuesta con los datos del catálogo de estatus.
   */
  getEstatus(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/33304/estatus.json');
  }

  /**
   * Obtiene los datos completos de la solicitud desde un archivo JSON local.
   * Utilizado para cargar información predeterminada o datos guardados previamente.
   *
   * returns Observable que emite el estado completo de la solicitud 33304
   */
  obtenerDatos(): Observable<Solicitud33304State> {
    return this.http.get<Solicitud33304State>('assets/json/33304/datos.json');
  }

  /**
   * Actualiza el estado del formulario de la solicitud en el store con la información proporcionada.
   * Cada propiedad del objeto recibido es asignada al store correspondiente.
   *
   * @param DATOS Objeto con la estructura completa del estado del formulario del trámite 31601.
   */
  actualizarEstadoFormulario(DATOS: Solicitud33304State): void {
    this.solicitud33304Store.actualizarEstado(DATOS);
  }
}
