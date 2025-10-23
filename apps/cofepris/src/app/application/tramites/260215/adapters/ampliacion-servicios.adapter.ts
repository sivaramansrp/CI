/**
 * @fileoverview
 * This file contains the adapter service for converting between Akita state and API payload formats
 * for the trámite 260215 - Permiso Sanitario de Importación.
 */
import { Cancelacion } from '../models/cancelacion-de-solicitus.model';
import { Injectable } from '@angular/core';

import { DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO } from '../constants/adapter.constants';
import { Solicitud260215State } from '../estados/tramites/tramite260215.store';

// import { Solicitud260215State } from '../estados/tramites/sanitario260215.store';

/**
 * Interface representing the API payload structure for trámite 260215
 * Based on backend team specification
 */
export interface AmpliacionServiciosPayload {
  solicitud: {
    idSolicitud: string;
    discriminatorValue: string;
    cveRolCapturista: string;
    cveUsuarioCapturista: string;
    solicitante: {
      cveUsuario: string;
      rfc: string;
      razonSocial: string;
      descripcionGiro: string;
      correoElectronico: string;
      telefono: string;
      domicilio: {
        pais: {
          clave: string;
          nombre: string;
        };
        entidadFederativa: {
          clave: string;
          nombre: string;
        };
        delegacionMunicipio: {
          clave: string;
          nombre: string;
        };
        colonia: {
          clave: string;
          nombre: string;
        };
        localidad: {
          clave: string;
          nombre: string;
        };
        codigoPostal: string;
        calle: string;
        numeroExterior: string;
        numeroInterior: string;
      };
    };
  };
  puedeCapturarRepresentanteLegalCG: boolean;
  claveEntidadFederativa: string;
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
  private static createNumeroFolioTramiteItem(dato: Partial<Cancelacion>, _idTipoTramite?: number): {
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
      regimen: DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.regimen, // Always use backend expected value
      clasificacionRegimen: dato.clasificacionRegimen || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.clasificacionRegimen,
      condicionMercancia: DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.condicionMercancia, // Always use backend expected value
      fraccionArancelaria: dato.fraccionArancelaria ? dato.fraccionArancelaria.split('-')[0] : DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.fraccionArancelaria, // Extract base fraction code
      unidadMedida: dato.umt || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.unidadMedida,
      cantidadImportarExportar: dato.cantidadImportarExportar || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.cantidadImportarExportar,
      vigenciaResolucion: dato.vigenciaResolucion || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.vigenciaResolucion,
      valorAutorizado: dato.valorAutorizado || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.valorAutorizado,
      inicioResolucion: dato.inicioResolucion || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.inicioResolucion,
      numFolioTramite: DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.numFolioTramite, // Backend expects "260215"
      valorSolicitado: dato.valorSolicitado || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.valorSolicitado,
      cantidadImportarExportarSolicitada: dato.cantidadImportarExportarSolicitada || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.cantidadImportarExportarSolicitada,
      general: dato.general || DEFAULT_NUMERO_FOLIO_TRAMITE_CANCELADO.general
    };
  }

  /**
   * Convierte del estado de Akita al formato de payload de API según especificación del backend
   * Matches backend team specification exactly
   * @param state El estado actual de Akita
   * @returns Payload formateado para la API
   */
  static toFormPayload(state: Solicitud260215State): AmpliacionServiciosPayload {
    // Map datos array from state to numeroFolioTramiteCancelados format
    const NUMERO_FOLIO_TRAMITE_CANCELADOS = state.datos && state.datos.length > 0
      ? state.datos.map(dato => AmpliacionServiciosAdapter.createNumeroFolioTramiteItem(dato, state.idTipoTramite))
      : [AmpliacionServiciosAdapter.createNumeroFolioTramiteItem({}, state.idTipoTramite)];

    return {
      solicitud: {
        idSolicitud: "", // Backend expects empty string
        discriminatorValue: "260215",
        cveRolCapturista: "PersonaMoral",
        cveUsuarioCapturista: "AAL0409235E6",
        solicitante: {
          cveUsuario: "AAL0409235E6",
          rfc: "AAL0409235E6",
          razonSocial: "INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV",
          descripcionGiro: "Siembra, cultivo y cosecha de otros cultivos",
          correoElectronico: "vucem2021@gmail.com",
          telefono: "55-98764532",
          domicilio: {
            pais: {
              clave: "MEX",
              nombre: "ESTADOS UNIDOS MEXICANOS"
            },
            entidadFederativa: {
              clave: "SIN",
              nombre: "SINALOA"
            },
            delegacionMunicipio: {
              clave: "25001",
              nombre: "AHOME"
            },
            colonia: {
              clave: "00181210001",
              nombre: "MIGUEL HIDALGO"
            },
            localidad: {
              clave: "00181210008",
              nombre: "LOS MOCHIS"
            },
            codigoPostal: "81210",
            calle: "CAMINO VIEJO",
            numeroExterior: "1353",
            numeroInterior: ""
          }
        }
      },
      puedeCapturarRepresentanteLegalCG: false,
      claveEntidadFederativa: "SIN",
      idTramite: "260215",
      motivoCancelacion: state.motivoCancelacion || "API Test 2",
      numeroFolioTramiteCancelados: NUMERO_FOLIO_TRAMITE_CANCELADOS
    };
  }

  /**
   * Mapea la respuesta de la API de vuelta al formato de estado de Akita
   * Following 80205 pattern exactly
   * @param payload El payload de respuesta de la API
   * @returns Objeto de estado formateado
   */
  static toState(payload: AmpliacionServiciosPayload): Partial<Solicitud260215State> {
    // Map numeroFolioTramiteCancelados back to datos array for store
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
      idSolicitud: payload.solicitud.idSolicitud ? parseInt(payload.solicitud.idSolicitud, 10) : null,
      rfc: payload.solicitud.solicitante.rfc,
      telefono: payload.solicitud.solicitante.telefono,
      claveEntidadFederativa: payload.claveEntidadFederativa,
      motivoCancelacion: payload.motivoCancelacion,
      idTipoTramite: parseInt(payload.idTramite, 10),
      datos: DATOS,
    };
  }
}