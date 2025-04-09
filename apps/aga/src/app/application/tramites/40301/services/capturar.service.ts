import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapturarService {
  private baseUrl: string = 'assets/json/40301/'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the title for the "capturar" process.
   * @returns Observable<string>
   */
  obtenerTitulo(catalogo: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/solicitud.json`);
  }

  /**
   * Retrieves the roles of the current user.
   * @returns Observable<string[]>
   */
  obtenerRolesUsuario(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/userRoles.json`);
    // return of(["persomanMoral"]);
  }

  getCatalogo(AGENT_CATALOG: string): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.baseUrl}/tipoAgentoData.json`);
  }

  /**
   * Retrieves the tramite ID.
   * @returns Observable<string>
   */
  obtenerIdTramite(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/obtenerIdTramite`);
  }

  /**
   * Retrieves metadata for form fields.
   * @returns Observable<any>
   */
  obtenerCamposMetadata(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/obtenerCamposMetadata`);
  }


  /**
   * Validates form fields using metadata.
   * @param formId string
   * @param metadata any
   */
  stripesValidation(formId: string, metadata: any): void {
    // Implement validation logic here
    console.log(`Validating form ${formId} with metadata`, metadata);
  }

  /**
   * Sends the form data to the backend.
   * @param formData any
   * @returns Observable<any>
   */
  enviarFormulario(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/enviarFormulario`, formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}