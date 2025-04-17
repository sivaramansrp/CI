import { ConfiguracionVisibilidad } from "../models/datos-solitudes.model";

/**
 * Configuración predeterminada de visibilidad para los datos de solicitud.
 * 
 * Esta constante define qué campos relacionados con los países son visibles
 * o no en la configuración inicial de la solicitud.
 * 
 * @property paisOrigen - Indica si el país de origen es visible (true) o no (false).
 * @property paisFabrica - Indica si el país de la fábrica es visible (true) o no (false).
 * @property paisElaboracion - Indica si el país de elaboración es visible (true) o no (false).
 * @property paisProveedor - Indica si el país del proveedor es visible (true) o no (false).
 * @property paisProcedencia - Indica si el país de procedencia es visible (true) o no (false).
 */
export const DEFAULT_CONFIGURACION_VISIBILIDAD: ConfiguracionVisibilidad = {
  paisOrigen: true,
  paisFabrica: false,
  paisElaboracion: false,
  paisProveedor: false,
  paisProcedencia: true
};