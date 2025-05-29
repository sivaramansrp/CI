

import {
  CapturarSolicitud,
  DatosDeLaSolicitud,
  DatosParaMovilizacionNacional,
  PagoDeDerechos,
  Solicitante,
  ValidarEnvio,
} from '../../models/220201/capturar-solicitud.model';

import { Injectable } from '@angular/core';

import { Observable, map, } from 'rxjs';

import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store'

import { PersonaTerceros, SeccionLibStore } from '@libs/shared/data-access-user/src';
/**
 * Servicio para la gestión de solicitudes de certificado zoosanitario.
 * Este servicio proporciona métodos para configurar y enviar la información de la solicitud.
 * @module certificadoZoosanitario
 */
@Injectable({
  providedIn: 'root',
})
export class CertificadoZoosanitarioServiceService {
  constructor(private readonly zoosanitarioStore: ZoosanitarioStore, private readonly seccionStore: SeccionLibStore) {
    // Constructor logic can be added here if needed
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

  updateTercerosRelacionados(tercerosRelacionados: PersonaTerceros[]): void {
    this.zoosanitarioStore.actualizarTercerosRelacionados(tercerosRelacionados);
  }

  updatePagoDeDerechos(pagoDeDerechos: PagoDeDerechos): void {
    this.zoosanitarioStore.actualizarPagoDeDerechos(pagoDeDerechos);
  }

  limpiarFormulario(): void {
    this.zoosanitarioStore.limpiarFormulario();
  }

  getDatosDeLaSolicitud(): Observable<DatosDeLaSolicitud> {
    return this.zoosanitarioStore._select(state => state.datosDeLaSolicitud);
  }

  getDatosParaMovilizacionNacional(): Observable<DatosParaMovilizacionNacional> {
    return this.zoosanitarioStore._select(state => state.datosParaMovilizacionNacional);
  }

  getPagoDeDerechos(): Observable<PagoDeDerechos> {
    return this.zoosanitarioStore._select(state => state.pagoDeDerechos);
  }
  getValidarEnvio(): Observable<ValidarEnvio> {
    return this.zoosanitarioStore._select(state => state.validarEnvio);
  }

  getFormData(): Observable<CapturarSolicitud> {
    return this.zoosanitarioStore._select(state => state);
  }

  actualizarFormaValida(updatedFormaValida: { [key: string]: boolean }): void {
    this.zoosanitarioStore.actualizarformaValida(updatedFormaValida);
    this.obtenerTodosLosStatus().subscribe((result: boolean) => {
      if (result) {
        this.seccionStore.establecerSeccion([true]);
        this.seccionStore.establecerFormaValida([true]);
      } else {
        this.seccionStore.establecerSeccion([true]);
        this.seccionStore.establecerFormaValida([false]);
      }
    });
  }

  obtenerTodosLosStatus(): Observable<boolean> {
    return this.zoosanitarioStore._select(state => state.validarEnvio).pipe(
      map((formaValida: ValidarEnvio) => {
        return Object.values(formaValida).every(value => value === true);
      })
    );
  }



}