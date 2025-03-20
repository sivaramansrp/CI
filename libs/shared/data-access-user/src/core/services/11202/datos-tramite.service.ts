import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Catalogo } from '../../models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatosTramiteService {
  private readonly url = './assets/json/11202/contenedor-mockdata.json';

  constructor(private http: HttpClient) {
    this.getAduanas,
      this.getContenedores,
      this.submitSolicitud,
      this.uploadArchivo;
  }
  /**
   * Get a dummy list of Contenedores
   */
  getContenedores(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.url);
  }
  /**
   * Get a dummy list of Aduanas
   */
  getAduanas(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.url);
  }

  /**
   * Simulate file upload
   */
  uploadArchivo(archivo: File): Observable<any> {
    console.log('Simulating file upload:', archivo.name);
    return of({
      success: true,
      message: `Archivo ${archivo.name} cargado exitosamente`,
    });
  }

  /**
   * Simulate a successful form submission
   */
  submitSolicitud(solicitudData: any): Observable<any> {
    console.log('Simulating form submission with data:', solicitudData);
    return of({ success: true, message: 'Solicitud enviada exitosamente' });
  }
}
