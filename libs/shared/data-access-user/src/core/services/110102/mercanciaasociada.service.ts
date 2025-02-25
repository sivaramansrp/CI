import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCoreService } from '../shared/http/http.service';


@Injectable({
    providedIn: 'root'
})
export class MercanciaAsociadaService {


    constructor(private http: HttpCoreService) { }

    getMercanciaAsociada(): Observable<any> {
        return this.http.get('./assets/json/110102/mercanciaasociada.json')
    }

   
}