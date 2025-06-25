import { AutorizacionProsecStore, ProsecState } from '../estados/autorizacion-prosec.store';
import { Catalogo, RespuestaCatalogos, SeccionLibStore } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * @class ProsecService
 * @description
 * Servicio encargado de manejar la obtención de catálogos y datos relacionados con el trámite PROSEC,
 * así como la actualización del estado global del formulario en el store.
 */
@Injectable({
  providedIn: 'root'
})
export class ProsecService {
  /**
   * @property {string} url
   * @description Ruta base donde se encuentran los archivos JSON con los catálogos y datos.
   */
  url: string = '../../../../../assets/json/90101/';

  /**
   * @method constructor
   * @description Constructor del servicio que inyecta dependencias necesarias como el `HttpClient` y los stores.
   * @param http Cliente HTTP para consumir archivos JSON.
   * @param store Store para el estado de autorización PROSEC.
   * @param seccionStore Store de control de secciones.
   */
  constructor(
    private readonly http: HttpClient,
    private store: AutorizacionProsecStore,
    private seccionStore: SeccionLibStore
  ) {}

  /**
   * @method obtenerMenuDesplegable
   * @description Obtiene un catálogo desde un archivo JSON ubicado localmente.
   * @param {string} fileName Nombre del archivo JSON a consultar.
   * @returns {Observable<Catalogo[]>} Observable con los datos del catálogo.
   */
  public obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }

  /**
   * @method obtenerTablaDatos
   * @description Obtiene una lista de datos genéricos desde un archivo JSON local.
   * @param {string} fileName Nombre del archivo JSON.
   * @returns {Observable<T[]>} Observable con la lista de objetos genéricos.
   */
  public obtenerTablaDatos<T>(fileName: string): Observable<T[]> {
    const JSONURL = this.url + fileName;
    return this.http.get<T[]>(JSONURL);
  }

  /**
   * @method getAcuiculturaData
   * @description Obtiene los datos precargados del formulario PROSEC (modo acuicultura) desde archivo local.
   * @returns {Observable<ProsecState>} Observable con los datos del formulario.
   */
  public getAcuiculturaData(): Observable<ProsecState> {
    return this.http.get<ProsecState>('assets/json/220203/autorizacion-prosec.json');
  }

  /**
   * @method actualizarEstadoFormulario
   * @description Actualiza todo el estado del formulario con los datos proporcionados.
   * @param {ProsecState} DATOS Objeto con los datos del formulario.
   * @returns {void}
   */
  public actualizarEstadoFormulario(DATOS: ProsecState): void {
    this.store.setModalidad(DATOS.modalidad);
    this.store.setEstado(DATOS.Estado);
    this.store.setRepresentacionFederal(DATOS.RepresentacionFederal);
    this.store.setActividadProductiva(DATOS.ActividadProductiva);
    this.store.setSector(DATOS.Sector);
    this.store.setFraccionArancelaria(DATOS.Fraccion_arancelaria);
    this.store.setcontribuyentes(DATOS.contribuyentes);
  }

  /**
   * @method formValida
   * @description Verifica si todas las secciones del formulario son válidas y actualiza el store correspondiente.
   * @returns {void}
   */
  public formValida(): void {
    if (
      this.store.getValue().domiciliosFormaValida &&
      this.store.getValue().productorFromValida &&
      this.store.getValue().sectoresFromValida
    ) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    }
  }
}
