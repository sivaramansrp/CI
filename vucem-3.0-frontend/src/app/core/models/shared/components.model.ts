import { Catalogo } from '../5701/catalogos.model';

export interface DatosInput {
  lbl_name: string;
  id: string;
  tooltip: boolean;
  title_tooltip?: string;
  disabled: boolean;
}

export interface CatalogosSelect {
  labelNombre: string;
  required: boolean;
  primerOpcion: string;
  catalogos: Array<Catalogo>;
}

export interface DatosPasos {
  txtBtnSig: string;
  txtBtnAnt: string;
  indice: number;
  nroPasos: number;
}

export interface DatosIndice {
  indice: number;
  estatus: boolean;
}

export interface DocumentosCargados {
  tipoDocumento: Catalogo;
  nombreArchivo: string;
}

export interface DatosArchivo {
  tamRequerido: number;
  tam: number;
  unidad: string;
}

export interface InputCheck {
  labelNombre: string;
  maxlength: number;
  minlenght: number;
  required: boolean;
  alfanumerico: boolean;
}

export interface DatosInputCheck {
  check: boolean;
  valor: string;
}

export interface InputHora {
  labelNombre: string;
  required: boolean;
}

export interface InputFecha {
  labelNombre: string;
  required: boolean;
  habilitado: boolean
}

export interface ConfiguracionTabla {
  [clave: string]: string | number | boolean | null;
}

export interface EncabezadosTabla {
  key: string;
  valor: string;
}

export interface AccionesTabla {
  tipo: string;
  label: string;
  icono:  string;
}

export interface Pedimento {
  patente: number;
  pedimento: number;
  aduana: number;
  idTipoPedimento: number;
  descTipoPedimento: string,
  numero: string;
  comprobanteValor: string;
  pedimentoValidado: boolean;

}

export interface DatosRfcResponse {
  rfc: string;
  nombre: string;
  aPaterno: string;
  aMaterno: string;
}
export interface DatosRepresentanteLegal {
  rfc: string;
  nombre: string;
  aPaterno: string;
  aMaterno: string;
  telefono: string;
  correo: string;
}
