import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { catalogoResponse } from '@ng-mf/data-access-user';

import { Observable } from 'rxjs';

import { BitacoraModel , MercanciasModel , ModificacionInfo , PLANTAS, ProductorIndirecto , ProsecModificacionModel , SectorModel } from '../models/prosec-modificacion.model';


@Injectable({
  providedIn: 'root'
})
export class ProsecModificacionServiceTsService {

  constructor(private http: HttpClient) {
    //constructor
   }
  getListaDomicilios() {
    return this.http.get<ProsecModificacionModel[]>('assets/json/90305/lista-de-domicilios.json');
  }
  getPlantaComplementaria() {
    return this.http.get<PLANTAS[]>('assets/json/90305/plantas.json');
  }
  getMercancias(){
    return this.http.get<MercanciasModel []>('assets/json/90305/mercancias.json');
  } 
  getSector(){
    return this.http.get<SectorModel []>('assets/json/90305/sector.json')
  }
  getProductoIndirecto(){
    return this.http.get<ProductorIndirecto []>('assets/json/90305/prodIndirecto.json')
  }
  getBitacora(){
    return this.http.get<BitacoraModel []>('assets/json/90305/bitacora.json')
  }
  getModoficacionInfo(){
    return this.http.get<ModificacionInfo >('assets/json/90305/modificacionInfo.json')
  }
  getEstadoData(): Observable<catalogoResponse[]> {
    return this.http.get<catalogoResponse[]>('assets/json/90305/estado.json');
  }
  
}
