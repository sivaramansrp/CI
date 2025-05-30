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
  /**
   * Constructor del servicio.
   * @param zoosanitarioStore Store para el manejo del estado zoosanitario.
   * @param seccionStore Store para el manejo de secciones.
   */
  constructor(private readonly zoosanitarioStore: ZoosanitarioStore, private readonly seccionStore: SeccionLibStore) {
    // Constructor logic can be added here if needed
  }

  /**
   * Actualiza la información del solicitante en el store.
   * @param solicitante Datos del solicitante.
   */
  updateSolicitante(solicitante: Solicitante): void {
    this.zoosanitarioStore.actualizarSolicitante(solicitante);
  }

  /**
   * Actualiza los datos de la solicitud en el store.
   * @param datosDeLaSolicitud Datos de la solicitud.
   */
  updateDatosDeLaSolicitud(datosDeLaSolicitud: DatosDeLaSolicitud): void {
    this.zoosanitarioStore.actualizarDatosDeLaSolicitud(datosDeLaSolicitud);
  }

  /**
   * Actualiza los datos para movilización nacional en el store.
   * @param datosParaMovilizacionNacional Datos para movilización nacional.
   */
  updateDatosParaMovilizacionNacional(datosParaMovilizacionNacional: DatosParaMovilizacionNacional): void {
    this.zoosanitarioStore.actualizarDatosParaMovilizacionNacional(datosParaMovilizacionNacional);
  }

  /**
   * Actualiza los terceros relacionados en el store.
   * @param tercerosRelacionados Lista de terceros relacionados.
   */
  updateTercerosRelacionados(tercerosRelacionados: PersonaTerceros[]): void {
    this.zoosanitarioStore.actualizarTercerosRelacionados(tercerosRelacionados);
  }

  /**
   * Actualiza la validación de envío en el store.
   * @param validarEnvio Objeto de validación de envío.
   */
  updateValidarEnvio(validarEnvio: ValidarEnvio): void {
    this.zoosanitarioStore.actualizarformaValidas(validarEnvio);
  }

  /**
   * Actualiza la información de pago de derechos en el store.
   * @param pagoDeDerechos Datos de pago de derechos.
   */
  updatePagoDeDerechos(pagoDeDerechos: PagoDeDerechos): void {
    this.zoosanitarioStore.actualizarPagoDeDerechos(pagoDeDerechos);
  }

  /**
   * Limpia el formulario en el store.
   */
  limpiarFormulario(): void {
    this.zoosanitarioStore.limpiarFormulario();
  }

  /**
   * Obtiene los datos de la solicitud como observable.
   * @returns Observable con los datos de la solicitud.
   */
  getDatosDeLaSolicitud(): Observable<DatosDeLaSolicitud> {
    return this.zoosanitarioStore._select(state => state.datosDeLaSolicitud);
  }

  /**
   * Obtiene los datos para movilización nacional como observable.
   * @returns Observable con los datos para movilización nacional.
   */
  getDatosParaMovilizacionNacional(): Observable<DatosParaMovilizacionNacional> {
    return this.zoosanitarioStore._select(state => state.datosParaMovilizacionNacional);
  }

  /**
   * Obtiene los datos de pago de derechos como observable.
   * @returns Observable con los datos de pago de derechos.
   */
  getPagoDeDerechos(): Observable<PagoDeDerechos> {
    return this.zoosanitarioStore._select(state => state.pagoDeDerechos);
  }

  /**
   * Obtiene la validación de envío como observable.
   * @returns Observable con la validación de envío.
   */
  getValidarEnvio(): Observable<ValidarEnvio> {
    return this.zoosanitarioStore._select(state => state.validarEnvio);
  }

  /**
   * Obtiene todos los datos del formulario como observable.
   * @returns Observable con todos los datos del formulario.
   */
  getFormData(): Observable<CapturarSolicitud> {
    return this.zoosanitarioStore._select(state => state);
  }

  /**
   * Actualiza el estado de la forma válida y actualiza el store de secciones.
   * @param updatedFormaValida Objeto con los estados de validez de las formas.
   */
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

  /**
   * Verifica si todos los formularios son válidos.
   * @returns Observable que emite true si todos los formularios son válidos, false en caso contrario.
   */
  obtenerTodosLosStatus(): Observable<boolean> {
    return this.zoosanitarioStore._select(state => state.validarEnvio).pipe(
      map((formaValida: ValidarEnvio) => {
        return Object.values(formaValida).every(value => value === true);
      })
    );
  }
}