import { CatalogosSelect } from '../shared/components.model';
import { FormularioDinamico } from '../shared/forms-model';

export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}
export interface InputConfig {
  title: string,
  formGroupName: string,
  menu: MenuConfig[],
}

export interface MenuConfig {
  inputType: string,
  props: FormularioDinamico | CatalogosSelect | any,
  class: string,
  visibility?: string,
}
