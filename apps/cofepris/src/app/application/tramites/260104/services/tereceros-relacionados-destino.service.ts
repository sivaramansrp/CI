import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject,Observable } from "rxjs";

import { Destinatario,Fabricante } from "../models/terceros-relacionados-destino.model";
import { Catalogo } from "@libs/shared/data-access-user/src";



/**
 * @fileoverview Servicio para gestionar datos relacionados con terceros, fabricantes, y catálogos
 * en la aplicación Cofepris. Proporciona métodos para manejar datos reactivos y realizar
 * peticiones HTTP a archivos JSON locales.
*/
@Injectable({
  providedIn: 'root',
})


export class TercerosRelacionadosDestinoService {

  /**
   * Constructor del servicio.
   * Inyecta el cliente HTTP para realizar peticiones.
   * 
   * @param http Cliente HTTP para realizar peticiones.
   */
  constructor(private http: HttpClient) {
    // Constructor logic can be added here if needed
  }

  // Fuente de datos para los destinatarios, utilizando BehaviorSubject para manejar el estado reactivo.
  private destinatarioSource = new BehaviorSubject<Destinatario[]>([]);
  // Observable que expone los datos de destinatarios para ser suscritos por otros componentes.
  destinatario$ = this.destinatarioSource.asObservable();

  /**
   * Actualiza los datos de destinatarios.
   * 
   * @param data Arreglo de objetos `Destinatario` que se establecerán como el nuevo estado.
   */
  setDestinatario(data: Destinatario[]): void {
    this.destinatarioSource.next(data);
  }

  // Fuente de datos para los fabricantes, utilizando BehaviorSubject para manejar el estado reactivo.
  private fabricanteSource = new BehaviorSubject<Fabricante[]>([]);
  // Observable que expone los datos de fabricantes para ser suscritos por otros componentes.
  fabricante$ = this.fabricanteSource.asObservable();

  /**
   * Actualiza los datos de fabricantes.
   * 
   * @param data Arreglo de objetos `Fabricante` que se establecerán como el nuevo estado.
   */
  setFabricante(data: Fabricante[]): void {
    this.fabricanteSource.next(data);
  }

  /**
   * Obtiene los datos de terceros relacionados desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo`.
   * @description Este método realiza una petición HTTP para obtener los datos de terceros relacionados.
   */
  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/terceros-relacionados.json');
  }

  /**
   * Obtiene los datos de países desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo`.
   * @description Este método realiza una petición HTTP para obtener los datos de países.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/pais.json');
  }

  /**
   * Obtiene los datos de municipios desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo`.
   * @description Este método realiza una petición HTTP para obtener los datos de municipios.
   */
  getMunicipioData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/municipio.json');
  }

  /**
   * Obtiene los datos de códigos postales desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo`.
   * @description Este método realiza una petición HTTP para obtener los datos de códigos postales.
   */
  getCodigoPostalData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/codigo-postal.json');
  }

  /**
   * Obtiene los datos de colonias desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo`.
   * @description Este método realiza una petición HTTP para obtener los datos de colonias.
   */
  getColoniaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/colonia.json');
  }

  /**
   * Obtiene los datos de localidades desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos `Catalogo`.
   * @description Este método realiza una petición HTTP para obtener los datos de localidades.
   */
  getLocalidadData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/cofepris/localidad.json');
  }

  /**
   * Obtiene los encabezados de la tabla desde un archivo JSON local.
   * 
   * @returns {Observable<{ columns: string[] }>} Observable que emite un objeto con un arreglo de columnas.
   * @description Este método realiza una petición HTTP para obtener los encabezados de la tabla.
   */
  getEncabezadoDeTabla(): Observable<{ columns: string[] }> {
    return this.http.get<{ columns: string[] }>('assets/json/cofepris/encabezado-de-tabla.json');
  }


}