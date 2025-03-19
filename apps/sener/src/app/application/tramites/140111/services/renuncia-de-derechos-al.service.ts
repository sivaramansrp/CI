import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisoFormInterface } from '../model/renuncia-de-derechos.model';
@Injectable({
  providedIn: 'root'
})
export class RenunciaDeDerechosAlServicio {
  constructor( private http: HttpClient) { 
    // constructor
  }
 
  getDescripcionDelCupo(): Observable<PermisoFormInterface> {
    return this.http.get<PermisoFormInterface>('assets/json/140111/renuncia-de-derechos.json');
  }
}
