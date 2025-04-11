import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solicitud40301State, Solicitud40301Store } from '../estados/tramite40301.store';
import { CaatNaviroMetaInfo } from '../modelos/caat-naviero.modalidad.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitud40301Query } from '../estados/tramite40301.query';


@Injectable({
  providedIn: 'root'
})
export class CapturarService {
  private baseUrl: string = 'assets/json/40301/'; // Adjust the base URL as needed

  constructor(private http: HttpClient,
              private solicitudStore: Solicitud40301Store,
              private solicitudQuery: Solicitud40301Query) {
    // Lógica del constructor aquí
  }

  /**
   * ## setInitialValues
   * 
   * Establece los valores iniciales del estado de la solicitud en el almacén.
   * 
   * ### Funcionalidad
   * Actualiza el estado del almacén con los valores predeterminados.
   */
    setInitialValues(): void {
      this.solicitudStore.update((state) => ({
        ...state,
          cveFolioCaat: '3L6V',
          descTipoCaat: 'Naviero',
          tipoAgente: 'Agente Naviero',
          directorGeneralNombre: 'HAZEL',
          primerApellido: 'NAVA',
          segundoApellido: 'AVILA',
          rol: 'Agente Naviero',
        }));
    }
    
      /**
       * ## getSolicitudState
       * 
       * Obtiene el estado actual de la solicitud como un Observable.
       * 
       * ### Retorno
       * Un `Observable` que emite el estado de la solicitud (`Solicitud40302State`).
       * 
       * ### Funcionalidad
       * Utiliza la consulta (`Query`) para seleccionar el estado actual del almacén.
       */
      getSolicitudState(): Observable<Solicitud40301State> {
        return this.solicitudQuery.select();
      }

  /**
   * Retrieves the title for the "capturar" process.
   * @returns Observable<string>
   */
  obtenerMetaInfo(catalogo: string): Observable<CaatNaviroMetaInfo> {
    return this.http.get<CaatNaviroMetaInfo>(`${this.baseUrl}/metaData.json`);
  }

  /**
   * Retrieves the roles of the current user.
   * @returns Observable<string[]>
   */
  obtenerRolesUsuario(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/userRoles.json`);
    // return of(["persomanMoral"]);
  }

  getCatalogo(AGENT_CATALOG: string): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.baseUrl}/tipoAgentoData.json`);
  }

  /**
   * Retrieves the tramite ID.
   * @returns Observable<string>
   */
  obtenerIdTramite(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/obtenerIdTramite`);
  }
}