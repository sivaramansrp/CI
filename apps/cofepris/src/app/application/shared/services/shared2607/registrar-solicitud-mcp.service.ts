import { CATALOGO_ADUANAS,CATALOGO_REGIMENES,COMUN_URL,CATALOGO_CLASIFICACION_PRODUCTO,CATALOGO_ESPECIFICAR_CLASIFICACION_PRODUCTO ,CATALOGO_TIPOS_PRODUCTO, CATALOGO_PAISES, CATALOGO_BANCOS,CATALOGO_SCIAN} from '@libs/shared/data-access-user/src/core/servers/api-router';
import { FilaData2, ListaClave } from '../../models/fila-modal';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model'
import { CATALOGO_ESTADOS} from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MercanciaCrossList } from '../../models/mercancia.model';
import { Observable } from 'rxjs';
import { TramitesAsociados } from '../../models/destinatario.model';
/**
 * Servicio para gestionar las solicitudes MCP.
 * Proporciona métodos para obtener datos de catálogos y otros recursos necesarios para el trámite.
 */
@Injectable({
  providedIn: 'root'
})
export class RegistrarSolicitudMcpService {
/**
 * Host base para las solicitudes HTTP.
 */
      host!: string;
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a los recursos.
   */
  constructor(private http: HttpClient) {
    this.host = `${COMUN_URL.BASE_URL}`;
  }

  /**
   * Obtiene los datos de los estados desde un archivo JSON.
   * @returns Observable con la lista de estados.
   */
  getEstadosData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/estado.json');
  }

  /**
   * Obtiene los datos de las claves SCIAN desde un archivo JSON.
   * @returns Observable con la lista de claves SCIAN.
   */
  getClaveScianData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/clavescian.json');
  }

  /**
   * Obtiene los datos de las descripciones de claves desde un archivo JSON.
   * @returns Observable con la lista de descripciones de claves.
   */
  getClaveDescripcionDelData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/clavedescripciondel.json');
  }

  /**
   * Obtiene los datos del régimen desde un archivo JSON.
   * @returns Observable con la lista de regímenes.
   */
  getRegimenalqueData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/regimen.json');
  }

  /**
   * Obtiene los datos de las aduanas desde un archivo JSON.
   * @returns Observable con la lista de aduanas.
   */
  getAduanaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/adauna.json');
  }

  /**
   * Obtiene los datos de los bancos desde un archivo JSON.
   * @returns Observable con la lista de bancos.
   */
  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/banco.json');
  }

  /**
   * Obtiene los datos de los países desde un archivo JSON.
   * @returns Observable con la lista de países.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/pais.json');
  }

  /**
   * Obtiene los datos de los trámites asociados desde un archivo JSON.
   * @returns Observable con la lista de trámites asociados.
   */
  getTramitesAsociados(): Observable<TramitesAsociados[]> {
    return this.http.get<TramitesAsociados[]>('./assets/json/260702/tramitesasociados.json');
  }

  /**
   * Obtiene los datos de las mercancías desde un archivo JSON.
   * @returns Observable con la lista de mercancías.
   */
  getMercanciasData(): Observable<FilaData2[]> {
    return this.http.get<FilaData2[]>('./assets/json/260702/mercanciatabla.json');
  }

  /**
   * Obtiene los datos de la clasificación del producto desde un archivo JSON.
   * @returns Observable con la lista de clasificaciones del producto.
   */
  getClasificacionDelProductoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/delproducto.json');
  }

  /**
   * Obtiene los datos para especificar productos desde un archivo JSON.
   * @returns Observable con la lista de especificaciones de productos.
   */
  getEspificarData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/espicificar.json');
  }

  /**
   * Obtiene los datos de los tipos de productos desde un archivo JSON.
   * @returns Observable con la lista de tipos de productos.
   */
  getTipoProductoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260702/tipoproducto.json');
  }

  /**
   * Obtiene los datos de la lista de claves desde un archivo JSON.
   * @returns Observable con la lista de claves.
   */
  getListaClaveData(): Observable<ListaClave[]> {
    return this.http.get<ListaClave[]>('./assets/json/260702/lista-clave.json');
  }

  /**
   * Obtiene los datos del crosslist de mercancías desde un archivo JSON.
   * @returns Observable con la lista de crosslist de mercancías.
   */
  getMercanciaCrosslistData(): Observable<MercanciaCrossList[]> {
    return this.http.get<MercanciaCrossList[]>('./assets/json/260702/mercancia-crosslist.json');
  }

  /**
   * Obtiene el estado de la lista de un trámite específico.
   * @param tramite 
   * @returns 
   */
   obtenerEstadoList(tramite: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_ESTADOS(tramite)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }

    /**
     * Obtiene la lista de aduanas.
     * @returns Observable con la lista de aduanas.
     */
     obtenerAduanas(tramite: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_ADUANAS(tramite)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }
    /**
     * Obtiene la lista de regímenes.
     * @returns Observable con la lista de regímenes.
     */
    obtenerRegimenes(tramite: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_REGIMENES(tramite)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }
    
    /**
     * Obtiene la lista de claves SCIAN.
     * @returns Observable con la lista de claves SCIAN.
     */
    obtenerClavesScian(tramite: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_SCIAN(tramite)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }

    /**
     * Obtiene la lista de clasificaciones de productos.
     * @returns Observable con la lista de clasificaciones de productos.
     */
     obtenerClasificacionProductos(procedimiento: string,tramite: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_CLASIFICACION_PRODUCTO(procedimiento, tramite)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }

    /**
     * Obtiene los datos de los bancos desde un archivo JSON.
     * @
     * returns Observable con la lista de bancos.
     */
    obtenerEspecificarClasificacionProducto(procedimiento: string, idClasificacion: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_ESPECIFICAR_CLASIFICACION_PRODUCTO(procedimiento, idClasificacion)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }
    
    /**
     * Obtiene los datos de los tipos de productos.
     * @returns Observable con la lista de tipos de productos.
     */
    obtenerTipoProducto(procedimiento: string, tramite: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_TIPOS_PRODUCTO(procedimiento, tramite)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }

    /**
     * Obtiene los datos de los países.
     * @returns Observable con la lista de países.
     */
    obtenerPaises(tramite: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_PAISES(tramite)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }

    /**
     * Obtiene los datos de los bancos.
     * @returns Observable con la lista de bancos.
     */
    obtenerBancos(tramite: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_BANCOS(tramite)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }

    
  
}