import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCoreService } from '../shared/http/http.service';


@Injectable({
    providedIn: 'root'
})
export class RepresentacionFederalService {


    constructor(private http: HttpCoreService) { }

    getEntidadFederativa(): Observable<any> {
        return this.http.get('./assets/json/110102/entidadfederativa.json')
    }
    getRepresentacionfederal(entidadFederativa:string): Observable<any> {
        return this.http.get('./assets/json/110102/representacionfederal.json')
    }


   
}