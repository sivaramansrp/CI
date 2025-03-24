import { Asociados } from '../../models/tramites-asociados.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TramitesAsociadosService {

  constructor(private http:HttpClient) { 
     // No se necesita lógica de inicialización adicional.
  }
   onAsociadosList(): Observable<Asociados[]> {
        return this.http.get<Asociados[]>('assets/json/260911/asociadosList.json');
      }
}
