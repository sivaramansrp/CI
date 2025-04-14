import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosComunesService {

  constructor(private http: HttpClient) {
    // Constructor de la clase DatosComunesService
   }
}
