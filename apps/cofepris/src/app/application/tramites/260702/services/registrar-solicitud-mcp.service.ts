import { FilaData2, ListaClave } from '../models/fila-modal';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MercanciaCrossList } from '../models/mercancia.model';
import { Observable } from 'rxjs';
import { TramitesAsociados } from '../models/destinatario.model';

/**
 * Servicio para gestionar las solicitudes MCP.
 * Proporciona métodos para obtener datos de catálogos y otros recursos necesarios para el trámite.
 */
@Injectable({
  providedIn: 'root'
})
export class RegistrarSolicitudMcpService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a los recursos.
   */
  constructor(private http: HttpClient) {}

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
}
