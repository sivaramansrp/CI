/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */

import { Injectable } from '@angular/core';
import { Programa140101State } from '../../../estados/tramites/tramite140101.store';

/**
 * Interfaz que representa los detalles de la solicitud
 */
interface Solicitud {
    discriminatorValue: string;
    idSolicitud: string;
    tipoSolicitud: string;
    programaAutorizadoEconomia: {
      idProgramaAutorizado: null | number;
    },
    observaciones: string;
  }

/**
 * Interfaz que representa los detalles del domicilio
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
 * Interfaz que representa los detalles del solicitante
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
 * Interfaz que representa la estructura del payload de API para el trámite 80205
 */
export interface CargaUtilDeRespuesta {
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
  solicitante: object;
  domicilio: object;
  folioPrograma: string;
  idProgramaSeleccionado: string;
  modalidad: string;
  representacionFederal: string;
  tipoPrograma: string;
  estatus: string;
  confirmar: boolean;
  puedeCapturarRepresentanteLegalCG?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GuardarMappingAdapter {
  /**
   * Convierte del estado de Akita al formato de payload de API usando las mismas claves
   * @param state El estado actual de Akita
   * @returns Payload formateado para la API
   */
  static toFormPayload(state: Programa140101State): CargaUtilDeRespuesta {
    // Obtener datos de solicitud desde infoRegistro
    const SOLICITUD: Solicitud = {
      discriminatorValue: "140101",
      idSolicitud: "202785566",
      tipoSolicitud: "1",
      programaAutorizadoEconomia: {
        idProgramaAutorizado: state.programaACancelar.idProgramaAutorizado !== undefined && state.programaACancelar.idProgramaAutorizado !== null
          ? Number(state.programaACancelar.idProgramaAutorizado)
          : null
      },
      observaciones: state.solicitudObservaciones
    };

    return {
      solicitud: SOLICITUD,
      tipoDeSolicitud: "guardar",
      idSolicitud: state.idSolicitud ?? 0,
      idTipoTramite: 140101,
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
      solicitante: {},
      domicilio: {},
      puedeCapturarRepresentanteLegalCG: false, /* hidden */
      folioPrograma: state.programaACancelar.folioPrograma ?? '',
      idProgramaSeleccionado: state.programaACancelar.idProgramaSeleccionado ?? '',
      modalidad: state.programaACancelar.modalidad ?? '',
      representacionFederal: state.programaACancelar.representacionFederal ?? '',
      tipoPrograma: state.programaACancelar.tipoPrograma ?? '',
      estatus: state.programaACancelar.estatus ?? '',
      confirmar: state.confirmar,
    };
  }

}