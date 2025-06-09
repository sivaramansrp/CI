import { AvisoCatalogo } from '../models/aviso-catalogo.model';
import { AvisoOpcionesDeRadio } from '../models/aviso-catalogo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperacionDeImportacion } from '../models/aviso-catalogo.model';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

import { Solicitud32501State, Solicitud32501Store } from '../estados/solicitud32501.store';

/**
 * Servicio para gestionar la obtención de datos relacionados con
 * el aviso del catálogo, la operación de importación y los requisitos obligatorios.
 */
@Injectable({
  providedIn: 'root',
})
export class MercanciasDesmontadasOSinMontarService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar peticiones a archivos JSON.
   */
  constructor(private http: HttpClient, private tramite32501Store: Solicitud32501Store) {
    // El constructor está intencionalmente vacío para la inyección de dependencias
  }

  /**
   * Obtiene los datos del aviso del catálogo desde un archivo JSON.
   * @returns Observable con los datos del aviso del catálogo.
   */
  obtenerAvisoDelCatalogo(): Observable<AvisoCatalogo> {
    return this.http
      .get<AvisoCatalogo>('assets/json/32501/aviso-catalogo.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene los datos de la operación de importación desde un archivo JSON.
   * @returns Observable con la lista de operaciones de importación.
   */
  obtenerOperacionDeImportacion(): Observable<OperacionDeImportacion[]> {
    return this.http
      .get<OperacionDeImportacion[]>(
        'assets/json/32501/operacion-de-importacion.json'
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene los datos de las opciones de radio desde un archivo JSON.
   * @return Observable con los datos de las opciones de radio.
   * 
   */
  obtenerAvisoOpcionesDeRadio(): Observable<AvisoOpcionesDeRadio> {
    return this.http
      .get<AvisoOpcionesDeRadio>(
        'assets/json/32501/aviso-opciones-de-radio.json'
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  /**
   * Obtiene los datos del estado de la solicitud desde un archivo JSON.
   * @returns Observable con el estado de la solicitud.
   */
  obtenerDatosEstado(): Observable<Solicitud32501State> {
    return this.http.get<Solicitud32501State>('assets/json/32501/datos.json');
  }
  /**
   * Establece los datos del estado de la solicitud en el store.
   * @param datos Datos del estado de la solicitud.
   */
  establecerDatosEstado(datos: Solicitud32501State): void {
    this.tramite32501Store.establecerDatos({ ...datos });
  }
}
