import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movilizacion } from '../models/datos-generales.model';
import { Observable } from 'rxjs';
import { PagoDeDerechos } from '../models/pago-de-derechos.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Solicitud220501State } from '../estados/tramites220501.store';

/**
 * Servicio para gestionar las revisiones.
 */
@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - El cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de la aduana de ingreso.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la aduana de ingreso.
   */
  getAduanaIngreso() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/aduana-ingreso.json');
  }

  /**
   * Obtiene los datos de la oficina de inspección.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la oficina de inspección.
   */
  getOficianaInspeccion() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/oficiana-de-inspeccion.json');
  }

  /**
   * Obtiene los datos del punto de inspección.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos del punto de inspección.
   */
  getPuntoInspeccion() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/punto-de-inspeccion.json');
  }

  /**
   * Obtiene los datos del establecimiento.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos del establecimiento.
   */
  getEstablecimiento() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/establecimiento.json');
  }

  /**
   * Obtiene los datos del régimen al que se destinarán las mercancías.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos del régimen.
   */
  getRegimenDestinaran() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/regimen-destinaran.json');
  }

  /**
   * Obtiene los datos de la movilización nacional.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la movilización nacional.
   */
  getMovilizacionNacional() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/movilizacion-nacional.json');
  }

  /**
   * Obtiene los datos del punto de verificación.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos del punto de verificación.
   */
  getPuntoVerificacion() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/punto-verificacion.json');
  }

  /**
   * Obtiene los datos de la empresa transportista.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la empresa transportista.
   */
  getEmpresaTransportista() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/empresa-transportista.json');
  }

  /**
   * Obtiene los datos de la justificación.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la justificación.
   */
  getJustificacion() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/justificacion.json');
  }

  /**
   * Obtiene los datos del banco.
   * 
   * @returns {Observable<RespuestaCatalogos>} - Los datos del banco.
   */
  getBanco() {
    return this.http.get<RespuestaCatalogos>('assets/json/220501/banco.json');
  }

  /** 
   * Servicio para obtener datos relacionados con la solicitud. 
   */
  getPagoDeDerechos(): Observable<PagoDeDerechos> {
    /** Obtiene la información del pago de derechos desde un archivo JSON. */
    return this.http.get<PagoDeDerechos>('assets/json/220501/pago-de-derechos.json');
  }

  /** 
   * Servicio para obtener los datos generales de la solicitud. 
   */
  getDatosDelaSolicitud(): Observable<Solicitud220501State> {
    /** Obtiene los datos de la solicitud desde un archivo JSON. */
    return this.http.get<Solicitud220501State>('assets/json/220501/datos-dela-solicitud.json');
  }

  /** 
   * Servicio para obtener los datos de movilización. 
   */
  getMovilizacion(): Observable<Movilizacion> {
    /** Obtiene los datos de la movilización desde un archivo JSON. */
    return this.http.get<Movilizacion>('assets/json/220501/movilizacion.json');
  }
}