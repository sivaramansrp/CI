import { FilaData2, FilaTablaData } from '../models/fila-modal';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TramitesAsociados } from '../models/destinatario.model';
/**
 * Servicio para importar datos relacionados con remedios herbales.
 * Este servicio realiza solicitudes HTTP para obtener datos desde archivos JSON.
 */
@Injectable({
  providedIn: 'root'
})
export class ImportarDeRemediosHerbalsService {
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
    return this.http.get<Catalogo[]>('./assets/json/260919/estado.json');
  }

  /**
   * Obtiene los datos de las claves SCIAN desde un archivo JSON.
   * @returns Observable con la lista de claves SCIAN.
   */
  getClaveScianData(): Observable<Catalogo[]> {
      return this.http.get<Catalogo[]>('./assets/json/260919/clavescian.json');
    }
  
    /**
     * Obtiene los datos de las descripciones de claves desde un archivo JSON.
     * @returns Observable con la lista de descripciones de claves.
     */
    getClaveDescripcionDelData(): Observable<Catalogo[]> {
      return this.http.get<Catalogo[]>('./assets/json/260919/clavedescripciondel.json');
    }
  

  /**
   * Obtiene los datos del régimen desde un archivo JSON.
   * @returns Observable con la lista de regímenes.
   */
  getRegimenalqueData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260919/regimen.json');
  }

  /**
   * Obtiene los datos de las aduanas desde un archivo JSON.
   * @returns Observable con la lista de aduanas.
   */
  getAduanaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260919/adauna.json');
  }

  /**
   * Obtiene los datos de los bancos desde un archivo JSON.
   * @returns Observable con la lista de bancos.
   */
  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260919/banco.json');
  }

  /**
   * Obtiene los datos de los trámites asociados desde un archivo JSON.
   * @returns Observable con la lista de trámites asociados.
   */
  getTramitesAsociados(): Observable<TramitesAsociados[]> {
    return this.http.get<TramitesAsociados[]>('./assets/json/260919/tramitesasociados.json');
  }

  /**
   * Obtiene los datos de las mercancías desde un archivo JSON.
   * @returns Observable con la lista de mercancías.
   */
  getMercanciasData(): Observable<FilaData2[]> {
    return this.http.get<FilaData2[]>('./assets/json/260919/mercanciatabla.json');
  }

  /**
   * Obtiene los datos de los fabricantes desde un archivo JSON.
   * @returns Observable con la lista de fabricantes.
   */
  getFabricanteData(): Observable<FilaTablaData[]> {
    return this.http.get<FilaTablaData[]>('./assets/json/260919/fabricante.json');
  }

  getTipoProductoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260919/tipoproducto.json');
  }
  getClasificacionDelProductoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260919/delproducto.json');
  }
getEstadoFisicoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260919/estadofisico.json');
  }
  /**
   * Obtiene los datos para especificar productos desde un archivo JSON.
   * @returns Observable con la lista de especificaciones de productos.
   */
  getEspificarData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260919/espicificar.json');
  }

  /**
   * Obtiene los datos de los destinatarios desde un archivo JSON.
   * @returns Observable con la lista de destinatarios.
   */
  getDestinatarioData(): Observable<FilaTablaData[]> {
    return this.http.get<FilaTablaData[]>('./assets/json/260919/destinatario.json');
  }

  /**
   * Obtiene los datos de los proveedores desde un archivo JSON.
   * @returns Observable con la lista de proveedores.
   */
  getProveedorData(): Observable<FilaTablaData[]> {
    return this.http.get<FilaTablaData[]>('./assets/json/260919/proveedor.json');
  }

  /**
   * Obtiene los datos de los facturadores desde un archivo JSON.
   * @returns Observable con la lista de facturadores.
   */
  getFacturadorData(): Observable<FilaTablaData[]> {
    return this.http.get<FilaTablaData[]>('./assets/json/260919/facturador.json');
  }

  getSolicitudData(): Observable<TramitesAsociados[]> {
      return this.http.get<TramitesAsociados[]>('./assets/json/260919/solicitud.json');
    }

    /**
   * Obtiene los datos de los países desde un archivo JSON.
   * @returns Observable con la lista de países.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260919/pais.json');
  }
  
}