import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

/**
 * Representa un catálogo con información básica.
 * 
 * @property id - Identificador único del catálogo.
 * @property descripcion - Descripción del catálogo.
 * @property clave - (Opcional) Clave asociada al catálogo.
 * @property tam - (Opcional) Tamaño relacionado con el catálogo.
 * @property dpi - (Opcional) DPI asociado al catálogo.
 */
export interface Catalogo {
    id: number;
    descripcion: string;
    clave?: string;
    tam?: string;
    dpi?: string
}

export interface RespuestaCatalogos {
    code: number;
    data: Catalogo[]
    message: string;
}

export interface TablaScianConfig {
clave: string;
descripcion: string;
}

export interface ScianConfig<T> {
    tipoSeleccionTabla: TablaSeleccion;
    configuracionTabla: ConfiguracionColumna<T>[];
    datos: T[];
}

export enum TablaSeleccion {
    CHECKBOX = 'CHECKBOX',
    RADIO = 'RADIO',
    UNDEFINED = 'undefined',
  }