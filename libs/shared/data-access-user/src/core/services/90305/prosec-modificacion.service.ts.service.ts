import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BITACORA_MODEL, MERCANCIAS_MODEL, MODIFICACAION_INFO, PLANTAS, PRODUCTOR_INDIRECTO, PROSEC_MODIFICATION_MODEL, SECTOR_MODEL } from '../../models/90305/prosec-modificacion.model';

@Injectable({
  providedIn: 'root'
})
export class ProsecModificacionServiceTsService {

  constructor(private http: HttpClient) { }
  getListaDomicilios() {
    return this.http.get<PROSEC_MODIFICATION_MODEL[]>('assets/json/90305/lista-de-domicilios.json');
  }
  getPlantaComplementaria() {
    return this.http.get<PLANTAS[]>('assets/json/90305/plantas.json');
  }
  getMercancias(){
    return this.http.get<MERCANCIAS_MODEL[]>('assets/json/90305/mercancias.json');
  } 
  getSector(){
    return this.http.get<SECTOR_MODEL[]>('assets/json/90305/sector.json')
  }
  getProductoIndirecto(){
    return this.http.get<PRODUCTOR_INDIRECTO[]>('assets/json/90305/prodIndirecto.json')
  }
  getBitacora(){
    return this.http.get<BITACORA_MODEL[]>('assets/json/90305/bitacora.json')
  }
  getModoficacionInfo(){
    return this.http.get<MODIFICACAION_INFO>('assets/json/90305/modificacionInfo.json')
  }
}
