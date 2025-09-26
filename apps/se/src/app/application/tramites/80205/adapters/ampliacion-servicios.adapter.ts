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
  descripcion: string;
  descripcionTipo: string;
  testado?: boolean;
  estatus?: boolean;
  desEstatus?: string;
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
  idCompuestoEmpresa?: string;
  idServicioAutorizado?: number;
}

/**
 * Interface representing the solicitud details
 */
interface Solicitud {
  modalidad: string;
  folioProgramaAutorizado: number;
  folioPrograma?: string;
  anioPrograma: string;
}

/**
 * Interface representing the domicilio details
 */
interface Domicilio {
  idDomicilio: number;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  informacionExtra: string;
  clave: string;
  cveLocalidad: string;
  cveDelegMun: string;
  cveEntidad: string;
  cvePais: string;
  ciudad: string;
  telefono: string;
  fax: string;
  municipio: string;
  colonia: string;
  descUbicacion: string;
  cveCatalogo: string;
  telefonos: string;
  tipoDomicilio: number;
}

/**
 * Interface representing the solicitante details
 */
interface Solicitante {
  idPersonaPersonaSolicitudR: number;
  idSolicitud: number;
  nombre: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  razonSocial: string;
  rfc: string;
  curp: string;
  ideTipoPersonaSol: string;
  correoElectronico: string;
  cedulaProfesional: string;
  nss: string;
  telefono: string;
  descripcionGiro: string;
  cvePaisOrigen: string;
  idDireccionSol: number;
  tipoPatenteAgente: string;
  recif: string;
  puesto: string;
  tipoAgente: string;
  numeroPatente: string;
  numeroIdentificacionFiscal: string;
  personaMoral: boolean;
  extranjero: boolean;
  organismoPublico: boolean;
  cveUsuario: string;
  paginaWeb: string;
  ideGenerica1: string;
  rfcExtranjero: string;
  codAutorizacion: string;
  actividadProductiva: string;
  estadoEvaluacionEntidad: string;
  estadoEntidad: string;
  original: boolean;
  modificado: boolean;
  numeroRegistro: string;
  concentimientoInstalacionRecuperacion: boolean;
  cveCatalogo: string;
  alquilado: boolean;
  volumenAlmacenaje: number;
  capacidadAlmacenaje: number;
  descripcionDetalladaActividadEconomica: string;
  activo: boolean;
  generico1: boolean;
  area: string;
  cveNacionalidad: string;
  clasificacionArancelaria: string;
  infoAdicional: boolean;
  montoImportacion: number;
  montoExportacion: number;
  pctParticAccionaria: number;
  ampliacionModelos: boolean;
  ampliacionPaises: boolean;
  fecFallecimiento: string;
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
  discriminatorValue: string;
  discriminator_value?: string;
  solicitante: object;
  domicilio: object;
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
        testado: true,
        descripcion: si.descripcion,
        descripcionTipo: si.descripcionTipo,
      })),
      ...state.datosAutorizados.map(sa => ({
        tipoServicio: sa.tipoServicio,
        claveServicio: Number(sa.claveServicio),
        testado: true,
        descripcion: sa.descripcion,
        descripcionTipo: sa.descripcionTipo,
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
    //   idCompuestoEmpresa: e.idCompuestoEmpresa,
    //   idServicioAutorizado: Number(e.idServicioAutorizado),
    }));

    // Get solicitud data from infoRegistro
    const SOLICITUD: Solicitud = {
      modalidad: state.infoRegistro.seleccionaLaModalidad,
      folioProgramaAutorizado: 0, // This should come from somewhere else in state
      anioPrograma: state.infoRegistro.ano
    };

    return {
      // Static values for now, these should come from configuration or other state
      tipoDeSolicitud: "guardar",
      idSolicitud: state.idSolicitud ?? 0,
      idTipoTramite: 80205,
      rfc: "AAL0409235E6",
      cveUnidadAdministrativa: "8101",
      costoTotal: 10000.5,
      certificadoSerialNumber: "1234567890ABCDEF",
      certificado: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A",
      numeroFolioTramiteOriginal: "TRM-2023-00001",
      nombre: "Juan",
      apPaterno: "Pérez",
      apMaterno: "López",
      telefono: "5551234567",
      solicitud: SOLICITUD,
      servicios: COMBINED_SERVICIOS,
      empresasNacionales: EMPRESAS_NACIONALES,
      discriminatorValue: "80205",
      solicitante: {},
      domicilio: {}
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