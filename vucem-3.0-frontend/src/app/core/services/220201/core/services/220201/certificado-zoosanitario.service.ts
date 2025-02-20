import { Injectable } from '@angular/core';
import {
  capturarSolicitud,
  solicitante,
  datosDeLaSolicitud,
  datosParaMovilizacionNacional,
  tercerosRelacionados,
  pagoDeDerechos,
} from '../../../../../models/220201/capturar-solicitud.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio para la gestión de solicitudes de certificado zoosanitario.
 * Este servicio proporciona métodos para configurar y enviar la información de la solicitud.
 * @module certificadoZoosanitario
 */
@Injectable({
  providedIn: 'root',
})
export class CertificadoZoosanitarioServiceService {

  /**
   * Objeto para almacenar los datos de la solicitud.
   * @property {capturarSolicitud} capturarSolicitudCargaUtil - Datos de la solicitud que se enviarán.
   */
  public capturarSolicitudCargaUtil: CapturarSolicitud = {
    solicitante: undefined,
    datosDeLaSolicitud: undefined,
    datosParaMovilizacionNacional: undefined,
    tercerosRelacionados: undefined,
    pagoDeDerechos: undefined,
  };

  /**
   * Constructor del servicio.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private readonly http: HttpClient) { }

  /**
   * Establece la información del solicitante.
   * @method setSoliciante
   * @param {solicitante} solicitante - La información del solicitante.
   */
  setSoliciante(solicitante: Solicitante) {
    this.capturarSolicitudCargaUtil.solicitante = solicitante;
  }

  /**
   * Establece los datos de la solicitud.
   * @method setDatosDeLaSolicitud
   * @param {datosDeLaSolicitud} datosDeLaSolicitud - Los datos de la solicitud.
   */
  setDatosDeLaSolicitud(datosDeLaSolicitud: DatosDeLaSolicitud) {
    this.capturarSolicitudCargaUtil.datosDeLaSolicitud = datosDeLaSolicitud;
  }

  /**
   * Establece los datos para la movilización nacional.
   * @method setDatosParaMovilizacionNacional
   * @param {datosParaMovilizacionNacional} datosParaMovilizacionNacional - Los datos para la movilización nacional.
   */
  setDatosParaMovilizacionNacional(
    datosParaMovilizacionNacional: DatosParaMovilizacionNacional
  ) {
    this.capturarSolicitudCargaUtil.datosParaMovilizacionNacional =
      datosParaMovilizacionNacional;
  }

  /**
   * Establece la información de terceros relacionados.
   * @method setTercerosRelacionados
   * @param {tercerosRelacionados} tercerosRelacionados - La información de terceros relacionados.
   */
  setTercerosRelacionados(tercerosRelacionados: TercerosRelacionados) {
    this.capturarSolicitudCargaUtil.tercerosRelacionados = tercerosRelacionados;
  }

  /**
   * Establece la información de pago de derechos.
   * @method setPagoDeDerechos
   * @param {pagoDeDerechos} pagoDeDerechos - La información de pago de derechos.
   */
  setPagoDeDerechos(pagoDeDerechos: PagoDeDerechos) {
    this.capturarSolicitudCargaUtil.pagoDeDerechos = pagoDeDerechos;
  }

  /**
   * Envía la solicitud capturada.
   * @method capturarSolicitudEnviar  // Nombre en camelCase
   * @returns {Observable<any>} - Un Observable que emite la respuesta del servidor.
   */
  capturarSolicitudEnviar(): Observable<any> { // Nombre en camelCase
    const _url = 'http://localhost:3000/capturarSolicitud';
    return this.http.post<any>(_url, this.capturarSolicitudCargaUtil);
  }
}