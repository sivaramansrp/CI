import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarSolicitudMcpService {

  constructor(private http: HttpClient) {}

  getEstadosData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/estado.json');
  }
  
  getClaveScianData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/clavescian.json');
  }

  getClaveDescripcionDelData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('./assets/json/260702/clavedescripciondel.json');
  }

}
