import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaTabla } from '../models/registro.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }

  obtenerTablaLista(): Observable<ListaTabla[]> {
    return this.http
      .get<ListaTabla[]>('assets/json/90303/lista-tabla.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
