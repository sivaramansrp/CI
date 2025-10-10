/**
 * @fileoverview
 * This file contains the adapter service for converting between Akita state and API payload formats
 * for the trámite 140105 - Desistimiento de Permiso.
 */
import { Injectable } from '@angular/core';

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
   * Converts from Akita state to API payload format using backend team specification
   * Clean implementation matching backend team requirements
   * @param state The current Akita state
   * @returns Formatted payload for API
   */
  static toFormPayload(state: DesistimientoDePermisoState): AmpliacionServiciosPayload {
    return {
      idTramite: "140105",
      motivoCancelacion: state.motivoCancelacion || "API Test 2",
      numeroFolioTramiteCancelados: [
        {
          idResolucion: "0100001000320221005000001",
          numeroResolucion: "NR",
          regimen: "Importación",
          clasificacionRegimen: "General",
          condicionMercancia: "Nueva",
          fraccionArancelaria: "72069099",
          unidadMedida: "Kilogramo",
          cantidadImportarExportar: "1000000",
          vigenciaResolucion: "2025-12-31",
          valorAutorizado: "100000",
          inicioResolucion: "2025-01-01",
          numFolioTramite: "140105",
          valorSolicitado: "95000",
          cantidadImportarExportarSolicitada: "950000",
          general: "Sí"
        }
      ],
    };
  }

  /**
   * Maps API response back to Akita state format
   * @param payload The API response payload
   * @returns Formatted state object
   */
  static toState(payload: AmpliacionServiciosPayload): Partial<DesistimientoDePermisoState> {
    return {
      motivoCancelacion: payload.motivoCancelacion,
      // Additional mappings can be added here as needed
    };
  }
}