import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RenunciaDeDerechosAlServicioService {
  constructor( private http: HttpClient) { }
 
  getDescripcionDelCupo(): Observable<unknown> {
    return this.http.get('assets/json/140111/renuncia-de-derechos.json');
  }
}
