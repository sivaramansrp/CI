import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';
import { Tramite230202Store } from '../estados/tramite230202.store';
import { RespuestaDetalle, RespuestaSolicitud } from '../models/datos-tramite.model';

@Injectable({
  providedIn: 'root'
})
export class PhytosanitaryReexportacionService {

  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes a recursos externos.
   * @param store Store de Akita para gestionar el estado del trámite.
   */
  constructor(private http: HttpClient, private store: Tramite230202Store) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  
  getNumeroDeCertificado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/numeroDeCertificado.json');
  }

  getAduana(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/aduanaIngresara.json');
  }

  getPais() {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/pais.json');
  }

  getEntidades() {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/entidades.json');
  }

  getDescripcionProducto(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/descripcionProducto.json');
  }

  agregarSolicitud(): Observable<RespuestaSolicitud> {
    return this.http.get<RespuestaSolicitud>(`assets/json/230202/solicitudDatos.json`);
  }

  agregarDetalle(): Observable<RespuestaDetalle> {
    return this.http.get<RespuestaDetalle>(`assets/json/230202/detalleDatos.json`);
  }

  getFraccionArancelaria(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/fraccionArancelaria.json');
  }

  getGenero(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/genero.json');
  }

  getEspecie(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/especie.json');
  }

  getNombreComun(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/nombreComun.json');
  }

  getUnidadDeMedida(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/unidadDeMedida.json');
  }

  getMedioDeTransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/medioDeTransporte.json');
  }

  getEstado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/estado.json');
  }
}
