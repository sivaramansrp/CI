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
 
  /**
 * Recupera la descripción del cupo desde un archivo JSON almacenado.
 * El método devuelve un observable que contiene la estructura de datos correspondiente (PermisoFormInterface).
 */
  getDescripcionDelCupo(): Observable<PermisoFormInterface> {
    return this.http.get<PermisoFormInterface>('assets/json/140111/renuncia-de-derechos.json');
  }
}
