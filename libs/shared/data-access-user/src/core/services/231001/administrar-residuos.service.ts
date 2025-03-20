import { Injectable } from '@angular/core';
import { HttpCoreService } from '../shared/http/http.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrarResiduosService {

  constructor(private http: HttpCoreService) {
    // Constructor
   }

     getAdministrarResiduos(): Observable<unknown> {
       return this.http.get('./assets/json/231001/administrar-residuos-mesa.json').pipe(
         catchError((error: unknown) => {
           return throwError(() => error);
         })
       );
     }
}
