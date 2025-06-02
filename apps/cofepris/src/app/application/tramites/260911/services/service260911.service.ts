import { Tramite260911State, Tramite260911Store } from '../estados/tramite260911.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @description
 * Servicio encargado de gestionar las operaciones relacionadas con el trámite 120402,
 * incluyendo la actualización del estado del formulario y la obtención de datos de ejemplo
 * para la toma de muestras de mercancías.
 */
@Injectable({
  providedIn: 'root',
})
export class Solocitud260911Service {
  /**
   * @description
   * URL base del servidor principal de la aplicación, proveniente de las variables de entorno.
   */
  urlServer = ENVIRONMENT.URL_SERVER;

  /**
   * @description
   * URL del servidor de catálogos JSON auxiliares, utilizado para obtener datos estáticos.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * @description
   * Constructor del servicio que inyecta las dependencias necesarias.
   * 
   * @param http Cliente HTTP para realizar solicitudes al servidor.
   * @param tramite120402Store Estado global relacionado con el trámite 120402.
   */
  constructor(
    private http: HttpClient,
    private tramite120402Store: Tramite260911Store,
  ) {
    // Inicialización adicional si es necesario
  }

  /**
   * @description
   * Actualiza el estado del formulario del trámite 120402 dentro del store.
   *
   * @param DATOS Objeto con el nuevo estado del trámite 120402.
   */
  actualizarEstadoFormulario(DATOS: Tramite260911State): void {
    this.tramite120402Store.setTramite260911State(DATOS);
  }

  /**
   * @description
   * Obtiene los datos de ejemplo para el formulario de registro de toma de muestras
   * de mercancías desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto con el estado del trámite 120402.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260911State> {
    return this.http.get<Tramite260911State>('assets/json/260911/consulta-journy-data.json');
  }

}
