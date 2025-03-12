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
  