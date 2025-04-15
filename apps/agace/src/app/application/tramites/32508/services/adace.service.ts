import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdaceService {

  constructor(private http: HttpClient) { }

  obtenerDatosAno(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32508/ano.json');
  }
  obtenerDatosMes(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32508/mes.json');
  }
}
