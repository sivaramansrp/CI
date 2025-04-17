import { Observable, of } from 'rxjs';
import { Catalogo } from '../../models/shared/catalogos.model';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosTramiteService {
  private readonly url = './assets/json/11202/contenedor-mockdata.json';

  constructor(private http: HttpClient) {
    this.getAduanas();
  this.getContenedores();
  this.submitSolicitud();
  this.uploadArchivo();
  }
  /**
   * 
Obtenga una lista ficticia de Contenedores
   */
  getContenedores(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.url);
  }
  /**
   * Obtenga una lista ficticia de Aduanas
   */
  getAduanas(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.url);
  }

  /**
   * Simular carga de archivos
   */
  uploadArchivo(archivo?: File): Observable<any> {
    return of({
      success: true,
      message: `Archivo ${archivo?.name} cargado exitosamente`,
    });
  }

  /**
   * Simular un envío exitoso de formulario
   */
  submitSolicitud(_solicitudData?: FormGroup): Observable<any> {
    return of({ success: true, message: 'Solicitud enviada exitosamente' });
  }

  getDatosTableData(): Observable<any[]> {
    return this.http.get<any[]>(`assets/json/11202/datosTabla.json`);
  }
}
