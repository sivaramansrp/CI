import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {

  constructor( private http: HttpClient) { }

  getAduanaIngreso() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/aduana-ingreso.json');
  }

  getOficianaInspeccion() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/oficiana-de-inspeccion.json');
  }

  getPuntoInspeccion() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/punto-de-inspeccion.json');
  }

  getEstablecimiento() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/establecimiento.json');
  }

  getRegimenDestinaran() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/regimen-destinaran.json');
  }

  getMovilizacionNacional() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/movilizacion-nacional.json');
  }
	getPuntoVerificacion() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/punto-verificacion.json');
  }
  
  getEmpresaTransportista() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/empresa-transportista.json');
  }  
  
  getJustificacion() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/justificacion.json');
  }

  getBanco() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/banco.json');
  }
}
