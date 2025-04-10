import { Catalogo } from '@libs/shared/data-access-user/src';
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

  getDestinatarioEncabezadoDeTabla(): Observable<string[]> {
    return this.http.get<string[]>('assets/json/250101/datos-destinatario.json');
  }

  getAduanalEncabezadoDeTabla(): Observable<string[]> {
    return this.http.get<string[]>('assets/json/250101/datos-agente-aduanal.json');
  }
 
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/250101/pais.json');
  }

  getEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/250101/estado.json');
  }

}
