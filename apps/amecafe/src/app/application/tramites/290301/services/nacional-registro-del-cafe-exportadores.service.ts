import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BeneficiosData, BodegasData, CafeExportadoresData, RegionesData } from '../models/filadata.model';

@Injectable({
  providedIn: 'root'
})
export class NacionalRegistroDelCafeExportadoresService {

  constructor(private http: HttpClient) {}

  getRegionsData(): Observable<RegionesData[]> {
      return this.http.get<RegionesData[]>('./assets/json/290301/regionesdecompraData.json');
    }

  getBeneficiosData(): Observable<BeneficiosData[]> {
      return this.http.get<BeneficiosData[]>('./assets/json/290301/beneficiosData.json');
    }

  getBodegasData(): Observable<BodegasData[]> {
      return this.http.get<BodegasData[]>('./assets/json/290301/bodegasData.json');
    }
   
  getCafeExportadoresData(): Observable<CafeExportadoresData[]> {
      return this.http.get<CafeExportadoresData[]>('./assets/json/290301/cafedeexportacionData.json');
    }


}
