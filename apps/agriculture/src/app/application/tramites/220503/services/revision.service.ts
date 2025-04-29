import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movilizacion } from '../models/datos-generales.model';
import { Observable } from 'rxjs';
import { PagoDeDerechos } from '../models/pago-de-derechos.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Solicitud220503State } from '../estados/tramites220503.store';

/**
 * Servicio para gestionar las revisiones.
 */
@Injectable({
  providedIn: 'root',
})
export class RevisionService {
  /**
   * Constructor del servicio.
   *
   * @param {HttpClient} http - El cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos de la aduana de ingreso.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la aduana de ingreso.
   */
  getAduanaIngreso(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220503/aduana-ingreso.json'
    );
  }

  /**
   * Obtiene los datos de la oficina de inspección.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la oficina de inspección.
   */
  getOficianaInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220503/oficiana-de-inspeccion.json'
    );
  }

  /**
   * Obtiene los datos del punto de inspección.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos del punto de inspección.
   */
  getPuntoInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220503/punto-de-inspeccion.json'
    );
  }

  /**
   * Obtiene los datos del establecimiento.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos del establecimiento.
   */
  getEstablecimiento(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220503/establecimiento.json'
    );
  }

  /**
   * Obtiene los datos del régimen al que se destinarán las mercancías.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos del régimen.
   */
  getRegimenDestinaran(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220503/regimen-destinaran.json'
    );
  }

  /**
   * Obtiene los datos de la movilización nacional.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la movilización nacional.
   */
  getMovilizacionNacional(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220503/movilizacion-nacional.json'
    );
  }

  /**
   * Obtiene los datos del punto de verificación.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos del punto de verificación.
   */
  getPuntoVerificacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220503/punto-verificacion.json'
    );
  }

  /**
   * Obtiene los datos de la empresa transportista.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la empresa transportista.
   */
  getEmpresaTransportista(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220503/empresa-transportista.json'
    );
  }

  /**
   * Obtiene los datos de la justificación.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la justificación.
   */
  getJustificacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220503/justificacion.json'
    );
  }

  /**
   * Obtiene los datos del banco.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos del banco.
   */
  getBanco(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/220503/banco.json');
  }

  /**
   * Servicio para obtener datos relacionados con la solicitud.
   */
  getPagoDeDerechos(): Observable<PagoDeDerechos> {
    /** Obtiene la información del pago de derechos desde un archivo JSON. */
    return this.http.get<PagoDeDerechos>(
      'assets/json/220503/pago-de-derechos.json'
    );
  }

  /**
   * Servicio para obtener los datos generales de la solicitud.
   */
  getDatosDelaSolicitud(): Observable<Solicitud220503State> {
    /** Obtiene los datos de la solicitud desde un archivo JSON. */
    return this.http.get<Solicitud220503State>(
      'assets/json/220503/datos-dela-solicitud.json'
    );
  }

  /**
   * Servicio para obtener los datos de movilización.
   */
  getMovilizacion(): Observable<Movilizacion> {
    /** Obtiene los datos de la movilización desde un archivo JSON. */
    return this.http.get<Movilizacion>('assets/json/220503/movilizacion.json');
  }
}
