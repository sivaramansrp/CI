export interface AccionBoton {
    /**
     * @property {string} accion
     * @description Nombre de la acción asociada al botón.
     */
    accion: string;
  
    /**
     * @property {number} valor
     * @description Valor numérico asociado a la acción del botón.
     */
    valor: number;
  }

  export interface PermisoModel {
    fetchaSolicitud: string;
    fetchaInicial: string;
    fetchaFinal: string;
  }

  export const NICO_TABLA = [
    /**
     * @description
     * Columna que muestra el nombre, denominación o razón social del titular.
     */
    { encabezado: 'Fetcha Solicitud', clave: (item: PermisoModel): string => item.fetchaSolicitud, orden: 1 },
  
    /**
     * @description
     * Columna que muestra el Registro Federal de Contribuyentes (RFC) del titular.
     */
    { encabezado: 'Fetcha inicial', clave: (item: PermisoModel): string => item.fetchaInicial, orden: 2 },
  
    /**
     * @description
     * Columna que muestra la Clave Única de Registro de Población (CURP) del titular.
     */
    { encabezado: 'Fetcha Final', clave: (item: PermisoModel): string => item.fetchaFinal, orden: 3 },
  
]
export const FECHA_DE_PAGO = {
  /**
   * @property {string} labelNombre
   * @description Etiqueta que describe el campo de fecha de pago.
   */
  labelNombre: 'Prórroga al',

  /**
   * @property {boolean} required
   * @description Indica si el campo de fecha de pago es obligatorio.
   */
  required: false,

  /**
   * @property {boolean} habilitado
   * @description Indica si el campo de fecha de pago está habilitado.
   */
  habilitado: true,
};

export const PRORROGA_DEL = {
  /**
   * @property {string} labelNombre
   * @description Etiqueta que describe el campo de fecha de pago.
   */
  labelNombre: 'Prórroga Del',

  /**
   * @property {boolean} required
   * @description Indica si el campo de fecha de pago es obligatorio.
   */
  required: false,

  /**
   * @property {boolean} habilitado
   * @description Indica si el campo de fecha de pago está habilitado.
   */
  habilitado: true,
};
export interface AvisoValor {
  saldoDisponible:number;
  prorrogaDel:number;
  prorrogaAl:number;
}