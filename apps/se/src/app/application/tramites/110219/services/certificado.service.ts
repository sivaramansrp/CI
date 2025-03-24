import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import { catchError, Observable, throwError } from 'rxjs';
import {
  ColumnasTabla,
  MercanciaCertificado,
} from '../models/certificado.model';

@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
  constructor(private http: HttpClient) {}

  getTratadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110219/tratado.json');
  }
  public getSolicitudesTabla(): Observable<ColumnasTabla[]> {
    return this.http
      .get<ColumnasTabla[]>('assets/json/110219/mercanciaTable.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  public getMercanciaCertificadoTabla(): Observable<MercanciaCertificado[]> {
    return this.http
      .get<MercanciaCertificado[]>(
        'assets/json/110219/mercanciaCertificado.json'
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
