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
  validators: string[];
  tooltip?: string;
  placeholder?: string;
  AvailableRadioOptions?: string[];
  listaDesplegable?: Catalogo[];
}
