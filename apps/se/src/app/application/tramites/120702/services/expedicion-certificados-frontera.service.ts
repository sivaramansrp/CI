import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MontoExpedirTablaDatos } from '../models/expedicion-certificados-frontera.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedicionCertificadosFronteraService {

  constructor(private http: HttpClient) { 
    //
  }


  getAnoOficioDatos(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/120702/ano-oficio.json')
  }

  getMontoExpedirTabla():Observable<MontoExpedirTablaDatos>{
    return this.http.get<MontoExpedirTablaDatos>('assets/json/120702/monto-expedir.json');
  }
}
