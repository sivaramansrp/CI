

import {
  CapturarSolicitud,
  DatosDeLaSolicitud,
  DatosParaMovilizacionNacional,
  PagoDeDerechos,
  Solicitante,
  TercerosRelacionados,
} from '../../models/220201/capturar-solicitud.model';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store'
/**
 * Servicio para la gestión de solicitudes de certificado zoosanitario.
 * Este servicio proporciona métodos para configurar y enviar la información de la solicitud.
 * @module certificadoZoosanitario
 */
@Injectable({
  providedIn: 'root',
})
export class CertificadoZoosanitarioServiceService {
  constructor(private readonly zoosanitarioStore: ZoosanitarioStore) {
    console.log('CertificadoZoosanitarioServiceService');
  }
  updateSolicitante(solicitante: Solicitante): void {
    this.zoosanitarioStore.actualizarSolicitante(solicitante);
  }

  updateDatosDeLaSolicitud(datosDeLaSolicitud: DatosDeLaSolicitud): void {
    this.zoosanitarioStore.actualizarDatosDeLaSolicitud(datosDeLaSolicitud);
  }

  updateDatosParaMovilizacionNacional(datosParaMovilizacionNacional: DatosParaMovilizacionNacional): void {
    this.zoosanitarioStore.actualizarDatosParaMovilizacionNacional(datosParaMovilizacionNacional);
  }

  updateTercerosRelacionados(tercerosRelacionados: TercerosRelacionados): void {
    this.zoosanitarioStore.actualizarTercerosRelacionados(tercerosRelacionados);
  }

  updatePagoDeDerechos(pagoDeDerechos: PagoDeDerechos): void {
    this.zoosanitarioStore.actualizarPagoDeDerechos(pagoDeDerechos);
  }

  limpiarFormulario(): void {
    this.zoosanitarioStore.limpiarFormulario();
  }

  getSolicitante(): Observable<Solicitante> {
    return this.zoosanitarioStore._select(state => state.solicitante); // Use _select for observable
  }

  getDatosDeLaSolicitud(): Observable<DatosDeLaSolicitud> {
    return this.zoosanitarioStore._select(state => state.datosDeLaSolicitud);
  }

  getDatosParaMovilizacionNacional(): Observable<DatosParaMovilizacionNacional> {
    return this.zoosanitarioStore._select(state => state.datosParaMovilizacionNacional);
  }

  getTercerosRelacionados(): Observable<TercerosRelacionados> {
    return this.zoosanitarioStore._select(state => state.tercerosRelacionados);
  }

  getPagoDeDerechos(): Observable<PagoDeDerechos> {
    return this.zoosanitarioStore._select(state => state.pagoDeDerechos);
  }

  getFormData(): Observable<CapturarSolicitud> {
    return this.zoosanitarioStore._select(state => state);
  }

}