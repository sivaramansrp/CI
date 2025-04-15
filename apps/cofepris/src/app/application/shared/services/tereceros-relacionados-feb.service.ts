import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Catalogo } from "@libs/shared/data-access-user/src";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TercerosRelacionadosFebService {

      /**
       * Constructor del servicio.
       * Inyecta el cliente HTTP para realizar peticiones.
       * 
       * @param http Cliente HTTP para realizar peticiones.
       */
      constructor(private http: HttpClient) {
         // Constructor logic can be added here if needed
       }
    /**
       * Obtiene los datos de terceros relacionados desde un archivo JSON local.
       * 
       * @returns Observable que emite un arreglo de objetos Catalogo.
       */
      getData(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('assets/json/cofepris/terceros-relacionados.json');
      }
    
      getPaisData(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('assets/json/cofepris/pais.json');
      }
    
      getMunicipioData(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('assets/json/cofepris/municipio.json');
      }
    
      getCodigoPostalData(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('assets/json/cofepris/codigo-postal.json');
      }
    
      getColoniaData(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('assets/json/cofepris/colonia.json');
      }
    
      getLocalidadData(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('assets/json/cofepris/localidad.json');
      }
    
      getEncabezadoDeTabla(): Observable<string[]> {
        return this.http.get<string[]>('assets/json/cofepris/encabezado-de-tabla.json');
      }
}