import { Cancelacion } from '../../tramites/140104/models/cancelacion-de-solicitus.model';

/**
 * Interfaz que representa el detalle de un permiso.
 * Contiene información relevante sobre el permiso solicitado, autorizado y sus características.
 */
export interface DetalleDelPermiso {
  /** Aviso relacionado con el permiso */
  aviso: string | null;
  /** Cantidad autorizada en el permiso */
  cantidadAutorizada: number | null;
  /** Cantidad solicitada en el permiso */
  cantidadSolicitada: number | null;
  /** Clasificación del régimen */
  clasificacionRegimen: string | null;
  /** Clave de la entidad federativa del solicitante */
  claveEntidadFederativaSolicitante: string | null;
  /** Condición de la mercancía */
  condicionMercancia: string | null;
  /** Descripción de la mercancía */
  descripcionMercancia: string | null;
  /** Esquema de regla octava */
  esquemaReglaOctava: string | null;
  /** Fecha de fin de vigencia del permiso */
  fechaFinVigencia: string | null;
  /** Fecha de inicio de vigencia del permiso */
  fechaInicioVigencia: string | null;
  /** Fracción arancelaria */
  fraccion: string | null;
  /** Indica si es general */
  general: string | null;
  /** Identificador de la resolución */
  idResolucion: number | null;
  /** Identificador de la solicitud */
  idSolicitud: number | null;
  /** Identificador temporal de la solicitud */
  idSolicitudTemporal: number | null;
  /** Identificador del tipo de trámite */
  idTipoTramite: number | null;
  /** Identificador del estado de la resolución */
  ideEstadoResolucion: string | null;
  /** Identificador del estado de la solicitud */
  ideEstadoSolicitud: string | null;
  /** Justificación de la solicitud */
  justificacion: string | null;
  /** Número de folio del trámite */
  numFolioTramite: string | null;
  /** Número de resolución */
  numeroResolucion: string | null;
  /** Observaciones relacionadas con el permiso */
  observacion: string | null;
  /** Países involucrados */
  paises: string | null;
  /** Régimen de la mercancía */
  regimen: string | null;
  /** RFC del solicitante */
  rfcSolicitante: string | null;
  /** Saldo disponible en el permiso */
  saldoDisponible: number | null;
  /** Texto del dictamen */
  textoDictamen: string | null;
  /** Tipo de solicitud */
  tipoSolicitud: string | null;
  /** Tipo de solicitud PEXIM */
  tipoSolicitudPexim: string | null;
  /** Unidad de medición */
  unidadMedicion: string | null;
  /** Unidad de medida UMC */
  unidadMedidaUMC: string | null;
  /** Unidad de medida UMT */
  unidadMedidaUMT: string | null;
  /** Uso específico de la mercancía */
  usoEspecifico: string | null;
  /** Valor de la factura en USD */
  valorFacturaUSD: number | null;
  /** Valor solicitado en el permiso */
  valorSolicitado: number | null;
}

export interface DetalleDelPermisoPayload {
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
        pais: { clave: string; nombre: string };
        entidadFederativa: { clave: string; nombre: string };
        delegacionMunicipio: { clave: string; nombre: string };
        colonia: { clave: string; nombre: string };
        localidad: { clave: string; nombre: string };
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
  numeroFolioTramiteCancelados: Cancelacion[];
}
