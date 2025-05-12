import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CatalogoResponse } from '@ng-mf/data-access-user';

import { Observable } from 'rxjs';

import { BitacoraModel , MercanciasModel , ModificacionInfo , PLANTAS, ProductorIndirecto , ProsecModificacionModel , SectorModel } from '../models/prosec-modificacion.model';


@Injectable({
  providedIn: 'root'
})
export class ProsecModificacionServiceTsService {

  constructor(private http: HttpClient) {
    //constructor
   }
  getListaDomicilios() : Observable<ProsecModificacionModel[]> {
    return this.http.get<ProsecModificacionModel[]>('assets/json/90305/lista-de-domicilios.json');
  }
  getPlantaComplementaria() : Observable<PLANTAS[]> {
    return this.http.get<PLANTAS[]>('assets/json/90305/plantas.json');
  }
  getMercancias(): Observable<MercanciasModel []> {
    return this.http.get<MercanciasModel []>('assets/json/90305/mercancias.json');
  } 
  getSector(): Observable<SectorModel []> {
    return this.http.get<SectorModel []>('assets/json/90305/sector.json')
  }
  getProductoIndirecto(): Observable<ProductorIndirecto []> {
    return this.http.get<ProductorIndirecto []>('assets/json/90305/prodIndirecto.json')
  }
  getBitacora(): Observable<BitacoraModel []> {
    return this.http.get<BitacoraModel []>('assets/json/90305/bitacora.json')
  }
  getModoficacionInfo(): Observable<ModificacionInfo > {
    return this.http.get<ModificacionInfo >('assets/json/90305/modificacionInfo.json')
  }
  getEstadoData(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('assets/json/90305/estado.json');
  }
  
}
