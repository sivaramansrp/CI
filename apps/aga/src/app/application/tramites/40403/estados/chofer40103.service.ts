import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Chofer40103Store } from './chofer40103.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Chofer40103Service {
  baseUrl = '../../../../../assets/json/40403/';
  constructor(
    private chofer40103Store: Chofer40103Store,
    private http: HttpClient
  ) {}

  gettipoDeCaatAerea(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40403/tipo-CAAT-aéreo.json');
  }

  getideCodTransportacionAerea(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40403/codigo.json');
  }

  buscarSolicitudPorCAATe(claveFolioCAAT: string): Observable<any> {
    const baseUrl = `/api/solicitud/buscarPorCAAT?claveFolioCAAT=${claveFolioCAAT}`;
    return this.http.get<any>(baseUrl).pipe(
      catchError((error) => {
        console.error('Error fetching solicitud data:', error);
        return throwError(() => error);
      })
    );
  }
}
