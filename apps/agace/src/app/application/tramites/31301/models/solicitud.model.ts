import { CatalogosSelect } from "@libs/shared/data-access-user/src";

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
  requisitos:InputRadio;
}

export interface DatosGeneralesDeLaSolicitudCatologo {
  concepto : CatalogosSelect;
  tipoDeInversion : CatalogosSelect;
}

export interface SubContratistas {
  rfc: string;
  razonSocial: string;
}

export interface SeccionSociosIC{
  rfc: string;
}