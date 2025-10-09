import { CatalogoLista, DisponiblesTabla, HistoricoColumnas, MercanciaTabla, RespuestaConsulta, SeleccionadasTabla } from '../models/validar-inicialmente-certificado.model';
import { HttpCoreService, JsonResponseCatalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROC_110214 } from '../servers/api-route';
import { ProductorExportador } from '../models/validar-inicialmente-certificado.model';
import { Tramite110214State } from '../../../estados/tramites/tramite110214.store';
import { Tramite110214Query } from '../../../estados/queries/tramite110214.query';
/**
 * Servicio para validar inicialmente los datos del certificado en el trámite 110214.
 * 
 * Este servicio proporciona métodos para obtener información necesaria para el trámite,
 * como idiomas, entidades federativas, representaciones federales, mercancías disponibles,
 * mercancías seleccionadas, productores por exportador, tratados y países.
 */
@Injectable({
  providedIn: 'root'
})
export class ValidarInicialmenteCertificadoService {

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a los recursos.
   */
  constructor(
    private http: HttpClient,
    public httpService: HttpCoreService,
    private tramite110214Query: Tramite110214Query
  ) { }

  /**
   * Obtiene la lista de idiomas disponibles.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de idiomas.
   */
  obtenerIdioma(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/idioma.json');
  }

  /**
   * Obtiene la lista de entidades federativas.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de entidades federativas.
   */
  obtenerEntidadFederativa(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/entidad-federativa.json');
  }

  /**
   * Obtiene la lista de representaciones federales.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de representaciones federales.
   */
  obtenerRepresentacionFederal(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/representacion-federal.json');
  }

  /**
   * Obtiene la información del productor por exportador.
   * 
   * @returns {Observable<ProductorExportador>} Un observable con los datos del productor por exportador.
   */
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http.get<ProductorExportador>('assets/json/110214/productor-exportador.json');
  }

  /**
   * Obtiene la lista de mercancías disponibles.
   * 
   * @returns {Observable<DisponiblesTabla[]>} Un observable con la lista de mercancías disponibles.
   */
  obtenerMercanciasDisponibles(): Observable<DisponiblesTabla[]> {
    return this.http.get<DisponiblesTabla[]>('assets/json/110214/mercancia-disponsible.json');
  }

  /**
   * Obtiene la lista de mercancías seleccionadas.
   * 
   * @returns {Observable<SeleccionadasTabla[]>} Un observable con la lista de mercancías seleccionadas.
   */
  obtenerMercanciasSeleccionadas(): Observable<SeleccionadasTabla[]> {
    return this.http.get<SeleccionadasTabla[]>('assets/json/110214/mercancias-seleccionadas.json');
  }

  /**
   * Obtiene la lista de mercancías seleccionadas.
   * 
   * @returns {Observable<SeleccionadasTabla[]>} Un observable con la lista de mercancías seleccionadas.
   */
  getMercanciasSeleccionadas(): Observable<MercanciaTabla[]> {
    return this.http.get<MercanciaTabla[]>('assets/json/110214/mercancias-seleccionadas.json');
  }

  /**
   * Obtiene la lista de tratados disponibles.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de tratados.
   */
  obtenerTratado(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/pais.json');
  }

  /**
   * Obtiene la lista de países disponibles.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de países.
   */
  obtenerPais(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/pais.json');
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
    return this.http.get<RespuestaConsulta>(`assets/json/110214/consulta-110214.json`);
  }

  /**
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getTipoFactura(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      PROC_110214.TIPO_FACTURA,
      {},
      false
    );
  }

  /**
   * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
   *
   * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
   * @returns Observable con la respuesta de la solicitud POST.
   */
  guardarDatosPost(body: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.httpService.post<Record<string, unknown>>(PROC_110214.GUARDAR, { body: body });
  }

  /**
     * Obtiene todos los datos del estado almacenado en el store.
     * @returns {Observable<Tramite80101State>} Observable con todos los datos del estado.
     */
    getAllState(): Observable<Tramite110214State> {
      return this.tramite110214Query.allStoreData$;
    }

  // eslint-disable-next-line class-methods-use-this
  buildProductoresPorExportador(data: HistoricoColumnas[]): unknown[] {
    return data.map(item => ({
      "consecutivo": item.id,
      "nombreCompleto": item.nombreProductor,
      "rfc": item.numeroRegistroFiscal,
      "direccionCompleta": item.direccion,
      "correoElectronico": item.correoElectronico,
      "telefono": item.telefono,
      "fax": item.fax
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  buildMercanciasProductor(data: MercanciaTabla[]): unknown[] {
    return data.map(item => ({
      "fraccionArancelaria": item.fraccionArancelaria,
      "cantidadComercial": item.cantidad,
      "descUnidadMedidaComercial": item.unidadMedida,
      "valorTransaccional": item.valorMercancia,
      "descFactura": item.fetchFactura,
      "numeroFactura": item.numeroFactura,
      "complementoDescripcion": item.complementoDescripcion,
      "rfcProductor": item.rfcProductor1
    }));
  }
}