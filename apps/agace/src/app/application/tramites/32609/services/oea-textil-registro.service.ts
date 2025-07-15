import { ApiResponse, BuscarRfcResponse, InstalacionesInterface } from '../modelos/oea-textil-registro.model';
import { Observable, forkJoin } from 'rxjs';
import { StoreResponse, Tramite32609Store, Tramites32609State } from '../estados/tramites32609.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para manejar las renovaciones de muestras de mercancías.
 * 
 * @remarks
 * Este servicio proporciona métodos para interactuar con la API relacionada con las renovaciones de muestras de mercancías.
 */
@Injectable({
  providedIn: 'root',
})
export class OeaTextilRegistroService {

  /**
   * Constructor del servicio OeaTextilRegistroService.
   * 
   * @param httpClient - Cliente HTTP inyectado para realizar solicitudes HTTP.
   */
  constructor(
    private http: HttpClient,
    private tramite32609Store: Tramite32609Store,
  ) {
       // Si es necesario, se puede agregar aquí la lógica de inicialización
  }


sectorListaDeSelects(): Observable<{
  sectorProductivoList: Catalogo[];
  sectorServicioList: Catalogo[];
  bimestreList: Catalogo[];
}> {
  return forkJoin({
    sectorProductivoList: this.http.get<Catalogo[]>('assets/json/32609/sector-productivo-list.json'),
    sectorServicioList: this.http.get<Catalogo[]>('assets/json/32609/sector-servicio-list.json'),
    bimestreList: this.http.get<Catalogo[]>('assets/json/32609/bimestre-list.json'),
  });
}

  /**
   * Obtiene los detalles del RFC desde un archivo JSON local.
   * 
   * @returns {Observable<BuscarRfcResponse>} Un observable que emite los detalles del RFC.
   */
  getRFCDetails(): Observable<BuscarRfcResponse> {
    return this.http.get<BuscarRfcResponse>('assets/json/32609/buscar-rfc-datos.json');
  }

  /**
   * Obtiene la lista de Entidades Federativas.
   * 
   * @returns {Observable<any>} Un observable que contiene los datos de las entidades federativas.
   */
  getEntidadesFederativas(): Observable<ApiResponse<Catalogo>> {
    return this.http.get<ApiResponse<Catalogo>>(`assets/json/32609/entidad-federativa-list.json`);
  }

  /**
   * Obtiene la lista de instalaciones desde un archivo JSON local.
   * 
   * @returns {Observable<ApiResponse<InstalacionesInterface>>} Un observable que emite los datos de las instalaciones.
   */
  getInstalacionesDatos(): Observable<ApiResponse<InstalacionesInterface>> {
    return this.http.get<ApiResponse<InstalacionesInterface>>(`assets/json/32609/instalaciones-list.json`);
  }

    /**
   * Obtiene la lista de Entidades Federativas.
   * 
   * @returns {Observable<any>} Un observable que contiene los datos de las entidades federativas.
   */
  getDomiciliosRegistrados(): Observable<ApiResponse<Catalogo>> {
    return this.http.get<ApiResponse<Catalogo>>(`assets/json/32609/domicilios-registrados-list.json`);
  }

  getTipoInstalacion(): Observable<ApiResponse<Catalogo>> {
    return this.http.get<ApiResponse<Catalogo>>(`assets/json/32609/tipo-Instalacion-list.json`);
  }

 /**
   * Obtiene la lista de Municipios/Alcaldías.
   * 
   * @returns {Observable<any>} Un observable que contiene los datos de los municipios o alcaldías.
   */
  // getMunicipiosAlcaldias(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(`assets/json/32609/municipio-delegacion-list.json`);
  // }

  /**
   * Obtiene la lista de colonias.
   * 
   * @returns {Observable<any>} Un observable que contiene los datos de las colonias.
   */
  // getColonias(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(`assets/json/32609/colonia-list.json`);
  // }

  /**
 * Obtiene la lista de aduanas desde un archivo JSON local.
 * 
 * @returns {Observable<Catalogo[]>} Un observable que contiene un array con los datos de las aduanas.
 * 
 * El archivo JSON está ubicado en `assets/json/32609/aduanas`.
 */
  // getAduanas(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(`assets/json/32609/tipode-transito-list.json`);
  // }
  

  /**
   * Actualiza el estado del formulario en el store global.
   *
   * @param datos - Objeto de tipo Tramites32609State con los datos a establecer en el store.
   * @returns {void}
   */
  actualizarEstadoFormulario(datos: Tramites32609State): void {
      this.tramite32609Store.establecerDatos(datos);
  }

  /**
   * Obtiene los datos de toma de muestras de mercancías desde un archivo JSON local.
   *
   * @returns {Observable<Tramites32609State>} Un observable que emite los datos del trámite 32609.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<StoreResponse> {
    return this.http.get<StoreResponse>('assets/json/32609/datos-oea-textil.json');
  }


  empresaListaDeSelects(): Observable<{
  enSuCaracterDeList: Catalogo[];
  nacionalidadList: Catalogo[];
  tipoDePersonaList: Catalogo[];
}> {
  return forkJoin({
    enSuCaracterDeList: this.http.get<Catalogo[]>('assets/json/32609/en-su-caracter-de-list.json'),
    nacionalidadList: this.http.get<Catalogo[]>('assets/json/32609/nacionali-dad-list.json'),
    tipoDePersonaList: this.http.get<Catalogo[]>('assets/json/32609/tipo-de-persona-list.json'),
  });
}

}
