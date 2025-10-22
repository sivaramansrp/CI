export interface CertificadoPayload {
  solicitud: {
    solicitante: {
      rfc: string;
      razonSocial: string;
      descripcionGiro: string;
      correoElectronico: string;
      telefono: string;
      cveUsuario: string;
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
        localidad: {
          clave: string;
          nombre: string;
        };
        colonia: {
          clave: string;
          nombre: string;
        };
        calle: string;
        numeroExterior: string;
        numeroInterior: string;
        codigoPostal: string;
      };
    };
    cveRolCapturista: string;
    cveUsuarioCapturista: string;
    clavePaisSeleccionado: string;
    idTratadoAcuerdoSeleccionado: string;
    discriminatorValue: string;
    tramite: {
      numFolioTramite: string;
    };
    idSolicitud: string;
  };
  puedeCapturarRepresentanteLegalCG: boolean;
  datosMercancia: {
    numeroCertificado: string;
  };
  buscarCertificadosPorNumero: string;
  buscarListaCertificados: string;
}

export interface Certificadoes {
  idCertificado: string;
  numeroCertificado: string;
  fechaVencimiento: string;
  fechaExpedicion: string;
}

export interface GuardarPayload {
  solicitud: {
    solicitante: {
      rfc: string;
      razonSocial: string;
      descripcionGiro: string;
      correoElectronico: string;
      telefono: string;
      cveUsuario: string;
    };
    cveRolCapturista: string;
    cveUsuarioCapturista: string;
    clavePaisSeleccionado: string;
    idTratadoAcuerdoSeleccionado: string;
    discriminatorValue: string;
    tramite: {
      numFolioTramite: string;
    };
    idSolicitud?: string;
  };
  puedeCapturarRepresentanteLegalCG: boolean;
  datosMercancia: {
    numeroCertificado: string;
  };
  guardar?: string;
  parametrosBP?: {
    idTramite: number;
  };
}

export interface GeneraCadenaPayload {
  num_folio_tramite: string | null;
  boolean_extranjero: boolean;
  solicitante: {
    rfc: string;
    nombre: string;
    es_persona_moral: boolean;
    certificado_serial_number: string;
  };
  cve_rol_capturista: string;
  cve_usuario_capturista: string;
  fecha_firma: string;
}

export interface CertificadoOrigenPayload {
  solicitud: {
    solicitante: {
      rfc: string;
      razonSocial: string;
      descripcionGiro: string;
      correoElectronico: string;
      telefono: string;
      cveUsuario: string;
    };
    cveRolCapturista: string;
    cveUsuarioCapturista: string;
    discriminatorValue: string;
    idSolicitud: string | null;
    clavePaisSeleccionado: string;
    idTratadoAcuerdoSeleccionado: string;
    tramite: {
      numFolioTramite: string;
    };
  };
  puedeCapturarRepresentanteLegalCG: boolean;
  numCertificadoSeleccionado: string | null;
  datosMercancia: {
    numeroCertificado: string;
  };
  parametrosBP: {
    idSolicitud: string | null;
    servicio: string | null;
    mensaje: string | null;
    idTramite: string;
  };
}

export interface CertificadoOrigenResponse {
  numeroCertificadoOrigen: string | null;
  fechaExpedicion: string | null;
  fechaVencimiento: string | null;
  tratadoAcuerdo: string | null;
  paisBloque: string | null;
  nombre: string | null;
  primerApellido: string | null;
  segundoApellido: string | null;
  numeroRegistroFiscal: string | null;
  razonSocial: string | null;
  ciudad: string | null;
  calle: string | null;
  numeroLetra: string | null;
  telefono: string | null;
  fax: string | null;
  correoElectronico: string | null;
  observaciones: string | null;
  mercancias: unknown[];
}


