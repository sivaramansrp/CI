/**
 * @fileoverview
 * This file contains the adapter service for converting between Akita state and API payload formats
 * for the trámite 140105 - Desistimiento de Permiso.
 */
import { Injectable } from '@angular/core';

import { DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO, DEFAULT_TRAMITE_ID } from '../constants/adapter.constants';
import type { Cancelacion } from '../models/cancelacion-de-solicitus.model';
import type { DesistimientoDePermisoState } from '../estados/desistimiento-de-permiso.store';

/**
 * Interface representing the API payload structure for trámite 140105
 * Based on backend team specification + current API validation requirements
 */
export interface AmpliacionServiciosPayload {
  idTramite: string;
  motivoCancelacion: string;
  numeroFolioTramiteCancelados: Array<{
    idResolucion: string;
    numeroResolucion: string;
    regimen: string;
    clasificacionRegimen: string;
    condicionMercancia: string;
    fraccionArancelaria: string;
    unidadMedida: string;
    cantidadImportarExportar: string;
    vigenciaResolucion: string;
    valorAutorizado: string;
    inicioResolucion: string;
    numFolioTramite: string;
    valorSolicitado: string;
    cantidadImportarExportarSolicitada: string;
    general: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class AmpliacionServiciosAdapter {
  /**
   * Creates a numeroFolioTramiteCancelado item from state data with fallback to defaults
   * @param dato Single Cancelacion item from state
   * @param idTipoTramite Tramite ID for numFolioTramite fallback
   * @returns Formatted numeroFolioTramiteCancelado item
   */
  private static createNumeroFolioTramiteItem(dato: Partial<Cancelacion>, idTipoTramite?: number): {
    idResolucion: string;
    numeroResolucion: string;
    regimen: string;
    clasificacionRegimen: string;
    condicionMercancia: string;
    fraccionArancelaria: string;
    unidadMedida: string;
    cantidadImportarExportar: string;
    vigenciaResolucion: string;
    valorAutorizado: string;
    inicioResolucion: string;
    numFolioTramite: string;
    valorSolicitado: string;
    cantidadImportarExportarSolicitada: string;
    general: string;
  } {
    return {
      idResolucion: dato.idResolucion || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.idResolucion,
      numeroResolucion: dato.numeroResolucion || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.numeroResolucion,
      regimen: dato.regimen || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.regimen,
      clasificacionRegimen: dato.clasificacionRegimen || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.clasificacionRegimen,
      condicionMercancia: dato.condicionDeLaMercancia || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.condicionMercancia,
      fraccionArancelaria: dato.fraccionArancelaria || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.fraccionArancelaria,
      unidadMedida: dato.umt || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.unidadMedida,
      cantidadImportarExportar: dato.cantidadImportarExportar || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.cantidadImportarExportar,
      vigenciaResolucion: dato.vigenciaResolucion || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.vigenciaResolucion,
      valorAutorizado: dato.valorAutorizado || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.valorAutorizado,
      inicioResolucion: dato.inicioResolucion || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.inicioResolucion,
      numFolioTramite: dato.folioTramite || idTipoTramite?.toString() || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.numFolioTramite,
      valorSolicitado: dato.valorSolicitado || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.valorSolicitado,
      cantidadImportarExportarSolicitada: dato.cantidadImportarExportarSolicitada || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.cantidadImportarExportarSolicitada,
      general: dato.general || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.general
    };
  }

  /**
   * Converts from Akita state to API payload format using backend team specification
   * Clean implementation matching backend team requirements
   * @param state The current Akita state
   * @returns Formatted payload for API
   */
  static toFormPayload(state: DesistimientoDePermisoState): AmpliacionServiciosPayload {
    // Map datos array from state to numeroFolioTramiteCancelados format
    const NUMERO_FOLIO_TRAMITE_CANCELADOS = state.datos.map(dato => 
      AmpliacionServiciosAdapter.createNumeroFolioTramiteItem(dato, state.idTipoTramite)
    );

    return {
      idTramite: state.idTipoTramite?.toString() || DEFAULT_TRAMITE_ID,
      motivoCancelacion: state.motivoCancelacion || "",
      numeroFolioTramiteCancelados: NUMERO_FOLIO_TRAMITE_CANCELADOS.length > 0 ? NUMERO_FOLIO_TRAMITE_CANCELADOS : [
        AmpliacionServiciosAdapter.createNumeroFolioTramiteItem({}, state.idTipoTramite)
      ],
    };
  }

  /**
   * Maps API response back to Akita state format
   * @param payload The API response payload
   * @returns Formatted state object
   */
  static toState(payload: AmpliacionServiciosPayload): Partial<DesistimientoDePermisoState> {
    // Map numeroFolioTramiteCancelados back to datos array
    const DATOS = payload.numeroFolioTramiteCancelados.map(item => ({
      folioTramite: item.numFolioTramite,
      tipoDeSolicitud: "",
      regimen: item.regimen,
      cdr: "",
      condicionDeLaMercancia: item.condicionMercancia,
      fraccionArancelaria: item.fraccionArancelaria,
      umt: item.unidadMedida,
      cantidad: item.cantidadImportarExportar,
      usd: item.valorAutorizado,
      idResolucion: item.idResolucion,
      numeroResolucion: item.numeroResolucion,
      clasificacionRegimen: item.clasificacionRegimen,
      vigenciaResolucion: item.vigenciaResolucion,
      valorAutorizado: item.valorAutorizado,
      inicioResolucion: item.inicioResolucion,
      valorSolicitado: item.valorSolicitado,
      cantidadImportarExportarSolicitada: item.cantidadImportarExportarSolicitada,
      cantidadImportarExportar: item.cantidadImportarExportar,
      general: item.general
    }));

    return {
      motivoCancelacion: payload.motivoCancelacion,
      idTipoTramite: parseInt(payload.idTramite, 10),
      datos: DATOS,
    };
  }
}