import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';

import { ConfiguracionItem } from '../enum/mercancia.enum';

/**
 * Servicio para gestionar las operaciones relacionadas con los permisos CITES.
 * Proporciona métodos para inicializar catálogos y cargar datos de tablas.
 */
@Injectable({
  providedIn: 'root'
})

export class PermisoCitesService {

  /**
   * Catálogo de tipos de movimiento.
   * Contiene las opciones disponibles para el tipo de movimiento.
   */
  tipodeMovimiento: Catalogo[] = [];

  /**
   * Catálogo de tipos de régimen.
   * Contiene las opciones disponibles para el tipo de régimen.
   */
  tipoRegimen: Catalogo[] = [];

  /**
   * Catálogo de fracciones arancelarias.
   * Contiene las opciones disponibles para las fracciones arancelarias.
   */
  fraccionArancelaria: Catalogo[] = [];

  /**
   * Catálogo de descripciones de fracciones arancelarias.
   * Contiene las descripciones asociadas a las fracciones arancelarias.
   */
  fraccionArancelariaDescripcion: Catalogo[] = [];

  /**
   * Catálogo de clasificaciones taxonómicas.
   * Contiene las opciones disponibles para clasificaciones taxonómicas.
   */
  clasificacionTaxonomica: Catalogo[] = [];

  /**
   * Catálogo de nombres científicos.
   * Contiene las opciones disponibles para nombres científicos.
   */
  nombreCientifico: Catalogo[] = [];

  /**
   * Catálogo de nombres comunes.
   * Contiene las opciones disponibles para nombres comunes.
   */
  nombreComun: Catalogo[] = [];

  /**
   * Catálogo de unidades de medida.
   * Contiene las opciones disponibles para unidades de medida.
   */
  unidadMedida: Catalogo[] = [];

  /**
   * Catálogo de países de origen.
   * Contiene las opciones disponibles para países de origen.
   */
  paisOrigen: Catalogo[] = [];

  /**
   * Catálogo de países de procedencia.
   * Contiene las opciones disponibles para países de procedencia.
   */
  paisProcedencia: Catalogo[] = [];

  /**
   * Catálogo de entidades federativas.
   * Contiene las opciones disponibles para entidades federativas.
   */
  entidadFederativa: Catalogo[] = [];

  /**
   * Catálogo de bancos.
   * Contiene las opciones disponibles para bancos.
   */
  banco: Catalogo[] = [];

  /**
   * URL del archivo JSON que contiene los datos de la tabla.
   * Se utiliza para cargar los datos de la tabla desde un archivo local.
   */
  private jsonUrl = 'assets/json/230902/tablaDatos.json';

  /**
   * Constructor del servicio.
   * Inicializa el cliente HTTP para realizar solicitudes.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Inicializa los catálogos relacionados con los datos de la solicitud.
   * Carga los catálogos de tipo de movimiento y tipo de régimen desde archivos JSON.
   */
  public inicializaDatosSolicitudDatosCatalogos(): void {
    this.obtenerRespuestaPorUrl(this, 'tipodeMovimiento', '/230902/tiposDeMovimiento.json');
    this.obtenerRespuestaPorUrl(this, 'tipoRegimen', '/230902/tiposDeRegimen.json');
   
  }
 
  /**
   * Inicializa los catálogos relacionados con terceros.
   * Carga el catálogo de entidades federativas desde un archivo JSON.
   */
  public inicializaTercerosDatosCatalogos():void {
    this.obtenerRespuestaPorUrl(this, 'entidadFederativa', '/230902/entidadFederativa.json');
  }
 
  /**
   * Inicializa los catálogos relacionados con el pago de derechos.
   * Carga el catálogo de bancos desde un archivo JSON.
   */
  public inicializaPagoDeDerechosDatosCatalogos():void {
    this.obtenerRespuestaPorUrl(this, 'banco', '/230902/banco.json');
  }

  /**
   * Inicializa los catálogos relacionados con la mercancía.
   * Carga varios catálogos, como fracción arancelaria, descripción, clasificación taxonómica, etc., desde archivos JSON.
   */
  public inicializaMercanciaDatosCatalogos():void {
    this.obtenerRespuestaPorUrl(this, 'fraccionArancelaria', '/230902/fraccionArancelaria.json');
    this.obtenerRespuestaPorUrl(this, 'fraccionArancelariaDescripcion', '/230902/fraccionArancelariaDescripcion.json');
    this.obtenerRespuestaPorUrl(this, 'clasificacionTaxonomica', '/230902/clasificacionTaxonomica.json');
    this.obtenerRespuestaPorUrl(this, 'nombreCientifico', '/230902/nombreCientifico.json');
    this.obtenerRespuestaPorUrl(this, 'nombreComun', '/230902/nombreComun.json');
    this.obtenerRespuestaPorUrl(this, 'unidadMedida', '/230902/unidadMedida.json');
    this.obtenerRespuestaPorUrl(this, 'paisOrigen', '/230902/paisOrigen.json');
    this.obtenerRespuestaPorUrl(this, 'paisProcedencia', '/230902/paisProcedencia.json');
  }

 
  /**
     * Obtiene una respuesta desde una URL y asigna los datos a una variable.
     * 
     * @param {PermisoCitesService} self - Instancia del servicio.
     * @param {keyof PermisoCitesService} variable - Nombre de la variable donde se almacenarán los datos.
     * @param {string} url - URL desde la cual se obtendrán los datos.
     */
  obtenerRespuestaPorUrl(
    self: PermisoCitesService,
    variable: keyof PermisoCitesService,
    url: string
  ): void {
    if (self && variable && url) {
      this.http.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
        (self[variable] as Catalogo[]) = resp?.code === 200 && resp.data ? resp.data : [];
      });
    }
  }
  
  /**
   * Carga los datos de la tabla desde un archivo JSON.
   * 
   * @returns {Observable<ConfiguracionItem[]>} Observable que emite los datos de la tabla.
   */
  loadTablaDatos(): Observable<ConfiguracionItem[]> {
    return this.http.get<ConfiguracionItem[]>(this.jsonUrl);
  }
 /**
   * Obtiene los datos del documentos seleccionados.
   * @returns Observable con los datos del documentos seleccionados.
   */
  obtenerDocumentosSeleccionados(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/202/documentos-seleccionados.json');
  }
}