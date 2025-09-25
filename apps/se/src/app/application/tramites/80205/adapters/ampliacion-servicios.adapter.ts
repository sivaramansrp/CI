/**
 * @fileoverview
 * This file contains the adapter service for converting between Akita state and API payload formats
 * for the ampliacion servicios trámite 80205.
 */

import type { AmpliacionServiciosState } from '../estados/tramite80205.store';
import { Injectable } from '@angular/core';

/**
 * Interface representing a service in the payload
 */
interface Servicio {
  tipoServicio: string;
  claveServicio: number;
  descripcion: string | null;
  descripcionTipo: string | null;
  descripcionTestado: string | null;
  estatus: boolean;
  desEstatus: string | null;
}

/**
 * Interface representing a national company in the payload
 */
interface EmpresaNacional {
  razonSocial: string;
  rfc: string;
  idServicio: string;
  descripcionServicio: string;
  numeroPrograma: string;
  tiempoPrograma: string;
  idCompuestoEmpresa: string;
  idServicioAutorizado: number;
}

/**
 * Interface representing the solicitud details
 */
interface Solicitud {
  modalidad: string;
  folioProgramaAutorizado: number;
  folioPrograma: string;
  anioPrograma: string;
}

/**
 * Interface representing the API payload structure for trámite 80205
 */
export interface AmpliacionServiciosPayload {
  tipoDeSolicitud: string;
  idSolicitud: number;
  idTipoTramite: number;
  rfc: string;
  cveUnidadAdministrativa: string;
  costoTotal: number;
  certificadoSerialNumber: string;
  certificado: string;
  numeroFolioTramiteOriginal: string;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  telefono: string;
  solicitud: Solicitud;
  servicios: Servicio[];
  empresasNacionales: EmpresaNacional[];
}

@Injectable({
  providedIn: 'root'
})
export class AmpliacionServiciosAdapter {
  /**
   * Converts from Akita state to API payload format using the same keys
   * @param state The current Akita state
   * @returns Formatted payload for API
   */
  static toFormPayload(state: AmpliacionServiciosState): AmpliacionServiciosPayload {
    // Combine servicios from datosAutorizados and datosImmex
    const COMBINED_SERVICIOS: Servicio[] = [
      ...state.datosImmex.map(si => ({
        tipoServicio: si.tipoServicio,
        claveServicio: Number(si.claveServicio),
        descripcion: si.descripcion,
        descripcionTipo: si.descripcionTipo,
        descripcionTestado: null,
        estatus: true,
        desEstatus: null
      })),
      ...state.datosAutorizados.map(sa => ({
        tipoServicio: sa.tipoServicio,
        claveServicio: Number(sa.claveServicio),
        descripcion: sa.descripcion,
        descripcionTipo: sa.descripcionTipo,
        descripcionTestado: null,
        estatus: sa.estatus === 'true',
        desEstatus: sa.desEstatus
      }))
    ];

    // Convert empresas to empresasNacionales format
    const EMPRESAS_NACIONALES: EmpresaNacional[] = state.empresas.map(e => ({
      razonSocial: e.razonSocial,
      rfc: e.rfc,
      idServicio: e.idServicio,
      descripcionServicio: e.descripcionServicio,
      numeroPrograma: e.numeroPrograma,
      tiempoPrograma: e.tiempoPrograma,
      idCompuestoEmpresa: e.idCompuestoEmpresa,
      idServicioAutorizado: Number(e.idServicioAutorizado)
    }));

    // Get solicitud data from infoRegistro
    const SOLICITUD: Solicitud = {
      modalidad: state.infoRegistro.seleccionaLaModalidad,
      folioProgramaAutorizado: 0, // This should come from somewhere else in state
      folioPrograma: state.infoRegistro.folioPrograma || state.infoRegistro.folio,
      anioPrograma: state.infoRegistro.ano
    };

    return {
      // Static values for now, these should come from configuration or other state
      tipoDeSolicitud: "guardar",
      idSolicitud: state.idSolicitud || 0,
      idTipoTramite: 80205,
      rfc: state.rfcEmpresa,
      cveUnidadAdministrativa: "8101",
      costoTotal: 10000.5,
      certificadoSerialNumber: "1234567890ABCDEF",
      certificado: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A",
      numeroFolioTramiteOriginal: "TRM-2023-00001",
      nombre: "",
      apPaterno: "",
      apMaterno: "",
      telefono: "",
      solicitud: SOLICITUD,
      servicios: COMBINED_SERVICIOS,
      empresasNacionales: EMPRESAS_NACIONALES
    };
  }

  /**
   * Maps API response back to Akita state format
   * @param payload The API response payload
   * @returns Formatted state object
   */
//   static toState(payload: AmpliacionServiciosPayload): AmpliacionServiciosState {
//     return {
//       idSolicitud: payload.idSolicitud,
//       infoRegistro: payload.infoRegistro,
//       datosImmex: payload.datosImmex,
//       datos: payload.datos,
//       aduanaDeIngreso: payload.aduanaDeIngreso,
//       aduanaDeIngresoSelecion: payload.aduanaDeIngresoSelecion,
//       formaValida: payload.formaValida,
//       empresas: payload.empresas,
//       servicios: payload.servicios,
//       rfcEmpresa: payload.rfcEmpresa,
//       numeroPrograma: payload.numeroPrograma,
//       tiempoPrograma: payload.tiempoPrograma
//     };
//   }
}