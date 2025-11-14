import { DISCRIMINATOR_VALUE } from "../constants/modificacion-programa-immex-baja-submanufacturera.enum";

import { Tramite80303State } from '../estados/tramite80303Store.store';

/**
 * Construye el payload para guardar la solicitud de modificación
 * basado en los datos almacenados en el estado del store.
 * @param {Solicitud80301State} storeDatos - Datos actuales del store del trámite 80301.
 * @returns {Record<string, unknown>} Payload estructurado para la solicitud de guardado.
 */
export function buildGuardarPayload(storeDatos: Tramite80303State): Record<string, unknown> {
  const FRACCION_EXPORTACION = storeDatos.anexoExportacionTablaDatos.map((fraccion) => ({
    fraccionPadre: fraccion.descripcion,
    descripcionTestado: fraccion.tipoFraccion,
  }));

  const FRACCION_IMPORTACION = storeDatos.anexoImportacionTablaDatos.map((fraccion) => ({
    fraccionPadre: fraccion.descripcion,
    descripcionTestado: fraccion.tipoFraccion,
  }));

  const ANEXO_FRACCION_EXPORTACION = storeDatos.anexoExportacionTablaDatos.map(
    (fraccion) => ({
      tipoFraccion: fraccion.tipoFraccion,
     })
  );

  const ANEXO_FRACCION_IMPORTACION = storeDatos.anexoImportacionTablaDatos.map(
    (fraccion) => ({
      tipoFraccion: fraccion.tipoFraccion,
    
    })
  );

  return {
    tipoDeSolicitud: 'guardar',
    idSolicitud: storeDatos.idSolicitud || 0,
    idTipoTramite: 80301,
    rfc: 'AAL0409235E6',
    cveUnidadAdministrativa: '8302',
    costoTotal: 10000.5,
    discriminatorValue: DISCRIMINATOR_VALUE,
    certificadoSerialNumber: '1234567890ABCDEF',
    certificado: 'certificacionSAT',
    solicitud: {
      modalidad: '',
      booleanGenerico: true,
      descripcionSistemasMedicion: 'Web',
      descripcionLugarEmbarque: 'Localisation',
      numeroPermiso: 'SI',
      fechaOperacion: '2025-09-19',
      nomOficialAutorizado: '',
    },
    sociosAccionistas: storeDatos.accionistasTablaDatos.map((socio) => ({
      rfc: socio.rfc,
      nombre: socio.nombre,
      apellidoMaterno: socio.apellidoMaterno,
      apellidoPaterno: socio.apellidoPaterno,
    })),
    notarios: storeDatos.federatariosTablaDatos.map((fedatario) => ({
      nombreNotario: fedatario.nombreNotario,
      apellidoMaterno: fedatario.apellidoMaterno,
      apellidoPaterno: fedatario.apellidoPaterno,
      numeroActa: fedatario.numeroActa,
      numeroNotaria: fedatario.numeroNotaria,
      numeroNotario: null,
      delegacionMunicipio: fedatario.delegacionMunicipio,
      entidadFederativa: fedatario.entidadFederativa,
      fechaActa: fedatario.fechaActa,
    })),
    planta: storeDatos.plantasManufacturerasTablaDatos.map((planta) => ({
     
      calle: planta.calle,
      numeroInterior: planta.numeroInterior,
      numeroExterior: planta.numeroExterior,
      codigoPostal: planta.codigoPostal,
      colonia: planta.colonia,
      delegacionMunicipio: planta.municipioDelegacion,
      entidadFederativa: planta.estado,
      pais: planta.pais,
      rfc: planta.rfc,
      estatus: planta.estatus,
      desEstatus: planta.desEstatus,
      localidad: planta.localidad,
      razonSocial: planta.razonSocial,
    })),
    fraccionesExportacion: [
      ...FRACCION_EXPORTACION,
      ...ANEXO_FRACCION_EXPORTACION,
    ],
    fraccionesImportacion: [
      ...FRACCION_IMPORTACION,
      ...ANEXO_FRACCION_IMPORTACION,
    ],
    servicios: storeDatos.serviciosImmexTablaDatos.map((servicio) => ({
      idServicio: servicio.id,
      tipoServicio: servicio.descripcionTipo,
      testado: servicio.descripcionTestado,
      descripcion: servicio.descripcion,
      descripcionTipo: servicio.descripcionTipo,
      estatus: servicio.desEstatus,
    })),
    unidadAdministrativaRepresentacionFederal: {
      clave: storeDatos.modificacionDatos?.representacionFederal,
    },
    domicilio: {},
    solicitante: {},
    datosCertificacion: 'CERT-001',
    montoImportaciones: 500000,
    factorAmpliacion: 1.2,
    certificacion_sat: storeDatos.certificacionSAT,
    cveEntidad: 'string',
    idProgramaAutorizado: 0,
   folioPrograma: storeDatos.selectedFolioPrograma,
    tipoPrograma: storeDatos.selectedTipoPrograma,
    tipoModalidad: storeDatos.datosModificacion?.tipo,
    descripcionModalidad: storeDatos.datosModificacion?.programa,
  };
}