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

  getFitosanitoriosEncabezadoDeTabla(): Observable<string[]> {
    return this.http.get<string[]>('assets/json/250101/certificados-fitosanitorios.json');
  }

  getPermisoCertificadosDeTabla(): Observable<string[]> {
    return this.http.get<string[]>('assets/json/250101/permisos-certificados.json');
  }
}
