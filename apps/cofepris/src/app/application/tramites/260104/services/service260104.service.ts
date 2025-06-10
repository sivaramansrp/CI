import { Solicitud260104State, Tramite260104StoreDos } from '../../../estados/tramites/tramite260104.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Solocitud260104Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private tramite260104StoreDos: Tramite260104StoreDos,) {
    // Lógica de inicialización si es necesario
  }

  actualizarEstadoFormularioDos(DATOS: Solicitud260104State): void {
    
  }

  getRegistroTomaMuestrasMercanciasDataDos(): Observable<Solicitud260104State> {
    return this.http.get<Solicitud260104State>('assets/json/260104/registro_toma_muestras_mercancias.json');
  }

}
