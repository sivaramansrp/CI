import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { solicitudModel } from '../models/permiso-maquila.models';
import { Catalogo } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  

  constructor(private http: HttpClient) { }


  getSolicitudes(): Observable<solicitudModel[]> {
    return this.http.get<solicitudModel[]>('assets/json/260212/solicitud.json');
  }

  getclave(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260212/clave.json');
  }

}
