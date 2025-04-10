export interface AccionBoton {
    accion: string;
    valor: number;
  }

  export const FECHA_DE_PAGO = {
    labelNombre: 'Fecha de pago',
    required: false,
    habilitado: true,
  };

  export interface PreOperativo {
    /**
     * Etiqueta que describe la opción preoperativa.
     */
    label: string;
  
    /**
     * Valor asociado a la opción preoperativa.
     */
    value: string;
  }
  