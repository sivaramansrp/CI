import { Observable, throwError } from 'rxjs';
import { AvisoOpcionesDeRadio } from '../models/aviso-catalogo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

/**
 * Servicio para gestionar la obtención de datos relacionados con
 * el aviso del catálogo, la operación de importación y los requisitos obligatorios.
 */
@Injectable({
  providedIn: 'root',
})
export class MercanciasDesmontadasOSinMontarService {
  /**
   * Constructor del servicio MercanciasDesmontadasOSinMontarService.
   * @param http Instancia de HttpClient para realizar peticiones HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos de las opciones de radio desde un archivo JSON localizado en assets.
   *
   * @returns Observable que emite los datos del tipo AvisoOpcionesDeRadio.
   */
  obtenerAvisoOpcionesDeRadio(): Observable<AvisoOpcionesDeRadio> {
    return this.http
      .get<AvisoOpcionesDeRadio>('assets/json/231002/aviso-opciones-de-radio.json')
      .pipe(
        catchError((error) => throwError(() => error))
      );
  }
}
