import { MetaInfo, Respuesta, RespuestaDetalle, RespuestaSolicitud } from '../models/datos-tramite.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Tramite230201Store } from '../estados/tramite230201.store';

@Injectable({
  providedIn: 'root'
})
export class PhytosanitaryExportacionService {

  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes a recursos externos.
   * @param store Store de Akita para gestionar el estado del trámite.
   */
  constructor(private http: HttpClient, private store: Tramite230201Store) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  
  getPaisDeProcedencia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/paisDeProcedencia.json');
  }

  getAduana(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/aduanaIngresara.json');
  }

  getPais(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/pais.json');
  }

  getMetaInfo(): Observable<Respuesta<MetaInfo>> {
    return this.http.get<Respuesta<MetaInfo>>('assets/json/230201/solicitudDatosInfo.json');
  }

  getEntidades(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/entidades.json');
  }

  getDescripcionProducto(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/descripcionProducto.json');
  }

  agregarSolicitud(): Observable<RespuestaSolicitud> {
    return this.http.get<RespuestaSolicitud>(`assets/json/230201/solicitudDatos.json`);
  }

  agregarDetalle(): Observable<RespuestaDetalle> {
    return this.http.get<RespuestaDetalle>(`assets/json/230201/detalleDatos.json`);
  }

  getFraccionArancelaria(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/fraccionArancelaria.json');
  }

  getGenero(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/genero.json');
  }

  getEspecie(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/especie.json');
  }

  getNombreComun(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/nombreComun.json');
  }

  getUnidadDeMedida(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/unidadDeMedida.json');
  }

  getMedioDeTransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/medioDeTransporte.json');
  }

  getEstado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230201/estado.json');
  }
}
