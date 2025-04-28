import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BeneficiosData, BodegasData, CafeExportadoresData, RegionesData } from '../models/filadata.model';

@Injectable({
  providedIn: 'root'
})
export class NacionalRegistroDelCafeExportadoresService {

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos de las regiones desde un archivo JSON
   * @returns Observable con la lista de datos de las regiones
   */
  getRegionsData(): Observable<RegionesData[]> {
      return this.http.get<RegionesData[]>('./assets/json/290301/regionesdecompraData.json');
    }

  /**
   * Obtiene los datos de los beneficios desde un archivo JSON
   * @returns Observable con la lista de datos de los beneficios
   */
  getBeneficiosData(): Observable<BeneficiosData[]> {
      return this.http.get<BeneficiosData[]>('./assets/json/290301/beneficiosData.json');
    }

  /**
   * Obtiene los datos de las bodegas desde un archivo JSON
   * @returns Observable con la lista de datos de las bodegas
   */
  getBodegasData(): Observable<BodegasData[]> {
      return this.http.get<BodegasData[]>('./assets/json/290301/bodegasData.json');
    }
   
  /**
   * Obtiene los datos de los exportadores de café desde un archivo JSON
   * @returns Observable con la lista de datos de los exportadores de café
   */
  getCafeExportadoresData(): Observable<CafeExportadoresData[]> {
      return this.http.get<CafeExportadoresData[]>('./assets/json/290301/cafedeexportacionData.json');
    }
}