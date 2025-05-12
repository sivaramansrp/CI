import { Catalogo } from '../state/Tramite120403.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuposService {

  constructor(private http:HttpClient) { }

  obtenerDatosAno(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120403/ano.json');
  }
}
