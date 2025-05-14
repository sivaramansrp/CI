export enum TablaSeleccion {
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  UNDEFINED = 'undefined',
  DROPDOWN = 'DROPDOWN',
  BUTTON = 'BUTTON',
}

export enum TablaCampoSeleccion {
  INPUT = 'INPUT',
  DROPDOWN = 'DROPDOWN',
  CHECKBOX = 'CHECKBOX',
  NONE = 'NONE'
}
/**
 * Enum que representa las acciones que pueden aplicarse a los elementos de una tabla.
 */
export enum TablaAcciones {
   /** Acción no definida */
  UNDEFINED = 'undefined',
  /** Ver los detalles del elemento */
  VER = 'VER',
  /** Editar el elemento */
  EDITAR = 'EDITAR',
    /** Descargar el contenido relacionado con el elemento */
  DESCARGAR = 'DESCARGAR',
   /** Eliminar el elemento */
  ELIMINAR = 'ELIMINAR',
}
