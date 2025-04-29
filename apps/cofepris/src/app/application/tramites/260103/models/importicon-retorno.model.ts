
import { TablaMercanciasDatos } from "../../../shared/models/datos-solicitud.model";
/**
 * Represents the data model for imported goods in a table format.
 * Extends the `TablaMercanciasDatos` interface to include additional properties.
 *
 * @property {string} [cantidadUmtValor] - The value of the quantity in the unit of measurement for transport (UMT).
 * @property {string} [cantidadUmcValor] - The value of the quantity in the unit of measurement for commerce (UMC).
 * @property {string} [marca] - The brand or trademark of the imported goods.
 */
export interface TablaMercanciasImportacion extends TablaMercanciasDatos {
    cantidadUmtValor?:string;
    cantidadUmcValor?:string;
    marca?:string;
  }