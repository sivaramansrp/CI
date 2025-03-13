import { FormGroup } from '@angular/forms';

export interface CampoForm {
  labelNombre: string;
  campo: string;
  class: string;
  tipo_input: string;
}

export interface datosAgregarFormulario {
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
  validators: string[];
  tooltip?: boolean;
  tooltipTxt?: string;
  placeholder?: string;
  AvailableRadioOptions?: string[];
}
