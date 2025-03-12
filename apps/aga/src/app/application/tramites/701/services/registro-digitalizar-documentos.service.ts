/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo, CatalogosSelect, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { TipoDocumento } from '../models/tipo-documento.model';
@Injectable({
  providedIn: 'root',
})
export class RegistroDigitalizarDocumentosService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los tipos de documentos desde un archivo JSON.
   * @returns {Observable<RespuestaCatalogos>} Un observable con la respuesta de los tipos de documentos.
   */
  getTipoDocumento() {
    return this.http.get<RespuestaCatalogos>(
       'assets/json/701/tipodocumento.json'
      
    );
  }
  
  getDocumentoSelect(){
    return this.http.get<TipoDocumento[]>(
       'assets/json/701/documento-select.json'
    )
  }
  getDocumentos(){
    return this.http.get<RespuestaCatalogos>(
       'assets/json/701/documents.json'
    )
  }
}
