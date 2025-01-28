import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubirArchivoBody } from '../../../models/shared/subir-archivos.model';
import { enviroment } from '../../../../../enviroments/enviroment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private urlServer = enviroment.URL_SERVER_UPLOAD;

  constructor(private http: HttpClient) {}

  subirDocumento(token: string, file: File): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      jwt: `${token}`,
      idUser: 1,
    });

    const formData = new FormData();
    formData.append('file', file, file.name);


    return this.http.put<{ message: string }>(`${this.urlServer}/upload`, formData, {
      headers,
    });
  }

  /**
   * @description Función para generar el pdf  del acuse
   * @param id
   * @returns JSONResponse
   */

  generarAcuse(cuerpoAcuse: any) {
    return this.http
      .put<any>(`${this.urlServer}/create-pdf`, cuerpoAcuse)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }
}
