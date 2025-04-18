import { CatalogosSelect } from '@libs/shared/data-access-user/src';

export interface RecibirNotificaciones {
  rfc: string;
  curp: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface ModificacionDenominacionRazonSocial {
  razonSocialAnterior: string;
  razonSocialActual: string;
}

export interface DatosPorGarantia {
  polizaDeFianzaActual: number;
  numeroFolio: string;
  rfcInstitucion: string;
  fechaExpedicion: string;
  fechaInicioVigenciaNo: string;
  fechaFinVigenciaNo: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
  importeTotal: string;
}

export interface InputRadio {
  radioOptions: {
    label: string;
    value: string | number;
    hint?: string;
  }[];
  isRequired: boolean;
}

export interface DatosGeneralesDeLaSolicitud {
  tipoDeEndoso: InputRadio;
  tipoDeGarantia: InputRadio;
  modalidadDeLaGarantia: InputRadio;
  tipoSector: InputRadio;
  requisitos: InputRadio;
}

export interface DatosGeneralesDeLaSolicitudCatologo {
  concepto: CatalogosSelect;
  tipoDeInversion: CatalogosSelect;
}

export interface SubContratistas {
  rfc: string;
  razonSocial: string;
}

export interface SeccionSociosIC {
  idMiembroEmpresa?: string;
  idSolicitud?: string;
  tipoPersona?: string;
  tipoPersonaMuestra: string;
  nombreCompleto: string;
  rfc: string;
  caracterDe: string;
  paisNombre: string;
  tipoCaracter?: string;
  paisClave?: string;
  tributarMexico: string;
  nombreEmpresa: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  razonSocial?: string;
}

export interface TipoDeInversion {
  idRegistro?: string;
  tipoInversion: string;
  descripcion: string;
  valor: string;
  cveTipoInversion?: string;
}

export interface Domicilios {
  instalacionPrincipal: string;
  cveTipoInstalacion?: string;
  tipoInstalacion: string;
  cveEntidadFederativa?: string;
  entidadFederativa: string;
  cveDelegacionMunicipio?: string;
  municipioDelegacion: string;
  direccion: string;
  codigoPostal: string;
  registroSESAT: string;
  procesoProductivo: string;
  fechaModificacion?: string;
  cveEstatus?: string;
  estatus: string;
  noExterior?: string;
  noInterior?: string;
  cveColonia?: string;
  calle?: string;
  descCol?: string;
  idRecinto?: string;
  numFolioAcuse?: string;
  observaciones?: string;
}
