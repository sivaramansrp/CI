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
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('./assets/json/80301/estado.json')
      .pipe(map((res) => res.data));
  }

  obtenerDomicilios(): Observable<DomicilioInfo[]> {
    return this.http
      .get<{ data: DomicilioInfo[] }>('assets/json/80301/domicilio.json')
      .pipe(map((res) => res.data));
  }

  obtenerBitacora(): Observable<Bitacora[]> {
    return this.http
      .get<{ data: Bitacora[] }>('assets/json/80301/bitacora.json')
      .pipe(map((res) => res.data));
  }

  obtenerDatosGenerales(): Observable<DatosModificacion> {
    return this.http
      .get<{ data: DatosModificacion }>('assets/json/80301/datos-modificacion.json')
      .pipe(map((res) => res.data));
  }

  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<{ data: Federetarios[] }>('assets/json/80301/federetarios.json')
      .pipe(map((res) => res.data));
  }

  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<{ data: Operacions[] }>('assets/json/80301/operacion.json')
      .pipe(map((res) => res.data));
  }

  obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http
      .get<{ data: Complimentaria[] }>('assets/json/80301/complimentaria.json')
      .pipe(map((res) => res.data));
  }

  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<{ data: Anexo[] }>('assets/json/80301/anexo.json')
      .pipe(map((res) => res.data));
  }
}