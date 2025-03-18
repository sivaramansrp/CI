import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient) {}

  getTratado() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/tratado.json');
  }
  getPais() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/pais.json');
  }
  getIdioma() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/idioma.json');
  }
  getPaisDestino() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/pais.json');
  }
  getTransporte() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/pais.json');
  }
  getEntidad() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/entidad.json');
  }
  getRepresentacion() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/entidad.json');
  }
  getTipoFactura() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/tipofactura.json');
  }
  getUMC() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/umc.json');
  }
  getUnidadMedida() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/umc.json');
  }
}
