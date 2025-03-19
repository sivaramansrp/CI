/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosDelTramiteService {

  constructor(private http:HttpCoreService) { 
    //
  }

    getRegimen(): Observable<any> {
      return this.http.get('./assets/json/130119/regimen.json');
    }

    getClasificacionDeRegimen(): Observable<any> {
      return this.http.get('./assets/json/130119/clasificacion-de-regimen.json');
    }
}
