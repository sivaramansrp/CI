import {
  Anexo,
  Bitacora,
  Complimentaria,
  DatosModificacion,
  DomicilioInfo,
  Federetarios,
  Operacions,
} from '../models/plantas-consulta.model';
import { Observable, map } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModificacionSolicitudeService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de estados desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('./assets/json/80301/estado.json')
      .pipe(map((res) => res.data));
  }

  /**
   * Obtiene los domicilios desde un archivo JSON.
   * @returns {Observable<DomicilioInfo[]>} Observable con la lista de domicilios.
   */
  obtenerDomicilios(): Observable<DomicilioInfo[]> {
    return this.http
      .get<{ data: DomicilioInfo[] }>('assets/json/80301/domicilo-tablo.json')
      .pipe(map((res) => res.data));
  }

  /**
   * Obtiene los registros de bitácora desde un archivo JSON.
   * @returns {Observable<Bitacora[]>} Observable con la lista de registros de bitácora.
   */
  obtenerBitacora(): Observable<Bitacora[]> {
    return this.http
      .get<{ data: Bitacora[] }>('assets/json/80301/bitcora-one-tablo.json')
      .pipe(map((res) => res.data));
  }

  /**
   * Obtiene los datos generales de modificación desde un archivo JSON.
   * @returns {Observable<DatosModificacion>} Observable con los datos de modificación.
   */
  obtenerDatosGenerales(): Observable<DatosModificacion> {
    return this.http
      .get<{ data: DatosModificacion }>('assets/json/80301/datos-modificacion.json')
      .pipe(map((res) => res.data));
  }

  /**
   * Obtiene la lista de federatarios desde un archivo JSON.
   * @returns {Observable<Federetarios[]>} Observable con la lista de federatarios.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<{ data: Federetarios[] }>('assets/json/80301/federetarios.json')
      .pipe(map((res) => res.data));
  }

  /**
   * Obtiene la lista de operaciones desde un archivo JSON.
   * @returns {Observable<Operacions[]>} Observable con la lista de operaciones.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<{ data: Operacions[] }>('assets/json/80301/operacion.json')
      .pipe(map((res) => res.data));
  }

  /**
   * Obtiene la lista de operaciones complementarias desde un archivo JSON.
   * @returns {Observable<Complimentaria[]>} Observable con la lista de operaciones complementarias.
   */
  obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http
      .get<{ data: Complimentaria[] }>('assets/json/80301/complimentria-opracion.json')
      .pipe(map((res) => res.data));
  }

  /**
   * Obtiene la lista de anexos desde un archivo JSON.
   * @returns {Observable<Anexo[]>} Observable con la lista de anexos.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<{ data: Anexo[] }>('assets/json/80301/anexo.json')
      .pipe(map((res) => res.data));
  }
}
