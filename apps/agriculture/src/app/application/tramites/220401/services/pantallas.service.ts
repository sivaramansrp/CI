import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catalogoResponse } from "@libs/shared/data-access-user/src";

import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class DetosDelService {

    constructor( private http:HttpClient){}


    getEstadoData(): Observable<catalogoResponse[]> {
        return this.http.get<catalogoResponse[]>('assets/json/220401/estatos.json');
      }
}