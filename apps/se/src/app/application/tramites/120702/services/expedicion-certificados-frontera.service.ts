import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MontoExpedirTablaDatos } from '../models/expedicion-certificados-frontera.models';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de obtener los datos relacionados con la expedición de certificados en frontera,
 * como el año del oficio y la tabla de montos a expedir.
 */
@Injectable({
  providedIn: 'root'
})
export class ExpedicionCertificadosFronteraService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP de Angular para realizar peticiones a archivos JSON locales.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene el catálogo de años del oficio desde un archivo local JSON.
   *
   * @returns Un Observable con una lista de objetos de tipo `Catalogo`.
   */
  getAnoOficioDatos(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120702/ano-oficio.json');
  }

  /**
   * Obtiene los datos de la tabla de montos a expedir desde un archivo local JSON.
   *
   * @returns Un Observable con los datos de tipo `MontoExpedirTablaDatos`.
   */
  getMontoExpedirTabla(): Observable<MontoExpedirTablaDatos> {
    return this.http.get<MontoExpedirTablaDatos>('assets/json/120702/monto-expedir.json');
  }
}
