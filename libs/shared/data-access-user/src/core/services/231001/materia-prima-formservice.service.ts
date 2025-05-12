import { Observable, catchError, throwError } from "rxjs";
import { HttpCoreService } from "../shared/http/http.service";
import { Injectable } from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class MateriaprimaformserviceService {

  constructor(private http: HttpCoreService) {
    // Constructor del servicio.
  }

  // Obtiene el catálogo de unidades de medida desde un archivo JSON.
  getUnidadMedida(): Observable<unknown> {
    return this.http.get('./assets/json/231001/comboUnidadMedida.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  // Obtiene el catálogo de capítulos de fracción desde un archivo JSON.
  getCapituloFraccion(): Observable<unknown> {
    return this.http.get('./assets/json/231001/comboCapituloFraccion.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  // Obtiene el catálogo de partidas de fracción desde un archivo JSON.
  getPartidaFraccion(): Observable<unknown> {
    return this.http.get('./assets/json/231001/comboPartidaFraccion.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  // Obtiene el catálogo de subpartidas de fracción desde un archivo JSON.
  getSubPartidaFraccion(): Observable<unknown> {
    return this.http.get('./assets/json/231001/comboSubPartidaFraccion.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  // Obtiene el catálogo de fracciones arancelarias desde un archivo JSON.
  getFraccionArancelariaParametros(): Observable<unknown> {
    return this.http.get('./assets/json/231001/comboFraccionArancelariaParametros.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

}
