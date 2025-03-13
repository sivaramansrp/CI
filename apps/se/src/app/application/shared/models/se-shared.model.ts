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
  