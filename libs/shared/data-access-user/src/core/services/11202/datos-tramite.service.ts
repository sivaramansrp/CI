import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DatosTramiteService {

  constructor()
  {
    this.getAduanas,
    this.getContenedores,
    this.submitSolicitud,
    this.uploadArchivo
  }
  /**
   * Get a dummy list of Contenedores
   */
  getContenedores(): Observable<any[]> {
    const dummyContenedores = [
      { id: 'C12345', tipo: '20 Pies' },
      { id: 'C67890', tipo: '40 Pies' },
      { id: 'C11223', tipo: 'Refrigerado' }
    ];
    return of(dummyContenedores);
  }
   /**
   * Get a dummy list of Aduanas
   */
   getAduanas(): Observable<any[]> {
    const dummyAduanas = [
      { id: 1, nombre: 'Aduana de México' },
      { id: 2, nombre: 'Aduana de Argentina' },
      { id: 3, nombre: 'Aduana de España' },
      { id: 4, nombre: 'Aduana de España' },
      { id: 5, nombre: 'Aduana de España' }
    ];
    return of(dummyAduanas);
  }
  
   /**
   * Simulate file upload
   */
   uploadArchivo(archivo: File): Observable<any> {
    console.log('Simulating file upload:', archivo.name);
    return of({ success: true, message: `Archivo ${archivo.name} cargado exitosamente` });
  }
  
   /**
   * Simulate a successful form submission
   */
   submitSolicitud(solicitudData: any): Observable<any> {
    console.log('Simulating form submission with data:', solicitudData);
    return of({ success: true, message: 'Solicitud enviada exitosamente' });
  }

  
}
