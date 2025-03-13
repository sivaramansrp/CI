import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { CancellationOfAuthorizations } from '../models/cancelacions.model'

@Injectable({
    providedIn: 'root'
  })
export class Cancelaciones140201Service{
    constructor(private http: HttpClient) {
        //constructor
     }
      getCancelacionDeAutorizaciones() : Observable<CancellationOfAuthorizations[]> {
         return this.http.get<CancellationOfAuthorizations[]>('assets/json/140201/cancelacion-de-autorizaciones-140201.json');
       }
}