import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapturarService {
  private baseUrl: string = '/api/capturar'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the title for the "capturar" process.
   * @returns Observable<string>
   */
  obtenerTitulo(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/obtenerTitulo`);
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
   * Retrieves the roles of the current user.
   * @returns Observable<string[]>
   */
  obtenerRolesUsuario(): Observable<string[]> {
    //return this.http.get<string[]>(`${this.baseUrl}/obtenerRolesUsuario`);

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