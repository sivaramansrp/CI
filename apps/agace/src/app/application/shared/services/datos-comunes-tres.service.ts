import { Observable, catchError, throwError } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Inventarios } from '../models/datos-comunes-tres.model';

@Injectable({
  providedIn: 'root'
})
export class DatosComunesTresService {

 /**
  * Inicializa una nueva instancia de la clase `DatosComunesService`.
  * 
  * @param http - La instancia de `HttpClient` utilizada para realizar solicitudes HTTP.
  */
  constructor(
    private http: HttpClient
  ) {
    // Constructor de la clase DatosComunesService
  }

    /**
   * Obtiene los datos productivos desde un archivo JSON local.
   *
   * @returns {Observable<Catalogo>} Un observable que emite la respuesta JSON que contiene los datos productivos.
   * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
   */
  getProductivoDatos(): Observable<Catalogo> {
    return this.http.get<Catalogo>('./assets/json/32613/sector-productivo.json').pipe(
        catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos productivos desde un archivo JSON local.
   *
   * @returns {Observable<Catalogo>} Un observable que emite la respuesta JSON que contiene los datos productivos.
   * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
   */
  getServicioDatos(): Observable<Catalogo> {
    return this.http.get<Catalogo>('./assets/json/32613/servicio.json').pipe(
        catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los catálogos selectivos de la solicitud desde un archivo JSON local.
   * @returns Observable con un objeto de tipo getBimestreDatos.
   */
  getBimestreDatos(): Observable<Catalogo> {
    return this.http.get<Catalogo>('assets/json/32613/bimestre.json');
  }

  /**
   * Obtiene los catálogos selectivos de la solicitud desde un archivo JSON local.
   * @returns Observable con un objeto de tipo getIndiqueTodosdatos.
   */
  getIndiqueTodosdatos(): Observable<Catalogo> {
    return this.http.get<Catalogo>('assets/json/32613/indique-todos.json');
  }

  /**
   * Obtiene los inventarios registrados desde un archivo JSON local.
   * @returns Observable con un arreglo de Inventarios.
   */
  conseguirInventarios(): Observable<Inventarios[]> {
    return this.http.get<Inventarios[]>('assets/json/32613/inventarios-datos.json');
  }
}
