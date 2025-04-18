import { Catalogo } from '@libs/shared/data-access-user/src';
import { DestinatarioTablaDatos } from '../models/flora-fauna.models'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  constructor(private http: HttpClient) { 
    //
  }

  getDestinatarioEncabezadoDeTabla(): Observable<DestinatarioTablaDatos> {
    return this.http.get<DestinatarioTablaDatos>('assets/json/250101/datos-destinatario.json');
  }

  getAduanalEncabezadoDeTabla(): Observable<DestinatarioTablaDatos> {
    return this.http.get<DestinatarioTablaDatos>('assets/json/250101/datos-agente-aduanal.json');
  }
 
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/250101/pais.json');
  }

  getEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/250101/estado.json');
  }

}
