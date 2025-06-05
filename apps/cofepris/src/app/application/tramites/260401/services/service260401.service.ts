import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DatosDelSolicituteSeccionState } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';
import { DatosDelSolicituteSeccionStateStore } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';


@Injectable({
  providedIn: 'root',
})
export class Solicitud260401Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
    /**
     * urlServerCatalogos es una inyección de dependencias que proporciona la URL del servidor para los catálogos.
     */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private tramite301Store: DatosDelSolicituteSeccionStateStore,) {
    // Lógica de inicialización si es necesario
  }


}