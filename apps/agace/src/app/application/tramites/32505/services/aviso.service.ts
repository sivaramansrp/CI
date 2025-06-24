import { AvisoTablaDatos, CatalogoLista, DatosSolicitante, RespuestaConsulta} from '../models/avios-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

@Injectable({
  providedIn: 'any'
})
export class AvisoService {

   /**
     * Obtiene los datos del solicitante.
     * 
     * @returns {Observable<DatosSolicitante>} Un observable con los datos del solicitante.
     */
    obtenerDatosSolicitante(): Observable<DatosSolicitante> {
      return this.http.get<DatosSolicitante>(`assets/json/32505/datosSolicitante.json`);
    }

   /**
   * Obtiene los datos de la tabla de aviso.
   * 
   * @returns {Observable<AvisoTablaDatos>} Un observable con los datos de la tabla de aviso.
   */
   obtenerAvisoTabla(): Observable<AvisoTablaDatos> {
    return this.http.get<AvisoTablaDatos>(`assets/json/32505/aviso-tabla.json`);
  }
 
  /**
   * Obtiene la lista de columnas para la tabla de aviso.
   * 
   * @returns {Observable<ColumnasTabla>} Un observable con la lista de columnas.
   */
  obtenerAduana() :Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/32505/aduana.json');
  }
  
  /**
   * Obtiene la lista de combustibles.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de combustibles.
   */
  obtenerCombustible():Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/32505/combustible.json');
  }

  /**
   * Obtiene la lista de cilindros.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de cilindros.
   */
  obtenerCilindros():Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/32505/cilindros.json');
  }

  /**
   * Obtiene la lista de países emitidos.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de países emitidos.
   */
  obtenerPaisIssued(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/32505/pais-issued.json');
  }
  

    /**
   * Obtiene la lista de países disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de países desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de países.
   */
    obtenerPais(): Observable<CatalogoLista> {
      return this.http
        .get<CatalogoLista>('assets/json/32505/pais.json');
    }

  /**
   * Obtiene la lista de años disponibles.
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de países.
   */
    obtenerAnio(): Observable<CatalogoLista> {
      return this.http
        .get<CatalogoLista>('assets/json/32505/years.json');
    }

  /**
   * Obtiene la lista de tipos de documentos.
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de tipos de documentos. 
   * */
  constructor(
    private http: HttpClient
  ) {
    //
   }

   /**
   * Obtiene la lista de tipos de documentos.
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de tipos de documentos.
   * */
  getFraccionArancelariaCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/fraccion-arancelaria-catalogo.json');
  }
/**
   * Obtiene la lista de tipos de documentos.
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de tipos de documentos.
   * */
  getFraccionReglaCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/fraccion-regla-catalogo.json');
  }
/**
   * Obtiene la lista de tipos de documentos.
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de tipos de documentos.
   * */
  getTipoDocumento() : Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/tipoDocumento.json');
  }

  /**
   * @method getDatosConsulta
   * @description Obtiene los datos de consulta desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de consulta simulados desde el archivo `consulta_11201.json`.
   * 
   * @returns {Observable<RespuestaConsulta>} Un observable que emite la respuesta de los datos de consulta.
   */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>(`assets/json/32505/consulta_32505.json`);
  }
}
