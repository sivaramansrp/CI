import { TableData } from '@libs/shared/data-access-user/src';

export interface SolicitudDatos {
  fechaCreacion: string;
  mercancia: string;
  cantidad: string;
  proovedor: string;
  SCIANLista: TableData;
  mercancias?: TableData;
}

export interface RadioOptions {
  label: string;
  value: string | number;
}

export interface DatosDeSolicitud {
  tablaHeadData: string[];
  tablaFilaDatos: SolicitudDatos[];
  hacerlosRadioOptions: RadioOptions[];
}

export interface Solicitud {
  razonSocial: string;
  correoElectronico: string;
  codigoPostal: string;
  estado: number;
  municipio: string;
  localidad: string;
  colonia: string;
  calle: string;
  lada: number;
  telefono: number;
  avisoDeFuncionamiento: string;
  licenciaSanitaria: string;
  liveFreshFrozen: string;
  regimen: number;
  aduana: number;
  hacerlos: string | number;
  rfc: string;
  legalRazonSocial: string;
  apellidoPaterno: string;
  apellidoMeterno: string;
}
