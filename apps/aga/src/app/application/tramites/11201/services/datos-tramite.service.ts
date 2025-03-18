import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RespuestaCatalogos } from "@libs/shared/data-access-user/src";
import { Observable, of } from "rxjs";
import { RespuestaContenedor } from "libs/shared/data-access-user/src/core/models/11201/datos-tramite.model";

@Injectable({
  providedIn: 'any',
})
export class DatosTramiteService {

  constructor(
    private http: HttpClient
  )
  {
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

  agregarSolicitud(): Observable<RespuestaContenedor> {
    return of({
      success: true, message: 'Solicitud enviada exitosamente',
      datos: {
        id: 1,
        inicialesEquipo: 'BBZM',
        numeroEquipo: 1098765,
        digitoVerificador: 4,
        tipoEquipo: 'AC',
        aduana: 430,
        fechaIngreso: '2024-03-13',
        vigencia: '2025-03-13',
        estadoConstancia: 'Válido',
        existeEnVUCEM: 'Sí',
        idConstancia: 'CONST12345',
        numeroManifiesto: 'MANI67890',
        idSolicitud: 'SOLICITUD001',
        fechaInicio: '2024-03-01',
      }
    });
  }

  getTransporteList(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/11201/transporteList.json');
  }

  getAduanaList(catalogo: string) {
    return this.http.get<RespuestaCatalogos>('assets/json/11201/aduanaList.json');
  }
  
}
