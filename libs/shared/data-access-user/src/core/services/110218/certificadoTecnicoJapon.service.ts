import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CertificadoTecnicoJaponService {

  constructor(private http: HttpClient) { }
  
  getDatosCertificado(): Observable<unknown> {
    return this.http.get('assets/json/110218/certificado-tecnico-japon.json');
  }
}