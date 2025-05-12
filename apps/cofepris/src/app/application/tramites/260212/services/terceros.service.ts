
/**
 * Servicio para la gestión de terceros relacionados.
 * Proporciona métodos para obtener datos de terceros.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Servicio que se provee en el ámbito de la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class TercerosService {

  /**
   * Constructor del servicio.
   * Inyecta el cliente HTTP para realizar peticiones.
   * 
   * @param http Cliente HTTP para realizar peticiones.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de terceros relacionados desde un archivo JSON local.
   * 
   * @returns Observable que emite un arreglo de objetos Catalogo.
   */
  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260212/terceros-relacionados.json');
  }

  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260212/pais.json');
  }

  getMunicipioData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260212/municipio.json');
  }

  getCodigoPostalData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260212/codigo-postal.json');
  }

  getColoniaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260212/colonia.json');
  }

  getLocalidadData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260212/localidad.json');
  }

  getEncabezadoDeTabla(): Observable<string[]> {
    return this.http.get<string[]>('assets/json/260212/encabezado-de-tabla.json');
  }
}
