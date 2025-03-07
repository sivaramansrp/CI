import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{RespuestaCatalogos} from '../../models/shared/catalogos.model';
import { TipoDocumento } from '../../models/701/tipo-documento.model';
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
    return  this.http.get<TipoDocumento[]>(
      './shared/theme/assets/json/701/documento-select.json'
    )
  }
}
