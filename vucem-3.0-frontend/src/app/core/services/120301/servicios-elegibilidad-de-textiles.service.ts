import { Injectable } from '@angular/core';
import {
  textileSolicitud,
  solicitante,
  datosDeLaSolicitud,
  datosParaMovilizacionNacional,
  tercerosRelacionados,
  pagoDeDerechos,
} from '../../models/120301/elegibilidad-de-textiles.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importa Observable

/**
 * Servicio para la gestión de solicitudes elegibilidad de textiles.
 * Este servicio proporciona métodos para configurar y enviar la información de la solicitud.
 * @module certificadoZoosanitario
 */
@Injectable({
  providedIn: 'root',
})
export class ServiciosElegibilidadDeTextilesService {

  /**
   * Objeto que contiene los datos de la solicitud..
   * @property {textileSolicitud} textileSolicitudCargaUtil - Datos de la solicitud que se enviarán.
   */
  public textileSolicitudCargaUtil: textileSolicitud = {
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
  setSoliciante(solicitante: solicitante) {
    this.textileSolicitudCargaUtil.solicitante = solicitante;
  }

  /**
   * Establece los datos de la solicitud.
   * @method setDatosDeLaSolicitud
   * @param {datosDeLaSolicitud} datosDeLaSolicitud - Los datos de la solicitud.
   */
  setDatosDeLaSolicitud(datosDeLaSolicitud: datosDeLaSolicitud) {
    this.textileSolicitudCargaUtil.datosDeLaSolicitud = datosDeLaSolicitud;
  }

  /**
   * Establece los datos para la movilización nacional.
   * @method setDatosParaMovilizacionNacional
   * @param {datosParaMovilizacionNacional} datosParaMovilizacionNacional - Los datos para la movilización nacional.
   */
  setDatosParaMovilizacionNacional(
    datosParaMovilizacionNacional: datosParaMovilizacionNacional
  ) {
    this.textileSolicitudCargaUtil.datosParaMovilizacionNacional =
      datosParaMovilizacionNacional;
  }

  /**
   * Establece la información de terceros relacionados.
   * @method setTercerosRelacionados
   * @param {tercerosRelacionados} tercerosRelacionados - La información de terceros relacionados.
   */
  setTercerosRelacionados(tercerosRelacionados: tercerosRelacionados) {
    this.textileSolicitudCargaUtil.tercerosRelacionados = tercerosRelacionados;
  }

  /**
   * Establece la información de pago de derechos.
   * @method setPagoDeDerechos
   * @param {pagoDeDerechos} pagoDeDerechos - La información de pago de derechos.
   */
  setPagoDeDerechos(pagoDeDerechos: pagoDeDerechos) {
    this.textileSolicitudCargaUtil.pagoDeDerechos = pagoDeDerechos;
  }

  /**
   * Envía la solicitud capturada.
   * @method textileSolicitudEnviar
   * @returns {Observable<any>} - Un Observable que emite la respuesta del servidor.
   */
  textileSolicitudEnviar(): Observable<any> { // Especifica el tipo de retorno Observable<any>
    const _url = 'http://localhost:3000/textileSolicitud';
    return this.http.post<any>(_url, this.textileSolicitudCargaUtil);
  }
}