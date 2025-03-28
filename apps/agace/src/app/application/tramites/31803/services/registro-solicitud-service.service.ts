import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroSolicitudService {

  constructor(private http:HttpClient) { }

  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/31803/banco.json');
  }

}
