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
export interface TablaOpcionConfig {
  fechaCreacion: string;
  mercancia: string;
  cantidad: string;
  proveedor: string;
}

export interface OpcionConfig<T> {
  tipoSeleccionTabla: TablaSeleccion | undefined;
  configuracionTabla: ConfiguracionColumna<T>[];
  datos: T[];
}
export interface ScianConfig<T> {
    tipoSeleccionTabla: TablaSeleccion;
    configuracionTabla: ConfiguracionColumna<T>[];
    datos: T[];
}

export interface TablaMercanciasConfig<T> {
    tipoSeleccionTabla: TablaSeleccion;
    configuracionTabla: ConfiguracionColumna<T>[];
    datos: T[];
}

export enum TablaSeleccion {
    CHECKBOX = 'CHECKBOX',
    RADIO = 'RADIO',
    UNDEFINED = 'undefined',
  }

  export interface TablaMercanciasDatos {
    clasificacionProducto: string;
    especificarClasificacionProducto: string;
    denominacionEspecificaProducto: string;
    denominacionDistintiva: string;
    denominacionComun: string;
    formaFarmaceutica: string;
    estadoFisico: string;
    fraccionArancelaria: string;
    descripcionFraccion: string;
    unidadMedidaComercializacion: string;
    cantidadUMC: string;
    unidadMedidaTarifa: string;
    cantidadUMT: string;
    presentacion: string;
    numeroRegistroSanitario: string;
    paisOrigen: string;
    paisProcedencia: string;
    tipoProducto: string;
    usoEspecifico: string;
  }

  export interface DatosDeTablaSeleccionados {
    scianSeleccionados: TablaScianConfig[];
    mercanciasSeleccionados: TablaMercanciasDatos[];
    opcionSeleccionados: TablaOpcionConfig[];
  }

  /**
 * Interfaz que representa las etiquetas de la lista cruzada.
 * 
 * @property {string} tituluDeLaIzquierda - El título de la izquierda.
 * @property {string} derecha - El valor de la derecha.
 */
export interface CrossListLable {
    tituluDeLaIzquierda: string;
    derecha: string;
  }