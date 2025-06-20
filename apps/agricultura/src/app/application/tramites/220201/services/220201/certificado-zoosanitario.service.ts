import {
  CapturarSolicitud,
  DatosDeLaSolicitud,
  DatosParaMovilizacionNacional,
  PagoDeDerechos,
  Solicitante,
  ValidarEnvio,
} from '../../models/220201/capturar-solicitud.model';

import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';

import { PersonaTerceros, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio para la gestión de solicitudes del certificado zoosanitario.
 * Este servicio permite actualizar y obtener información relacionada con el proceso de captura
 * de la solicitud, incluyendo datos del solicitante, movilización, terceros relacionados, pagos, y validaciones.
 * 
 * @export
 * @class CertificadoZoosanitarioServiceService
 */
@Injectable({
  providedIn: 'root',
})
export class CertificadoZoosanitarioServiceService {
  /**
   * Inicializa una nueva instancia del servicio.
   *
   * @param {ZoosanitarioStore} zoosanitarioStore Store para el estado zoosanitario.
   * @param {SeccionLibStore} seccionStore Store para el estado de secciones y validez de formularios.
   */
  constructor(
    private readonly zoosanitarioStore: ZoosanitarioStore,
    private readonly seccionStore: SeccionLibStore,
    private readonly http: HttpClient
  ) {}

  /**
   * Actualiza los datos del solicitante en el store.
   *
   * @param {Solicitante} solicitante Datos del solicitante.
   * @memberof CertificadoZoosanitarioServiceService
   */
  updateSolicitante(solicitante: Solicitante): void {
    this.zoosanitarioStore.actualizarSolicitante(solicitante);
  }

  /**
   * Actualiza los datos de la solicitud en el store.
   *
   * @param {DatosDeLaSolicitud} datosDeLaSolicitud Datos generales de la solicitud.
   * @memberof CertificadoZoosanitarioServiceService
   */
  updateDatosDeLaSolicitud(datosDeLaSolicitud: DatosDeLaSolicitud): void {
    this.zoosanitarioStore.actualizarDatosDeLaSolicitud(datosDeLaSolicitud);
  }

  /**
   * Actualiza los datos para la movilización nacional en el store.
   *
   * @param {DatosParaMovilizacionNacional} datosParaMovilizacionNacional Datos de movilización.
   * @memberof CertificadoZoosanitarioServiceService
   */
  updateDatosParaMovilizacionNacional(datosParaMovilizacionNacional: DatosParaMovilizacionNacional): void {
    this.zoosanitarioStore.actualizarDatosParaMovilizacionNacional(datosParaMovilizacionNacional);
  }

  /**
   * Actualiza la lista de terceros relacionados con la solicitud.
   *
   * @param {PersonaTerceros[]} tercerosRelacionados Lista de terceros.
   * @memberof CertificadoZoosanitarioServiceService
   */
  updateTercerosRelacionados(tercerosRelacionados: PersonaTerceros[]): void {
    this.zoosanitarioStore.actualizarTercerosRelacionados(tercerosRelacionados);
  }

  

  /**
   * Actualiza los estados de validación del formulario en el store.
   *
   * @param {ValidarEnvio} validarEnvio Objeto con estados de validación por sección.
   * @memberof CertificadoZoosanitarioServiceService
   */
  updateValidarEnvio(validarEnvio: ValidarEnvio): void {
    this.zoosanitarioStore.actualizarformaValidas(validarEnvio);
  }

  /**
   * Actualiza los datos relacionados con el pago de derechos.
   *
   * @param {PagoDeDerechos} pagoDeDerechos Datos del pago.
   * @memberof CertificadoZoosanitarioServiceService
   */
  updatePagoDeDerechos(pagoDeDerechos: PagoDeDerechos): void {
    this.zoosanitarioStore.actualizarPagoDeDerechos(pagoDeDerechos);
  }

  /**
   * Limpia toda la información del formulario almacenada en el store.
   *
   * @memberof CertificadoZoosanitarioServiceService
   */
  limpiarFormulario(): void {
    this.zoosanitarioStore.limpiarFormulario();
  }

  /**
   * Obtiene los datos de la solicitud.
   *
   * @returns {Observable<DatosDeLaSolicitud>} Observable con los datos de la solicitud.
   * @memberof CertificadoZoosanitarioServiceService
   */
  getDatosDeLaSolicitud(): Observable<DatosDeLaSolicitud> {
    return this.zoosanitarioStore._select(state => state.datosDeLaSolicitud);
  }

  /**
   * Obtiene los datos para movilización nacional.
   *
   * @returns {Observable<DatosParaMovilizacionNacional>} Observable con los datos de movilización.
   * @memberof CertificadoZoosanitarioServiceService
   */
  getDatosParaMovilizacionNacional(): Observable<DatosParaMovilizacionNacional> {
    return this.zoosanitarioStore._select(state => state.datosParaMovilizacionNacional);
  }

  /**
   * Obtiene los datos del pago de derechos.
   *
   * @returns {Observable<PagoDeDerechos>} Observable con los datos del pago.
   * @memberof CertificadoZoosanitarioServiceService
   */
  getPagoDeDerechos(): Observable<PagoDeDerechos> {
    return this.zoosanitarioStore._select(state => state.pagoDeDerechos);
  }

  /**
   * Obtiene el estado de validación de envío de formularios.
   *
   * @returns {Observable<ValidarEnvio>} Observable con el estado de validación.
   * @memberof CertificadoZoosanitarioServiceService
   */
  getValidarEnvio(): Observable<ValidarEnvio> {
    return this.zoosanitarioStore._select(state => state.validarEnvio);
  }

  /**
   * Obtiene todos los datos actuales del formulario.
   *
   * @returns {Observable<CapturarSolicitud>} Observable con toda la información de la solicitud.
   * @memberof CertificadoZoosanitarioServiceService
   */
  getFormData(): Observable<CapturarSolicitud> {
    return this.zoosanitarioStore._select(state => state);
  }

  /**
   * Actualiza el estado de validez de los formularios y sincroniza con el store de secciones.
   *
   * @param {{ [key: string]: boolean }} updatedFormaValida Mapa de secciones con su validez.
   * @memberof CertificadoZoosanitarioServiceService
   */
  actualizarFormaValida(updatedFormaValida: { [key: string]: boolean }): void {
    this.zoosanitarioStore.actualizarformaValida(updatedFormaValida);
    this.obtenerTodosLosStatus().subscribe((result: boolean) => {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([result]);
    });
  }

  /**
   * Verifica si todas las secciones del formulario son válidas.
   *
   * @returns {Observable<boolean>} Observable que emite `true` si todos los formularios son válidos.
   * @memberof CertificadoZoosanitarioServiceService
   */
  obtenerTodosLosStatus(): Observable<boolean> {
    return this.zoosanitarioStore._select(state => state.validarEnvio).pipe(
      map((formaValida: ValidarEnvio) =>
        Object.values(formaValida).every(value => value === true)
      )
    );
  }
   /**
     * @method guardarDatosFormulario
     * @description Almacena los datos del formulario en el estado correspondiente.
     * Actualiza los datos de pago de derechos, datos de la solicitud, datos para movilización nacional y terceros relacionados,
     * utilizando la información proporcionada en el objeto `datos`.
     * 
     * @param {ApiSolicitud} datos - Objeto que contiene la información de la solicitud a almacenar.
     * 
     * @memberof CertificadoZoosanitarioService
     */
    public guardarDatosFormulario(): Observable<CapturarSolicitud> {
      return this.http.get<CapturarSolicitud>('assets/json/220201/capturarSolicitud.json');
    }
    /**
     * @method storeDatosFormulario
     * @description Almacena los datos del formulario en el estado correspondiente.
     * Actualiza los datos de pago de derechos, datos de la solicitud, datos para movilización nacional y terceros relacionados,
     * utilizando la información proporcionada en el objeto `datos`.
     * 
     * @param {ApiSolicitud} datos - Objeto que contiene la información de la solicitud a almacenar.
     * 
     * @memberof CertificadoZoosanitarioService
     */
    public storeDatosFormulario(datos: CapturarSolicitud): void {
   this.updatePagoDeDerechos(datos?.pagoDeDerechos || {} as PagoDeDerechos);
   this.updateDatosDeLaSolicitud(datos?.datosDeLaSolicitud || {} as DatosDeLaSolicitud);
   this.updateDatosParaMovilizacionNacional(datos?.datosParaMovilizacionNacional || {} as DatosDeLaSolicitud);
   this.updateTercerosRelacionados(datos?.tercerosRelacionados || {} as PersonaTerceros[] );
   this.updateValidarEnvio(datos?.validarEnvio || {} as ValidarEnvio);
    }
}
