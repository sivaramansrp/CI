import { Anexo, Bitacora, Complimentaria, DatosCertificacion, DatosDeLaTabla, DatosModificacion, Empresas, Federetarios, FraccionSensible, Operacions, Plantas, RespuestaConsulta, Servicios } from '../models/datos-tramite.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs/operators';

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
   */
  getDatosModificacion(): Observable<Pick<DatosModificacion, 'rfc' | 'federal' | 'tipo' | 'programa' | 'actividadActual'>> {
    return this.http.get<Pick<DatosModificacion, 'rfc' | 'federal' | 'tipo' | 'programa' | 'actividadActual'>>(`assets/json/80316/modificacion.json`);
  }

  /**
   * Obtiene los datos de la bitácora desde un archivo JSON local.
   * 
   * @returns {Observable<Bitacora[]>} Un observable que emite un arreglo de objetos de tipo `Bitacora`.
   */
  obtenerBitacora(): Observable<Bitacora[]> {
    return this.http.get<{ data: Bitacora[] }>('assets/json/80316/bitacora.json').pipe(
      map((res: { data: Bitacora[] }) => res.data)
    );
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
    return this.http.get<{ data: Complimentaria[] }>('assets/json/80316/complimentaria.json').pipe(
      map((res: { data: Complimentaria[] }) => res.data)
    );
  }

  /**
   * Obtiene una lista de anexos desde un archivo JSON local.
   * 
   * @returns {Observable<Anexo[]>} Un observable que emite un arreglo de objetos de tipo `Anexo`.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http.get<{ data: Anexo[] }>('assets/json/80316/anexo.json').pipe(
      map((res: { data: Anexo[] }) => res.data)
    );
  }

  /**
   * Obtiene una lista de federatarios desde un archivo JSON local.
   * 
   * @returns {Observable<Federetarios[]>} Un observable que emite un arreglo de objetos de tipo `Federetarios`.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http.get<{ data: Federetarios[] }>('assets/json/80316/federetarios.json').pipe(
      map((res: { data: Federetarios[] }) => res.data)
    );
  }

  /**
   * Obtiene una lista de operaciones desde un archivo JSON local.
   * 
   * @returns {Observable<Operacions[]>} Un observable que emite un arreglo de objetos de tipo `Operacions`.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http.get<{ data: Operacions[] }>('assets/json/80316/operacion.json').pipe(
      map((res: { data: Operacions[] }) => res.data)
    );
  }

  /**
   * Obtiene una lista de empresas desde un archivo JSON local.
   * 
   * @returns {Observable<Empresas[]>} Un observable que emite un arreglo de objetos de tipo `Empresas`.
   */
  obtenerEmpresas(): Observable<Empresas[]> {
    return this.http.get<{ data: Empresas[] }>(`assets/json/80316/empresas.json`).pipe(
      map((res: { data: Empresas[] }) => res.data)
    );
  }

  /**
   * Obtiene una lista de plantas desde un archivo JSON local.
   * 
   * @returns {Observable<Plantas[]>} Un observable que emite un arreglo de objetos de tipo `Plantas`.
   */
  obtenerPlantas(): Observable<Plantas[]> {
    return this.http.get<{ data: Plantas[] }>(`assets/json/80316/plantas.json`).pipe(
      map((res: { data: Plantas[] }) => res.data)
    );
  }

  /**
   * Obtiene una lista de servicios desde un archivo JSON local.
   * 
   * @returns {Observable<Servicios[]>} Un observable que emite un arreglo de objetos de tipo `Servicios`.
   */
  obtenerServicios(): Observable<Servicios[]> {
    return this.http.get<{ data: Servicios[] }>(`assets/json/80316/servicios.json`).pipe(
      map((res: { data: Servicios[] }) => res.data)
    );
  }

  /**
   * Obtiene una lista de fracciones sensibles desde un archivo JSON local.
   * 
   * @returns {Observable<FraccionSensible[]>} Un observable que emite un arreglo de objetos de tipo `FraccionSensible`.
   */
  obteneFraccionSensible(): Observable<FraccionSensible[]> {
    return this.http.get<{ data: FraccionSensible[] }>('assets/json/80316/fraccionSensible.json').pipe(
      map((res: { data: FraccionSensible[] }) => res.data)
    );
  }

  /**
   * Obtiene los datos de la tabla desde un archivo JSON local.
   * 
   * @returns {Observable<DatosDeLaTabla[]>} Un observable que emite un objeto con los datos de la tabla.
   */
  getTablaData(): Observable<{ data: DatosDeLaTabla[] }> {
    return this.http.get<{ data: DatosDeLaTabla[] }>('assets/json/80316/tablaLista.json');
  }

  /**
   * Obtiene los tipos de persona desde un archivo JSON local.
   * 
   * @returns {Observable<RespuestaCatalogos>} Un observable que emite un objeto con los tipos de persona.
   */
  getTipoDePersona(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/80316/tipoDePersona.json`);
  }

  /**
   * @method getDatosConsulta
   * @description Obtiene los datos de consulta desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de consulta simulados desde el archivo `consultaDatos.json`.
   * 
   * @returns {Observable<RespuestaConsulta>} Un observable que emite la respuesta de los datos de consulta.
   */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>(`assets/json/80316/consultaDatos.json`);
  }

  /**
   * Obtiene los datos de certification desde un archivo JSON local.
   */
  getDatosCertificacion(): Observable<DatosCertificacion> {
    return this.http.get<DatosCertificacion>(`assets/json/80316/certification.json`);
  }
}
