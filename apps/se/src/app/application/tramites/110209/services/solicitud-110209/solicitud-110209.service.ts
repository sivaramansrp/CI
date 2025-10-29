import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tramite110209State, Tramite110209Store } from '../../estados/stores/tramite110209.store';

@Injectable({
  providedIn: 'root'
})
export class Solicitud110209Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
// URL base para consumir los catálogos auxiliares desde el servidor.
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;
  constructor(
    private http: HttpClient,
    private tramite110209Store: Tramite110209Store,
  ) {
    //
   }

/** Actualiza el estado del formulario en el store con los datos proporcionados.  
 *  Establece el régimen seleccionado desde el objeto de estado.
 *  */
 actualizarEstadoFormulario(DATOS: Tramite110209State): void {
   this.tramite110209Store.update(DATOS);
 }

/** Obtiene los datos simulados del registro de toma de muestras de mercancías  
 *  desde un archivo JSON local para el trámite 110203. */
 getRegistroTomaMuestrasMercanciasData(): Observable<Tramite110209State> {
   return this.http.get<Tramite110209State>('assets/json/110203/serviciosExtraordinarios.json');
 }
   
}
