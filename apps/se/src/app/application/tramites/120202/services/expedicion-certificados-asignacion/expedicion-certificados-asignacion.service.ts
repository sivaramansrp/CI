import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NumeroOficioAsignacionDetalleRespquesta } from '../../models/expedicion-certificados-asignacion.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class ExpedicionCertificadosAsignacionService {
/**
   * Constructor del servicio de catálogos.
   * @param http - Inyección del servicio HttpClient para realizar peticiones HTTP.
   * @description Este servicio se encarga de obtener los catálogos necesarios para el funcionamiento de la aplicación.
   */
  constructor(
    private http: HttpClient
  ) { 
    // Constructor vacío

  }

  getAniosAutorizacionCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/120202/anios-autorizacion-catalogo.json');
  }

  getNumeroOficioAsignacionDetalle(): Observable<NumeroOficioAsignacionDetalleRespquesta> {
    return this.http.get<NumeroOficioAsignacionDetalleRespquesta>('assets/json/120202/numero-oficio-asignacion-detalle.json');
  }
}
