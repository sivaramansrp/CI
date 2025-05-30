import { CertiRegistro302State, Tramite302Store } from '../../../core/estados/tramites/tramite302.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Solicitud302Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private tramite302Store: Tramite302Store) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario asignando nuevos valores a los campos dinámicos.
   *
   * @param datos Un objeto que contiene pares clave-valor donde la clave es el nombre del campo
   *              y el valor es el nuevo valor a asignar en el store de tramite302.
   *
   * Recorre cada entrada del objeto `datos` y actualiza el valor correspondiente en el store
   * utilizando el método `setDynamicFieldValue`.
   */
  actualizarEstadoFormulario(datos:object): void {
   Object.entries(datos).forEach(([key, value]) => { 
   this.tramite302Store.setDynamicFieldValue(key, value);
  })
}

  /**
   * Obtiene los datos del certificado de registro para el trámite 302.
   * 
   * Realiza una solicitud HTTP GET para recuperar el estado del certificado de registro
   * desde un archivo JSON local ubicado en 'assets/json/302/certi-registro.json'.
   *
   * @returns Un Observable que emite el estado del certificado de registro (`CertiRegistro302State`).
   */
  getCertiRegistroDatos(): Observable<CertiRegistro302State> {
    return this.http.get<CertiRegistro302State>('assets/json/302/certi-registro.json');
  }

}
