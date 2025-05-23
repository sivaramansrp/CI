import { Catalogo } from './shared/catalogos.model';

export interface InputConfig {
  title: string,
  formGroupName: string,
  menu: MenuConfig[],
}
  
export interface MenuConfig {
  inputType: string,
  props: Props,
  class: string,
  visibility?: string,
  radioConfig?: string[],
  value?: string | number,
}
  
export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

export interface FormaTextProp {
  labelNombre: string;
  campo: string;
  class?: string,
  tipo_input?: string,
  disabled: boolean,
  validators?: string[],
  placeholder?: string,
  availableRadioOptions?: (string | number)[]
}

export interface CatalogoSelectProp {
  labelNombre: string;
  campo: string;
  required: true,
  catalogos: Catalogo[];
  primerOpcion: string,
}

export interface RadioProps {
  labelNombre: string;
  campo: string;
  radioOptions: LabelValueDatos[];
  radioSelectedValue: string | number;
  jsonDataFileName: string;
}

export interface FetchaProps {
  labelNombre: string;
  campo: string;
  habilitado: boolean
}
export interface LabelValueDatos {
  label: string,
  value: string | number
}

export interface Props extends FormaTextProp, CatalogoSelectProp, RadioProps, FetchaProps {
  labelNombre: string;
  campo: string;
}
