import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Anexo, Bitacora, Complimentaria, Empresas, Federetarios, FraccionSensible, Operacions, Plantas, Servicios } from '../models/datos-tramite.model';

/**
 * Servicio `SolicitudService` utilizado para gestionar las solicitudes relacionadas con el trámite 80316.
 * Este servicio proporciona métodos para obtener datos desde archivos JSON locales.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  /**
   * Constructor del servicio `SolicitudService`.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a archivos JSON locales.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos del solicitante desde un archivo JSON local.
   * 
   * @returns {Observable<RespuestaCatalogos[]>} Un observable que emite un arreglo de datos del solicitante.
   */
  getDatosSolicitante(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(`assets/json/80316/datosSolicitante.json`);
  }

  /**
   * Obtiene los datos de modificación desde un archivo JSON local.
   * 
   * @returns {Observable<RespuestaCatalogos[]>} Un observable que emite un arreglo de datos de modificación.
   */
  getDatosModificacion(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(`assets/json/80316/modificacion.json`);
  }

  /**
   * Obtiene los datos de la bitácora desde un archivo JSON local.
   * 
   * @returns {Observable<Bitacora[]>} Un observable que emite un arreglo de objetos de tipo `Bitacora`.
   */
  obtenerBitacora(): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>('assets/json/80308/bitacora.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene los datos de actividades productivas desde un archivo JSON local.
   * 
   * @returns {Observable<RespuestaCatalogos>} Un observable que emite un objeto con los datos de actividades productivas.
   */
  getActividadProductiva(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/80316/actividadProductiva.json`);
  }

  /**
   * Obtiene los datos complementarios desde un archivo JSON local.
   * 
   * @returns {Observable<Complimentaria[]>} Un observable que emite un arreglo de objetos de tipo `Complimentaria`.
   */
  obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http.get<Complimentaria[]>('assets/json/80316/complimentaria.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene una lista de anexos desde un archivo JSON local.
   * 
   * @returns {Observable<Anexo[]>} Un observable que emite un arreglo de objetos de tipo `Anexo`.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http.get<Anexo[]>('assets/json/80316/anexo.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene una lista de federatarios desde un archivo JSON local.
   * 
   * @returns {Observable<Federetarios[]>} Un observable que emite un arreglo de objetos de tipo `Federetarios`.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http.get<Federetarios[]>('assets/json/80316/federetarios.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene una lista de operaciones desde un archivo JSON local.
   * 
   * @returns {Observable<Operacions[]>} Un observable que emite un arreglo de objetos de tipo `Operacions`.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http.get<Operacions[]>('assets/json/80316/operacion.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene una lista de empresas desde un archivo JSON local.
   * 
   * @returns {Observable<Empresas[]>} Un observable que emite un arreglo de objetos de tipo `Empresas`.
   */
  obtenerEmpresas(): Observable<Empresas[]> {
    return this.http.get<Empresas[]>(`assets/json/80316/empresas.json`).pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene una lista de plantas desde un archivo JSON local.
   * 
   * @returns {Observable<Plantas[]>} Un observable que emite un arreglo de objetos de tipo `Plantas`.
   */
  obtenerPlantas(): Observable<Plantas[]> {
    return this.http.get<Plantas[]>(`assets/json/80316/plantas.json`).pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene una lista de servicios desde un archivo JSON local.
   * 
   * @returns {Observable<Servicios[]>} Un observable que emite un arreglo de objetos de tipo `Servicios`.
   */
  obtenerServicios(): Observable<Servicios[]> {
    return this.http.get<Servicios[]>(`assets/json/80316/servicios.json`).pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene una lista de fracciones sensibles desde un archivo JSON local.
   * 
   * @returns {Observable<FraccionSensible[]>} Un observable que emite un arreglo de objetos de tipo `FraccionSensible`.
   */
  obteneFraccionSensible(): Observable<FraccionSensible[]> {
    return this.http.get<FraccionSensible[]>('assets/json/80316/fraccionSensible.json').pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene los datos de la tabla desde un archivo JSON local.
   * 
   * @returns {Observable<RespuestaCatalogos>} Un observable que emite un objeto con los datos de la tabla.
   */
  getTablaData(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/80316/tablaLista.json`);
  }

  /**
   * Obtiene los tipos de persona desde un archivo JSON local.
   * 
   * @returns {Observable<RespuestaCatalogos>} Un observable que emite un objeto con los tipos de persona.
   */
  getTipoDePersona(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/80316/tipoDePersona.json`);
  }

}
