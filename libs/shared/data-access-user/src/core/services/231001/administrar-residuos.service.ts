import { Observable,catchError, throwError } from 'rxjs';
import { HttpCoreService } from '../shared/http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministrarResiduosService {

  constructor(private http: HttpCoreService) {
   // Lógica de inicialización si es necesario
   }

     getAdministrarResiduos(): Observable<unknown> {
       return this.http.get('./assets/json/231001/administrar-residuos-mesa.json').pipe(
         catchError((error: unknown) => {
           return throwError(() => error);
         })
       );
     }
}
