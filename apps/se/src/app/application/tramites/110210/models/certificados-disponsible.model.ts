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
        calle: string;
        numeroExterior: string;
        numeroInterior?: string;
        codigoPostal?: string;
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

