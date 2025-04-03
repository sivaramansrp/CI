import { AvisoCatalogo } from '../models/aviso-catalogo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperacionDeImportacion } from '../models/aviso-catalogo.model';
import { RequisitosObligatorios } from '../models/aviso-catalogo.model';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MercDesmSinMonService {
  constructor(private http: HttpClient) {
    // El constructor está intencionalmente vacío para la inyección de dependencias
  }

  obtenerAvisoDelCatalogo(): Observable<AvisoCatalogo> {
    return this.http
      .get<AvisoCatalogo>('assets/json/32501/aviso-catalogo.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

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

  obtenerDatosAgregarNuevo(): Observable<RequisitosObligatorios[]> {
    return this.http
      .get<RequisitosObligatorios[]>(
        'assets/json/32501/datos-agregar-nuevo.json'
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
