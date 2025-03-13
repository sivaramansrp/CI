import { CatalogosSelect } from '@ng-mf/data-access-user';
import { FormularioDinamico } from '@ng-mf/data-access-user';

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
  props: FormularioDinamico | CatalogosSelect | undefined,
  class: string,
  visibility?: string,
  radioConfig?: string[],
}
export interface DatosMercanica {
  descripción: string,
  marca: string,
  tipo_entrada: string,
  fracción: string,
  nico: string,
  umt: string,
  factura_número: string,
  factura_fecha: string,
  umc: string,
  otro_umc: string,
  cantidad_umc: string,
  factor_conversión: string,
  cantidad_umt: string,
  valor_factura: string,
  moneda_comercialización: string,
  valor_factura_usd: string,
  precio_unitario_usd: string,
  país_exportador: string,
  país_origen: string,
  valor_total_factura: string,
  valor_total_factura_usd: string,
}
