
import { TablaMercanciasDatos } from "../../../shared/models/datos-solicitud.model";


export interface TablaMercanciasImporticon extends TablaMercanciasDatos {
    cantidadUmtValor?:string;
    cantidadUmcValor?:string;
    marca?:string;
  }