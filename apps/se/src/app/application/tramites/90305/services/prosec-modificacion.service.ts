import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CatalogoResponse } from '@ng-mf/data-access-user';

import { Observable } from 'rxjs';

import { BitacoraModel , MercanciasModel , ModificacionInfo , PLANTAS, ProductorIndirecto , ProsecModificacionModel , SectorModel } from '../models/prosec-modificacion.model';
import { Tramite90305State, Tramite90305Store } from '../estados/tramite90305.store';


@Injectable({
  providedIn: 'root'
})
export class ProsecModificacionServiceTsService {

  constructor(private http: HttpClient, private tramite90305Store: Tramite90305Store,) {
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

   actualizarEstadoFormulario(DATOS: Tramite90305State): void {
    if(DATOS.selectedEstado){
    this.tramite90305Store.setSelectedEstado(DATOS.selectedEstado);
    }
  }

  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite90305State> {
    return this.http.get<Tramite90305State>('assets/json/90305/registro_toma_muestras_mercancias.json');
  }
  
}

