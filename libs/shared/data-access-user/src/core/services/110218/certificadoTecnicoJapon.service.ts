import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Catalogo } from '../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadoTecnicoJaponService {

  constructor(private http: HttpClient) { }

  getDatosCertificado(): Observable<{ [key: string]: string | number | boolean }> {
    return this.http.get<{ [key: string]: string | number | boolean }>('assets/json/110218/certificado-tecnico-japon.json');
  }

  gettratados(): Observable<{ tratadoAcuerdo: string; paisBloque: string; paisdeOrigen: string; paisDestino: string; fechadeExpedicion: string; fechadeVencimiento: string }> {
    return this.http.get<{ tratadoAcuerdo: string; paisBloque: string; paisdeOrigen: string; paisDestino: string; fechadeExpedicion: string; fechadeVencimiento: string }>('assets/json/110218/tratados.json');
  }

  getrepresentante(): Observable<{ empresa: string }> {
    return this.http.get<{ empresa: string }>('assets/json/110218/representante-legal.json');
  }
 
  getUnidadMedida():Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/110218/unidad-medida.json');
  }
  
  getTipodeFctura():Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/110218/tipo-de-factura.json');
  }
}