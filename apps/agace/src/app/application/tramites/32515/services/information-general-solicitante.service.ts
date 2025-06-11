import { InformationGeneralSolicitanteState, Tramite32515Store } from '../estados/tramite32515.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationGeneralSolicitanteService {

  // Constructor del servicio que inyecta HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient,public tramite32515Store:Tramite32515Store) { }

  /**
   * @method getEntidadFederativa
   * @description
   * Obtiene el catálogo de entidades federativas desde un archivo JSON local.
   * Este catálogo se utiliza para llenar selectores en formularios dinámicos.
   * @returns {Observable<Catalogo[]>} Un observable con la lista de entidades federativas.
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32515/entidadFederativa.json');
  }

  /**
   * @method getMunicipio
   * @description
   * Recupera el catálogo de municipios o demarcaciones territoriales.
   * Este catálogo está almacenado en un archivo JSON local.
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de municipios.
   */
  getMunicipio(): Observable<Catalogo[]> { 
    return this.http.get<Catalogo[]>('assets/json/32515/municion.json');
  }

  /**
   * @method getColonia
   * @description
   * Obtiene el catálogo de colonias desde un archivo JSON local.
   * Usado comúnmente en formularios donde se requiere la dirección.
   * @returns {Observable<Catalogo[]>} Un observable que contiene la lista de colonias.
   */
  getColonia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32515/colonia.json');
  }
  /**
 * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
 * 
 * @returns Observable con los datos del estado de la solicitud `TramiteState`,
 *          cargados desde el archivo JSON especificado en la ruta de `assets`.
 */
  getRegistroTomaMuestrasMercanciasData(): Observable<InformationGeneralSolicitanteState> {
    return this.http.get<InformationGeneralSolicitanteState>('assets/json/32515/datos-previos.json');
  }


  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * 
   * @param DATOS - Estado de la solicitud `TramiteState` con la información 
   *                del tipo de solicitud a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: InformationGeneralSolicitanteState): void {
    this.tramite32515Store.update((state) => ({
      ...state,
      ...DATOS
    }))

  }
}
