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
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModificacionSolicitudeService {

  http: HttpClient = Inject(HttpClient);

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

  obtenerDomicilios(): Observable<DomicilioInfo[]> {
    return this.http
      .get<DomicilioInfo[]>('assets/json/80308/domicilio.json')
      .pipe(map((res: any) => res.data));
  }

  obteberBitacora(): Observable<Bitacora[]> {
    return this.http
      .get<Bitacora[]>('assets/json/80308/bitacora.json')
      .pipe(map((res: any) => res.data));
  }

  obtenerDatosGenerales(): Observable<DatosModificacion> {
    return this.http
      .get<DatosModificacion>('assets/json/80308/datos-modificacion.json')
      .pipe(map((res: any) => res.data));
  }

  obtenerFederetarios(): Observable<Federetarios[]> {
    return this.http
      .get<Federetarios[]>('assets/json/80308/federetarios.json')
      .pipe(map((res: any) => res.data));
  }
  obtenerOperacion(): Observable<Operacions[]> {
    return this.http
      .get<Operacions[]>('assets/json/80308/operacion.json')
      .pipe(map((res: any) => res.data));
  }

  obtenerComplimentaria(): Observable<Complimentaria[]> {
    return this.http
      .get<Complimentaria[]>('assets/json/80308/complimentaria.json')
      .pipe(map((res: any) => res.data));
  }

  obtenerAnexo(): Observable<Anexo[]> {
    return this.http
      .get<Anexo[]>('assets/json/80308/anexo.json')
      .pipe(map((res: any) => res.data));
  }
}
