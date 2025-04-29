import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaTabla } from '../models/registro.model';
import { catchError, Observable, throwError } from 'rxjs';
import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla } from '../../../shared/models/complementaria.model';
import { Bitacora } from '../../../shared/models/bitacora.model';

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

  obtenerTablaPlantas(): Observable<PlantasTabla[]> {
    return this.http
      .get<PlantasTabla[]>('assets/json/90303/plantas.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  obtenerTablaSector(): Observable<SectorTabla[]> {
    return this.http
      .get<SectorTabla[]>('assets/json/90303/sector.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  obtenerTablaMercancia(): Observable<Mercancias[]> {
    return this.http
      .get<Mercancias[]>('assets/json/90303/mercancia.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  obtenerTablaProductor(): Observable<ProductorIndirecto[]> {
    return this.http
      .get<ProductorIndirecto[]>('assets/json/90303/productor.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  obtenerTablaBitacora(): Observable<Bitacora[]> {
    return this.http
      .get<Bitacora[]>('assets/json/90303/bitacora.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

}
