import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubirArchivoBody } from '../../../models/shared/subir-archivos.model';
import { enviroment } from '../../../../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubirDocumentoService {
  private urlServer = enviroment.URL_SERVER_UPLOAD;

  constructor(private http: HttpClient) {}

  subirDocumento(token: string, file: File): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      jwt: `${token}`,
      idUser: 1,
    });

    const formData = new FormData();
    formData.append('file', file, file.name);

    console.log(formData)

    return this.http.put<{ message: string }>(this.urlServer, formData, {
      headers,
    });
  }
}
