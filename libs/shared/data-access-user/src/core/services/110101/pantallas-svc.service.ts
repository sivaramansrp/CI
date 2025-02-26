import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Este servicio se utiliza para almacenar los datos del formulario del trámite 110101.
 */

export class PantallasSvcService {


   /**
  * constructor de la clase
  * @param http: constructor de HttpClient
  */
  constructor(private http: HttpClient) { }
}
