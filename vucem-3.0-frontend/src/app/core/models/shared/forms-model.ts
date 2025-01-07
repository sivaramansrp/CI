import { FormGroup } from "@angular/forms";

export interface CampoForm {
  label_nombre: string;
  campo: string;
  class: string;
  tipo_input: string;
};

export interface datosAgregarFormulario {
  form: FormGroup;
  field: string;
  valor: string;
}
