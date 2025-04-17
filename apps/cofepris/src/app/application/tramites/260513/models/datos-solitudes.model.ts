/**
 * Interfaz que define la configuración de visibilidad para diferentes atributos relacionados con países.
 * 
 * @property {boolean} paisOrigen - Indica si el país de origen es visible.
 * @property {boolean} paisFabrica - Indica si el país de fabricación es visible.
 * @property {boolean} paisElaboracion - Indica si el país de elaboración es visible.
 * @property {boolean} paisProveedor - Indica si el país del proveedor es visible.
 * @property {boolean} paisProcedencia - Indica si el país de procedencia es visible.
 */
export interface ConfiguracionVisibilidad {
    paisOrigen: boolean;
    paisFabrica: boolean;
    paisElaboracion: boolean;
    paisProveedor: boolean;
    paisProcedencia: boolean;
  }