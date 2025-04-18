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

export interface DatosGeneralesDeLaSolicitudRadioLista {
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

export interface DatosGeneralesDeLaSolicitudDatos {
  tipoDeEndoso: string;
  tipoDeGarantia: number;
  modalidadDeLaGarantia: number;
  tipoSector: string;
  concepto: number;
  '3500': number;
  '3501': number;
  '3502': number;
  datosGeneralesRFC: string;
  '3503': number;
  '3504': number;
  '3505': number;
  '3506': number;
  '3507': number;
  '3508': number;
  '3509': number;
  '3511': number;
  '3512': number;
  '3513': number;
  textoGenerico1: string;
  textoGenerico2: string;
  '3514': number;
  '3515': number;
  '3516': number;
  textoGenerico3: string;
  '3517': number;
  '3518': number;
  '3519': number;
  '3520': number;
  tipoInversion: number;
  cantidadInversion: string;
  descInversion: string;
  '3521': number;
  '3522': number;
  claveEnumeracionD0: string;
  claveEnumeracionD1: string;
  claveEnumeracionD2: string;
  claveEnumeracionD3: string;
  claveEnumeracionH: string;
  textoGenerico4: string;
  textoGenerico5: string;
  '3523': number;
  '3528': number;
  '3529': number;
  textoGenerico6: string;
  textoGenerico7: string;
  '3530': number;
  '3531': number;
  textoGenerico9: string;
  textoGenerico10: number;
  textoGenerico11: number;
  textoGenerico12: number;
  textoGenerico13: number;
  textoGenerico14: number;
  textoGenerico15: number;
  textoGenerico16: number;
  textoGenerico17: number;
  textoGenerico18: number;
  textoGenerico19: number;
  textoGenerico20: number;
  textoGenerico21: number;
  textoGenerico22: number;
  textoGenerico23: number;
  textoGenerico24: number;
  alerta1: boolean;
  alerta2: boolean;
}
