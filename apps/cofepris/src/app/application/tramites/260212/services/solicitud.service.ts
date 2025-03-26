import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OpcionesPublicacion, SolicitudModel } from '../models/permiso-maquila.models';
import { catalogoResponse } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  

  constructor(private http: HttpClient) { }


  getSolicitudes(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>('assets/json/260212/solicitud.json');
  }

  getclave(): Observable<catalogoResponse[]> {
    return this.http.get<catalogoResponse[]>('assets/json/260212/clave.json');
  }

  getOpcionesPublicacion(){
    return this.http.get<OpcionesPublicacion[]>('/assets/json/260212/opciones-de-radio.json')
  }

  getclasificacionProducto(){
    return this.http.get<[]>('/assets/json/260212/clasificacionProducto.json')
  }

  geTestadoFisico(){
    return this.http.get<[]>('/assets/json/260212/estadoFisico.json')
  }
  

}
