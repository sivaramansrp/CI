import { CatalogoResponse } from "@libs/shared/data-access-user/src";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoDeCertificoOption } from "../models/TipoDeCertificoOption.model";

@Injectable({
    providedIn: 'root'
  })

export class DetosDelService {

    constructor( private http:HttpClient){}


    getEstadoData(): Observable<CatalogoResponse[]> {
        return this.http.get<CatalogoResponse[]>('assets/json/220401/estatos.json');
      }

      getCertificadoData(): Observable<TipoDeCertificoOption[]> {
        return this.http.get<TipoDeCertificoOption[]>('assets/json/220401/certificado1.json');
      }
      getCertificado(): Observable<TipoDeCertificoOption[]> {
        return this.http.get<TipoDeCertificoOption[]>('assets/json/220401/certificado2.json');
      }
  
}