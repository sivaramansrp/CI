import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubirArchivoBody } from '../../../models/shared/subir-archivos.model';
import { enviroment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SubirDocumentoService {
  urlServer = enviroment.URL_SERVER_UPLOAD;

  constructor(private http: HttpClient) {}

  subirDocumento(token: string, body: SubirArchivoBody) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(this.urlServer, body, { headers });
  }
}
