import { Tramite40301State, Tramite40301Store } from '../estados/tramite40301.store';
import { CaatNaviroMetaInfo } from '../modelos/caat-naviero.modalidad.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite40301Query } from '../estados/tramite40301.query';

@Injectable({
  providedIn: 'root'
})
export class CapturarService {
  private baseUrl: string = 'assets/json/40301/';

  constructor(private http: HttpClient,
              private tramite40301Store: Tramite40301Store,
              private tramite40301Query: Tramite40301Query) {
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
    this.tramite40301Store.setInitialValues();
  }

  /**
   * ## gettramiteState
   * 
   * Obtiene el estado actual de la solicitud como un Observable.
   * 
   * ### Retorno
   * Un `Observable` que emite el estado de la solicitud (`Tramite40301State`).
   * 
   * ### Funcionalidad
   * Utiliza la consulta (`Query`) para seleccionar el estado actual del almacén.
   */
  getTramiteState(): Observable<Tramite40301State> {
    return this.tramite40301Query.select();
  }

  /**
   * Recupera el título para el proceso de "capturar".
   * @returns Observable<string>
   */
  obtenerMetaInfo(): Observable<CaatNaviroMetaInfo> {
    return this.http.get<CaatNaviroMetaInfo>(`${this.baseUrl}/metaData.json`);
  }

  /**
   * Recupera los roles del usuario actual.
   * @returns Observable<string[]>
   */
  obtenerRolesUsuario(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/userRoles.json`);
  }

  /**
   * Recupera el catálogo de agentes.
   * @returns Observable<Catalogo[]>
   */
  getCatalogo(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.baseUrl}/tipoAgentoData.json`);
  }

  /**
   * Recupera el ID del trámite.
   * @returns Observable<string>
   */
  obtenerIdTramite(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/obtenerIdTramite`);
  }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param data - Datos del formulario a actualizar.
   */
  actualizarEstadoFormulario(data: Tramite40301State): void {
    this.tramite40301Store.setDirectorGeneralNombre(data.directorGeneralNombre);
    this.tramite40301Store.setPrimerApellido(data.primerApellido);
    this.tramite40301Store.setSegundoApellido(data.segundoApellido);
    this.tramite40301Store.setRol(data.rol);
    this.tramite40301Store.setTipoAgente(data.tipoAgente);
  }

  /**
   * Recupera los datos guardados del trámite desde un archivo JSON.
   * @returns Observable<Tramite40301State>
   */
  getTramiteSavedData(): Observable<Tramite40301State> {
    return this.http.get<Tramite40301State>(`${this.baseUrl}/tramiteSavedData.json`);
  }
}