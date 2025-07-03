import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable,map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../../../tramites/220102/constantes/fitosanitario.enum';

@Injectable({
  providedIn: 'root'
})
export class TercerosrelacionadosService {
  
  /** @description URL base para las peticiones a los catálogos y datos. */
  url: string = URL;

  constructor(public readonly http:HttpClient) { }

   /**
    * @description Obtiene la lista de catálogos a partir de un archivo.
    * @param {string} fileName - Nombre del archivo de catálogo.
    * @returns {Observable<Catalogo[]>} Observable con la lista de catálogos.
    */
   obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
     const BASEURL = this.url + fileName;
     return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
       map(response => response.data)
     );
   }

}
