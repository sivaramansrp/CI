import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LosOption, solicitudModel } from '../models/permiso-maquila.models';
import { catalogoResponse } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  

  constructor(private http: HttpClient) { }


  getSolicitudes(): Observable<solicitudModel[]> {
    return this.http.get<solicitudModel[]>('assets/json/260212/solicitud.json');
  }

  getclave(): Observable<catalogoResponse[]> {
    return this.http.get<catalogoResponse[]>('assets/json/260212/clave.json');
  }

  getLosOption(){
    return  this.http.get<LosOption[]>('/assets/json/260212/opciones-de-radio.json')
  }

}
