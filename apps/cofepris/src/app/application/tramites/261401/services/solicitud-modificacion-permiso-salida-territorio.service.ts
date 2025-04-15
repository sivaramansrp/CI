import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudModificacionPermisoSalidaTerritorioService {

  constructor(private http: HttpClient) { 
    // Constructor
  }
 
}
