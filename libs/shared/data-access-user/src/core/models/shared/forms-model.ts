import { Catalogo } from './catalogos.model';
import { FormGroup } from '@angular/forms';

export interface CampoForm {
  labelNombre: string;
  campo: string;
  class: string;
  tipo_input: string;
}

export interface DatosAgregarFormulario {
  form: FormGroup;
  field: string;
  valor: string;
}

export interface FormularioDinamico {
  labelNombre: string;
  campo: string;
  class: string;
  visibility?: string;
  tipo_input: string;
  disabled: boolean;
  readonly?: boolean;
  validators: string[];
  tooltip?: string;
  placeholder?: string;
  AvailableRadioOptions?: string[];
  listaDesplegable?: Catalogo[];
}

export interface ModeloDeFormaDinamica {
  id?: string; // id
  label_nombre: string; // label name
  campo: string; // field
  clase: string; // class
  tipo_input: string; // field type
  desactivado: boolean; // disabled
  solo_lectura?: boolean; // readonly
  validadores?: Validadores[]; // validators
  marcador_de_posicion?: string; // placeholder
  valor_predeterminado?: string; // default value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opciones?: any[]; // opciones for select dropdown, radio
  margin_top?: number; // margin-top
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout?: any; // layout for radio options
}

export interface Validadores {
  tipo: string; // type
  valor?: number | string; // value
  mensaje?: string; // message
}