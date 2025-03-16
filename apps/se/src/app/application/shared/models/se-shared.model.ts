import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';



export interface Anexo1y3Configuartion<T> {
    anexoDosTablaSeleccionCheckbox: TablaSeleccion,
    anexoDosEncabezadoDeTabla: ConfiguracionColumna<T>[],
    anexoTresTablaSeleccionCheckbox: TablaSeleccion,
    anexoTresEncabezadoDeTabla: ConfiguracionColumna<T>[],
  }

  export interface AnexoEncabezado {
    ENCABEZADO_FRACCION: string;
    ENCABEZADO_DESCRIPCION: string;
    estatus: boolean;
  }

  export interface AnexoUnoConfiguartion<T> {
    anexoUnoTablaSeleccionRadio: TablaSeleccion,
    anexoUnoEncabezadoDeTabla: ConfiguracionColumna<T>[],
  }
  export interface AnexoImportacionConfiguartion<T> {
    anexoDosTablaSeleccionRadio: TablaSeleccion,
    anexoDosEncabezadoDeTabla: ConfiguracionColumna<T>[],
  }

  export interface AnexoUnoEncabezado {
    ENCABEZADO_FRACCION: string;
    ENCABEZADO_FRACCION_ARANCELARIA: string;
    ENCABEZADO_DESCRIPCION_COMERCIAL : string;
    ENCABEZADO_ANEXO_II : string;
    ENCABEZADO_TIPO : string;
    ENCABEZADO_UMT : string;
    ENCABEZADO_CATEGORIA : string;
    ENCABEZADO_VALOR_EN_MERCADO : string;
    estatus: boolean;
  }
  
  export interface AnexoImportacionEncabezado {
    ENCABEZADO_FRACCION: string;
    ENCABEZADO_FRACCION_EXPORTACION : string;
    ENCABEZADO_DESCRIPCION_COMERCIAL : string;
    ENCABEZADO_FRACCION_IMPORTACION : string;
    estatus: boolean;
  }

  export interface Catalogo {
    id: number;
    descripcion: string;
    clave?: string;
    tam?: string;
    dpi?: string
  }

  export interface ComplimentarFraccion {
    fraccionArancelaria: string,
    anexoDos: string,
    tipo: string,
    umt: string,
    catagoria: string;
    descripcion: string;
    monedaNacionalMensual: number;
    monedaNacionalDeDosPeriodos: number;
    volumenMensual: number;
    twoPeriodVolume: number;
  }

  export interface ComplimentarFraccionResoponse {
    catagoria: string;
    descripcion: string;
    monedaNacionalMensual: number;
    monedaNacionalDeDosPeriodos: number;
    volumenMensual: number;
    twoPeriodVolume: number;
  }

  export interface RutaNombre {
    catagoria: string;
    id: string
  }

