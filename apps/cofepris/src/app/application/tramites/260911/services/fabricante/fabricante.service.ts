/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Servicio para manejar las operaciones relacionadas con las mercancías.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

/**
 * Servicio para manejar las operaciones relacionadas con las mercancías.
 */
@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  dataTableLink = 'assets/json/260911/datos-de-tabla.json'; // Updated path
  constructor(private http: HttpClient) { }

  obtenerInformaciónDeTablaDeFabricantes(): Observable<any> {
    return this.http.get(this.dataTableLink).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of([]); // Return an empty array or a default value
      })
    );
  }
}

