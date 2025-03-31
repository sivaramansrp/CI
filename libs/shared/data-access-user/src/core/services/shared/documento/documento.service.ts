import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private urlServer = enviroment.URL_SERVER_UPLOAD;

  constructor(private http: HttpClient) { }

  subirDocumento(token: string, file: File): Observable<{ message: string }> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = new HttpHeaders({
      jwt: `${token}`,
      idUser: 1,
    });

    const FORM_DATA = new FormData();
    FORM_DATA.append('file', file, file.name);


    return this.http.put<{ message: string }>(`${this.urlServer}/upload`, FORM_DATA, {
      headers,
    });
  }

  /**
   * @description Función para generar el pdf  del acuse
   * @param id
   * @returns JSONResponse
   */
  generarAcuse(cuerpoAcuse: any): Observable<any> {
    return this.http
      .put<any>(`${this.urlServer}/create-pdf`, cuerpoAcuse)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
