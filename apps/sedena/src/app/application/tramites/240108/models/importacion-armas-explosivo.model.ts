import {
  DestinoFinal,
  Proveedor,
} from '../../../shared/models/terceros-relacionados.model';

export interface TercerosDatos {
  destinarioDatos: DestinoFinal | null | undefined;
  proveedorDatos: Proveedor | null | undefined;
}
