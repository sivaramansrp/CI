import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { ColumnasTabla, SeleccionadasTabla } from '../models/registro.model';
import { MercanciasHistorico, ProductorExportador } from '../models/peru-certificado.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Tramite110221State, Tramite110221Store } from '../estados/tramite110221.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { Mercancias } from '../models/plantas-consulta.model';

/**
 * @descripcion
 * Servicio encargado de validar y obtener datos iniciales para el trámite de certificado.
 * Proporciona métodos para consultar catálogos, tablas de datos, productores/exportadores y actualizar el estado del formulario.
 */
@Injectable({
  providedIn: 'root'
})
export class ValidarInicialmenteCertificadoService {
  url: string = '../../../../../assets/json/110221/';

  /**
   * @constructor
   * @descripcion
   * Inyecta el cliente HTTP y el store del trámite para manipular el estado y realizar peticiones.
   * @param http Cliente HTTP para realizar solicitudes.
   * @param tramite110221Store Store para manipular el estado del trámite.
   */
  constructor(private readonly http: HttpClient, public tramite110221Store: Tramite110221Store) { }

  /**
   * @method obtenerMenuDesplegable
   * @descripcion
   * Obtiene un arreglo de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un arreglo de objetos `Catalogo`.
   * @usageNotes
   * Este método construye la URL completa al agregar el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
      map(response => response.data)
    );
  }

  /**
   * @method obtenerTablaDatos
   * @descripcion
   * Obtiene un arreglo de objetos `Mercancia` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un arreglo de objetos `Mercancia`.
   * @usageNotes
   * Este método construye la URL completa al agregar el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerTablaDatos(fileName: string): Observable<Mercancia[]> {
    const JSON_URL = this.url + fileName;
    return this.http.get<Mercancia[]>(JSON_URL);
  }

  /**
   * @method obtenerProductorPorExportador
   * @descripcion
   * Obtiene la lista de productores/exportadores disponibles desde un archivo JSON.
   * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
   */
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http
      .get<ProductorExportador>('assets/json/110221/productor-exportador.json');
  }

  /**
   * @method obtenerMercancia
   * @descripcion
   * Obtiene el historial de mercancías seleccionadas desde un archivo JSON local.
   * @returns {Observable<MercanciasHistorico>} Un observable que emite los datos del historial de mercancías.
   */
  /**
   * Obtiene la lista de mercancías desde un archivo JSON local.
   * @method obtenerMercancia
   * @returns {Observable<Mercancia[]>} Observable con la lista de mercancías.
   */
  obtenerMercancia(): Observable<Mercancias[]> {
    return this.http
      .get<{ data: Mercancias[] }>('assets/json/110204/mercancia.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }


  /**
   * Obtiene el catálogo de países de destino.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getPaisDestino(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }

  /**
   * Obtiene el catálogo de transportes.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getTransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }
  /**
   * Obtiene el catálogo de tratados.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getTratado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/tratado.json');
  }
  
   /**
   * Obtiene el catálogo de tipos de factura.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getTipoFactura(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/110221/tipofactura.json'
    );
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial (UMC).
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getUMC(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/umc.json');
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getUnidadMedida(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/umc.json');
  }

  /**
   * Recupera la lista de "Registro de Solicitudes" desde un archivo JSON.
   * @returns {Observable<ColumnasTabla[]>} Observable con array de objetos.
   * @throws {Error} Lanza error si la solicitud HTTP falla.
   */
  public getSolicitudesTabla(): Observable<ColumnasTabla[]> {
    return this.http.get<ColumnasTabla[]>('assets/json/110221/mercancia-disponsible.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

   /**
   * Recupera la lista de "Solicitudes Seleccionadas" desde un archivo JSON.
   * @returns {Observable<SeleccionadasTabla[]>} Observable con array de objetos.
   * @throws {Error} Lanza error si la solicitud HTTP falla.
   */
  public getSolicitudesDataTabla(): Observable<SeleccionadasTabla[]> {
    return this.http.get<SeleccionadasTabla[]>('assets/json/110221/mercancias-seleccionadas-certificado.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  
  /**
   * @method getRegistroTomaMuestrasMercanciasData
   * @descripcion
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   * @returns Observable con los datos del estado de la solicitud `Tramite110221State`,
   *          cargados desde el archivo JSON especificado en la ruta de `assets`.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite110221State> {
    return this.http.get<Tramite110221State>('assets/json/110221/datos-prefill.json');
  }

    /**
     * Obtiene la lista de estados desde un archivo JSON local.
     * @method obtenerListaEstado
     * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
     */
    obtenerListaEstado(): Observable<Catalogo[]> {
      return this.http
        .get<{ data: Catalogo[] }>('./assets/json/110221/estado.json') // Solicita los datos del archivo JSON
        .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
    }
    /**
   * Obtiene la lista de países bloque desde un archivo JSON local.
   * @method obtenerPaisBloque
   * @returns {Observable<Catalogo[]>} Observable con la lista de países bloque.
   */
  obtenerPaisBloque(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110221/país-bloque.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }


    obtenerMercancias(): Observable<MercanciasHistorico> {
    return this.http
      .get<MercanciasHistorico>('assets/json/110221/mercancias-seleccionadas.json');
  }
   /**
 * Obtiene la lista de facturas desde un archivo JSON local.
 * @method obtenerFacturas
 * @returns {Observable<Catalogo[]>} Observable con la lista de facturas.
 */
  obtenerFacturas(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110204/factura.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }
   /**
     * Obtiene la lista de UMC desde un archivo JSON local.
     * @method obtenerUmc
     * @returns {Observable<Catalogo[]>} Observable con la lista de UMC.
     */
    obtenerUmc(): Observable<Catalogo[]> {
      return this.http
        .get<{ data: Catalogo[] }>('assets/json/110204/umc.json') // Solicita los datos del archivo JSON
        .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
    }
  

}