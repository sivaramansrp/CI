/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoDocumento } from '../../models/701/tipo-documento.model';
import{RespuestaCatalogos} from '../../../../../../../../../libs/shared/data-access-user/src/core/models/shared/catalogos.model';
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
      './shared/theme/assets/json/701/tipodocumento.json'
    );
  }
  
  getDocumentoSelect(){
    console.log("helo");
    return this.http.get<TipoDocumento[]>(
      './shared/theme/assets/json/701/documento-select.json'
    )
  }
}
