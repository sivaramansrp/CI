import { CancelacionTabla } from '../models/Cancelacion-de-autorizaciones';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CancelacionDeAutorizacionesService {

  constructor( private http: HttpClient) { 
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }
 getCancelacionTabla (): Observable<CancelacionTabla[]> {
    return this.http.get<CancelacionTabla[]>('assets/json/140102/CancelacionTabla.json'); 
  }
}
