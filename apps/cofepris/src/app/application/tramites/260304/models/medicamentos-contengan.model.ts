import { Facturador } from "../../../shared/models/terceros-relacionados.model";

export interface Otros extends Facturador{
    nombreDescripcion:string;
}

export interface DetalleMercancíaProductoTerminado {
    cantidad: string;
    presentacion: string;
    registroSanitario: string;
}