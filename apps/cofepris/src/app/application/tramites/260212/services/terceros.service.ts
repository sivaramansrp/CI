
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class TercerosService  {

  constructor(private http : HttpClient) { }

  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260212/terceros-relacionados.json');
  }
}

