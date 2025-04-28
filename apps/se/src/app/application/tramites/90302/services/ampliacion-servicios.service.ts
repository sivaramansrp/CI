/**
 * @fileoverview
 * El `AmpliacionServiciosService` es un servicio de Angular diseñado para gestionar las operaciones relacionadas con la ampliación de servicios.
 * Proporciona métodos para obtener datos desde archivos JSON y gestionar la visibilidad de ciertos elementos en la interfaz de usuario.
 * 
 * @module AmpliacionServiciosService
 * @description
 * Este servicio utiliza el cliente HTTP de Angular para realizar solicitudes a archivos JSON locales y expone observables para manejar datos y eventos.
 */

import { Observable, Subject, map } from 'rxjs';
import { DatosResponse, BitacoraRespuesta, SectorRespuesta, PlantasRespuesta, MercanciasRespuesta, ProductorIndirectoRespuesta} from '../models/datos-info.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class AmpliacionServiciosService {

  
  /**
   * @description
   * URL base para acceder a los archivos JSON que contienen los datos.
   */
  private apiUrl = 'assets/json/90302/';

  /**
   * Constructor del servicio.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP de Angular para realizar solicitudes.
   */
  constructor(private readonly http: HttpClient) {
    // No se necesita lógica de inicialización adicional.
  }


  /**
   * Obtiene los datos de ampliación de servicios desde un archivo JSON.
   * @method getDatos
   * @returns {Observable<DatosResponse[]>} - Observable con los datos obtenidos.
   */
  getDatos(): Observable<DatosResponse[]> {
    return this.http
      .get<DatosResponse[]>("assets/json/90302/info-registro-datos.json")
      .pipe(map((res) => res));
  }

  
  
  getBitacoraProsec(): Observable<BitacoraRespuesta> {
    return this.http.get<BitacoraRespuesta>(`${this.apiUrl}bitacora.json`).pipe(
      map((res) => res)
    );
  }
  getSectoresProsec(): Observable<SectorRespuesta> {
    return this.http.get<SectorRespuesta>(`${this.apiUrl}sectores.json`).pipe(
      map((res) => res)
    );
  }
  getPlantasProsec(): Observable<PlantasRespuesta> {
    return this.http.get<PlantasRespuesta>(`${this.apiUrl}plantas.json`).pipe(
      map((res) => res)
    );
  }
  getMercanciasProsec(): Observable<MercanciasRespuesta> {
    return this.http.get<MercanciasRespuesta>(`${this.apiUrl}mercancias.json`).pipe(
      map((res) => res)
    );
  }
  getProductorIndirectoProsec(): Observable<ProductorIndirectoRespuesta> {
    return this.http.get<ProductorIndirectoRespuesta>(`${this.apiUrl}productor.json`).pipe(
      map((res) => res)
    );
  }

}