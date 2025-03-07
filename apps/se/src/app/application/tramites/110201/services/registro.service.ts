import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  

   /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes.
   */
   constructor(private http: HttpClient) {}

   /**
    * Obtiene el catálogo de aduanas por las que ingresará la mercancía.
    * @returns Observable con la respuesta del catálogo de aduanas.
    */
   getPais() {
     return this.http.get<RespuestaCatalogos>(
       'assets/json/110201/pais.json'
     );
   }
 
   /**
    * Obtiene el catálogo de años.
    * @returns Observable con la respuesta del catálogo de años.
    */
   getTratado() {
     return this.http.get<RespuestaCatalogos>('assets/json/110201/tratado.json');
   }
 
   /**
    * Obtiene el catálogo de condiciones.
    * @returns Observable con la respuesta del catálogo de condiciones.
    */
   getCondicion() {
     return this.http.get<RespuestaCatalogos>(
       'assets/json/10301/condicion.json'
     );
   }

 
   /**
    * Obtiene el catálogo de tipos de documentos.
    * @returns Observable con la respuesta del catálogo de tipos de documentos.
    */
   getTipoDocumento() {
     return this.http.get<RespuestaCatalogos>(
       'assets/json/10301/tipodocumento.json'
     );
   }


}
