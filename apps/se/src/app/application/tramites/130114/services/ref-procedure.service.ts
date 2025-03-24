import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})  

export class RefProcedureService {


  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // No se necesita lógica de inicialización adicional.
  }



}