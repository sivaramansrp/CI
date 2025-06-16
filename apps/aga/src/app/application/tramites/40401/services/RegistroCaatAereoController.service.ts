import { CaatAereoData, CatalogoLista } from '../models/certi-registro.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroCaatAereoService {

  /**
   * Constructor del servicio.
   *
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a los archivos JSON.
   */
  constructor(private http: HttpClient) { 
    // Constructor vacío
  }

  /**
   * Fetches the CAAT Aereo catalog data from a local JSON file.
   *
   * @returns {Observable<CatalogoLista>} An observable that emits the catalog data.
   */
  obtenerCAATAereo(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/40401/pais.json');
  }

  /**
   * Fetches the CAAT Aereo data from a local JSON file.
   *
   * @returns {Observable<CaatAereoData>} An observable that emits the CAAT Aereo data.
   */
  obtenerCAATAereoData(): Observable<CaatAereoData> {
    return this.http.get<CaatAereoData>('assets/json/40401/caat.aereo.data.json');
  } 
}