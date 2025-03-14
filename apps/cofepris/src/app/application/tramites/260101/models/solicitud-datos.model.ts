import { TableData } from '@libs/shared/data-access-user/src';

export interface SolicitudDatos {
  fechaCreacion: string;
  mercancia: string;
  cantidad: string;
  proovedor: string;
  SCIANLista: TableData;
  mercancias?: TableData;
}

export interface DatosDeSolicitud {
  tablaHeadData: string[];
  tablaFilaDatos: SolicitudDatos[];
}
