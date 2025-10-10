import { Catalogo, HttpCoreService, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import {
  MercanciasHistorico,
  ProductorExportador,
} from '../models/peru-certificado.module';
import { Observable, map } from 'rxjs';
import {
  Tramite110205State,
  Tramite110205Store,
} from '../estados/tramite110205.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { PROC_110205 } from '../servers/api-route'; 
import { Tramite110205Query } from '../estados/tramite110205.query';


/**
 * @service PeruCertificadoService
 * @description
 * Servicio para gestionar operaciones relacionadas con el certificado de Perú para el trámite 110205.
 * Proporciona métodos para obtener catálogos, datos de mercancías, productores/exportadores,
 * historial de mercancías y para actualizar el estado del formulario en el store correspondiente.
 *
 * @see Tramite110205Store
 * @see Catalogo
 * @see Mercancia
 * @see ProductorExportador
 * @see MercanciasHistorico
 * @see Tramite110205State
 *
 * @example
 * constructor(private peruCertificadoService: PeruCertificadoService) {}
 *
 * this.peruCertificadoService.obtenerMenuDesplegable('menu.json').subscribe(menu => {
 *   console.log(menu);
 * });
 */
@Injectable({
  providedIn: 'root',
})
export class PeruCertificadoService {
  /**
   * @property {string} url
   * @description Ruta base para acceder a los archivos JSON utilizados en el trámite 110205.
   */
  url: string = '../../../../../assets/json/110205/';

  /**
   * @constructor
   * @description
   * Inicializa el servicio con las dependencias necesarias.
   * @param {HttpClient} http - Servicio para realizar solicitudes HTTP.
   * @param {Tramite110205Store} tramite110205Store - Store para gestionar el estado del trámite 110205.
   */
  constructor(
    private readonly http: HttpClient,
    public httpService: HttpCoreService,
    public tramite110205Store: Tramite110205Store,
    public query: Tramite110205Query
  ) {}

  /**
   * @method obtenerMenuDesplegable
   * @description
   * Obtiene un array de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param {string} fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns {Observable<Catalogo[]>} Un observable que emite un array de objetos `Catalogo`.
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`)
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    console.log(BASE_URL);
    return this.http
      .get<RespuestaCatalogos>(BASE_URL)
      .pipe(map((response) => response.data));
  }

  /**
   * @method obtenerTablaDatos
   * @description
   * Obtiene un array de objetos `Mercancia` desde un archivo JSON ubicado en la URL especificada.
   * @param {string} fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns {Observable<Mercancia[]>} Un observable que emite un array de objetos `Mercancia`.
   * @usageNotes
   * Este método construye la URL completa añadiendo el `fileName` a la URL base (`this.url`)
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerTablaDatos(fileName: string): Observable<Mercancia[]> {
    const JSON_URL = this.url + fileName;
    console.log(JSON_URL);
    return this.http.get<Mercancia[]>(JSON_URL);
  }

  /**
   * @method obtenerProductorPorExportador
   * @description
   * Obtiene la lista de productores/exportadores disponibles desde un archivo JSON local.
   * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
   */
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http.get<ProductorExportador>(
      'assets/json/110205/productor-exportador.json'
    );
  }

  /**
   * @method obtenerMercancia
   * @description
   * Obtiene el historial de mercancías seleccionadas desde un archivo JSON local.
   * @returns {Observable<MercanciasHistorico>} Un observable que emite los datos del historial de mercancías.
   */
  obtenerMercancia(): Observable<MercanciasHistorico> {
    return this.http.get<MercanciasHistorico>(
      'assets/json/110205/mercancias-seleccionadas.json'
    );
  }

  /**
   * @method actualizarEstadoFormulario
   * @description
   * Actualiza el estado del formulario en el store con los datos proporcionados.
   * @param {Tramite110205State} DATOS - Objeto que contiene los nuevos datos para actualizar el estado.
   * @returns {void}
   */
  actualizarEstadoFormulario(DATOS: Tramite110205State): void {
    this.tramite110205Store.update((state) => ({
      ...state,
      ...DATOS,
    }));
  }

  /**
   * @method getRegistroTomaMuestrasMercanciasData
   * @description
   * Obtiene los datos de prellenado para el formulario desde un archivo JSON local.
   * @returns {Observable<Tramite110205State>} Observable que emite los datos de prellenado.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite110205State> {
    return this.http.get<Tramite110205State>(
      'assets/json/110205/datos-prefill.json'
    );
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Tramite110205State> {
    return this.query.selectPeru$;
  }
  guardarDatosPost(body: any) {
    return this.httpService.post<any>(PROC_110205.GUARDAR, { body: body });
    // return this.httpService.post<any>('http://localhost:8080/api/sat-t110201/solicitud/guardar', { body: body });
  }

  buscarMercanciasCert(body: any): Observable<any> {
    // return this.httpService.post<any>(
    //   'http://localhost:8080/api/sat-t110201/solicitud/buscar-mercancias',
    //   { body: body }
    // );
     return this.httpService.post<any>(PROC_110205.BUSCAR, { body: body });
  }
}
