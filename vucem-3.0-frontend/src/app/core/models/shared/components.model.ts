import { Catalogo } from "../5701/catalogos.model";

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
  catalogos: Array<Catalogo>
}

export interface DatosPasos {
  txt_btn_sig: string;
  txt_btn_ant: string;
  indice: number;
  nro_pasos: number;
}
