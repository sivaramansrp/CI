import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject,Observable } from "rxjs";

import { Destinatario,Fabricante } from "../models/terceros-relacionados-destino.model";
import { Catalogo } from "@libs/shared/data-access-user/src";


/**
 * Servicio para gestionar datos relacionados con terceros, fabricantes y catálogos
 * en la aplicación Cofepris. Proporciona métodos para establecer y obtener datos
 * a través de observables y solicitudes HTTP.
 * 
 * @remarks
 * Este servicio utiliza `BehaviorSubject` para manejar el estado de los datos
 * y exponerlos como observables. También realiza solicitudes HTTP para obtener
 * datos desde archivos JSON locales.
 */
@Injectable({
  providedIn: 'root',
})
export class TercerosRelacionadosDestinoService {
  /**
   * Constructor de la clase TercerosRelacionadosDestinoService.
   * 
   * @param http - Cliente HTTP utilizado para realizar solicitudes a servicios externos.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fuente de datos que almacena una lista de destinatarios.
   * Utiliza un `BehaviorSubject` para mantener y emitir los cambios
   * en la lista de destinatarios relacionados.
   *
   * @private
   * @type {BehaviorSubject<Destinatario[]>}
   */
  private destinatarioSource = new BehaviorSubject<Destinatario[]>([]);

  /**
   * Observable que emite los valores del sujeto `destinatarioSource`.
   * Representa el destinatario relacionado con el flujo actual.
   * 
   * @type {Observable<any>} - Flujo observable de datos del destinatario.
   */
  destinatario$ = this.destinatarioSource.asObservable();

  /**
   * Establece la lista de destinatarios y actualiza la fuente de datos correspondiente.
   * 
   * @param data - Un arreglo de objetos de tipo `Destinatario` que representa los destinatarios a establecer.
   * 
   * @remarks
   * Este método utiliza un Subject para emitir los nuevos valores de destinatarios a los suscriptores.
   */
  setDestinatario(data: Destinatario[]): void {
    this.destinatarioSource.next(data);
  }

  /**
   * Fuente de datos que almacena una lista de objetos de tipo `Fabricante`.
   * Utiliza un `BehaviorSubject` para emitir y mantener el estado actual de los fabricantes.
   * 
   * @private
   */
  private fabricanteSource = new BehaviorSubject<Fabricante[]>([]);

  /**
   * Observable que expone los datos del fabricante.
   * Este observable se utiliza para suscribirse a los cambios en la fuente de datos del fabricante.
   */
  fabricante$ = this.fabricanteSource.asObservable();

  /**
   * Establece la lista de fabricantes y actualiza el origen de datos correspondiente.
   * 
   * @param data - Un arreglo de objetos de tipo `Fabricante` que representa los fabricantes a establecer.
   * 
   * @remarks
   * Este método utiliza un Subject para emitir los nuevos datos de fabricantes a los suscriptores.
   */
  setFabricante(data: Fabricante[]): void {
    this.fabricanteSource.next(data);
  }

  /**
   * Obtiene los datos de un catálogo desde un archivo JSON local.
   * 
   * @returns Un observable que emite un arreglo de objetos de tipo `Catalogo`.
   */
  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/terceros-relacionados.json');
  }

  /**
   * Obtiene los datos del catálogo de países desde un archivo JSON local.
   * 
   * @returns Un observable que emite un arreglo de objetos del tipo `Catalogo`.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/pais.json');
  }

  /**
   * Obtiene los datos del catálogo de municipios desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de objetos del tipo `Catalogo`.
   */
  getMunicipioData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/municipio.json');
  }

  /**
   * Obtiene los datos del catálogo de códigos postales desde un archivo JSON local.
   *
   * @returns {Observable<Catalogo[]>} Un observable que emite una lista de objetos del tipo `Catalogo`.
   */
  getCodigoPostalData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/codigo-postal.json');
  }

  /**
   * Obtiene los datos del catálogo de colonias desde un archivo JSON local.
   * 
   * @returns Un observable que emite un arreglo de objetos del tipo `Catalogo`.
   */
  getColoniaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/colonia.json');
  }

  /**
   * Obtiene los datos de la localidad desde un archivo JSON local.
   * 
   * @returns Un observable que emite un arreglo de objetos de tipo `Catalogo`.
   */
  getLocalidadData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/localidad.json');
  }

  /**
   * Obtiene el encabezado de la tabla desde un archivo JSON localizado en los activos de la aplicación.
   * 
   * @returns Un observable que emite un objeto con una propiedad `columns`, 
   *          que es un arreglo de cadenas representando los nombres de las columnas.
   */
  getEncabezadoDeTabla(): Observable<{ columns: string[] }> {
    return this.http.get<{ columns: string[] }>('assets/json/cofepris/encabezado-de-tabla.json');
  }
}