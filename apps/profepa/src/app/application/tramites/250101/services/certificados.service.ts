import { CertificadosTablaDatos } from '../models/flora-fauna.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificadosService {

  constructor(private http: HttpClient) { 
    //
  }

  getFitosanitoriosEncabezadoDeTabla(): Observable<CertificadosTablaDatos> {
    return this.http.get<CertificadosTablaDatos>('assets/json/250101/certificados-fitosanitorios.json');
  }

  getPermisoCertificadosDeTabla(): Observable<CertificadosTablaDatos> {
    return this.http.get<CertificadosTablaDatos>('assets/json/250101/permisos-certificados.json');
  }

  getCertificadosDeTabla(): Observable<CertificadosTablaDatos> {
    return this.http.get<CertificadosTablaDatos>('assets/json/250101/certificados.json');
  }
}
