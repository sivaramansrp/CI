/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { TramiteState } from '../estados/tramite80308.store';

@Injectable({
  providedIn: 'root',
})
export class ModificacionSolicitudeService {

  // eslint-disable-next-line no-empty-function
  constructor(private http: HttpClient){}

  /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<Catalogo[]> {
    return this.http
      .get<Catalogo[]>('./assets/json/80308/estado.json')
      .pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene la lista de domicilios desde un archivo JSON local.
   * @returns Observable con arreglo de DomicilioInfo.
   */
  obtenerDomicilios(): Observable<DomicilioInfo[]> {
    return this.http
      .get<DomicilioInfo[]>('assets/json/80308/domicilio.json')
      .pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene el historial de bitácora desde un archivo JSON local.
   * @returns Observable con arreglo de Bitacora.
   */
  obtenerBitacora(): Observable<Bitacora[]> {
    return this.http
      .get<Bitacora[]>('assets/json/80308/bitacora.json')
      .pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene los datos generales de modificación desde un archivo JSON local.
   * @returns Observable con un objeto DatosModificacion.
   */
  obtenerDatosGenerales(): Observable<DatosModificacion> {
    return this.http
      .get<DatosModificacion>('assets/json/80308/datos-modificacion.json')
      .pipe(map((res: any) => res.data));
  }

  
  /**
   * Obtiene la lista de federatarios desde un archivo JSON local.
   * @returns Observable con arreglo de Federetarios.
   */
  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<Federetarios[]>('assets/json/80308/federetarios.json')
      .pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene información de operaciones desde un archivo JSON local.
   * @returns Observable con arreglo de Operacions.
   */
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<Operacions[]>('assets/json/80308/operacion.json')
      .pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene los datos de complimentaria desde un archivo JSON local.
   * @returns Observable con arreglo de Complimentaria.
   */
  obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http
      .get<Complimentaria[]>('assets/json/80308/complimentaria.json')
      .pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene los datos del anexo desde un archivo JSON local.
   * @returns Observable con arreglo de Anexo.
   */
  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<Anexo[]>('assets/json/80308/anexo.json')
      .pipe(map((res: any) => res.data));
  }

  /**
   * Obtiene los datos del trámite desde un archivo JSON local.
   * @returns Observable con objeto parcial de TramiteState.
   */
  obtenerTramiteDatos(): Observable<Partial<TramiteState>> {
    return this.http
      .get<Partial<TramiteState>>('assets/json/80308/tramite_datos.json')
      .pipe(map((res: any) => res.data));
  }

}
