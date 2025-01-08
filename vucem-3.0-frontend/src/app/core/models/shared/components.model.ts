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
  txt_btn_sig: string;
  txt_btn_ant: string;
  indice: number;
  nro_pasos: number;
}

export interface DatosIndice {
  indice: number;
  estatus: boolean;
}

export interface DocumentosCargados {
  tipoDocumento: Catalogo;
  nombre_archivo: string;
}

export interface DatosArchivo {
  tam_req: number;
  tamanio: number;
  unidad: string;
}

export interface InputCheck {
  label_nombre: string;
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
  label_nombre: string;
  required: boolean;
}

export interface InputFecha {
  label_nombre: string;
  required: boolean;
  habilitado: boolean
}

export interface ConfiguracionTabla {
  [clave: string]: string | number | boolean | null;
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
