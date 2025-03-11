/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercanciasService {

  constructor(private http: HttpCoreService) {
     // Lógica del constructor puede ser añadida aquí si es necesario
   }

    getMercancias(): Observable<any> {
       return this.http.get('assets/json/110209/mercancias.json');
     }


     getTipoDeFactura():Observable<any> {
      return this.http.get('assets/json/110209/tipo-de-factura.json');
    }

    getUnidad():Observable<any> {
      return this.http.get('assets/json/110209/unidad.json');
    }

}
