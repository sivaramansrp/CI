import { Facturador } from "../../../shared/models/terceros-relacionados.model";

export interface Otros extends Facturador{
    nombreDescripcion:string;
}

export interface TipoPersonaModel{
      label: string, 
      value: string,
      hint?: string,
}