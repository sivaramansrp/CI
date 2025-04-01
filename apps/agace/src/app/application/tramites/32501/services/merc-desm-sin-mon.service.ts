import {Observable, catchError, throwError } from 'rxjs';
import { AvisoCatalogo } from '../models/aviso-catalogo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class MercDesmSinMonService {


  constructor(private http: HttpClient) {
    // El constructor está intencionalmente vacío para la inyección de dependencias
  }

  obtenerAvisoDelCatalogo(): Observable<AvisoCatalogo> {
    return this.http.get<AvisoCatalogo>('assets/json/32501/aviso-catalogo.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
