import { Tramite120402State, Tramite120402Store } from '../estados/tramites/tramite120402.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Solocitud120402Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private tramite120402Store: Tramite120402Store,) {
    // Lógica de inicialización si es necesario
  }

  actualizarEstadoFormulario(DATOS: Tramite120402State): void {
 
    this.tramite120402Store.setTramite120402State(DATOS);
  
   
  }

  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite120402State> {
    return this.http.get<Tramite120402State>('assets/json/120402/consulta-journy-data.json');
  }

}
