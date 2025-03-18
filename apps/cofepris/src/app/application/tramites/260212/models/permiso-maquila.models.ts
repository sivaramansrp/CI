export interface solicitudModel {
    fechaCreación:string;
    mercancía:string;
    cantidad:string;
    proveedor:string;
  }

  export interface MercanciaModel {
    clasificaciónProducto:string;
    especificarClasificación:string;
    denominaciónEspecífica:string;
    denominaciónDistintiva:string;
    denominaciónComún:string;
    formaFarmacéutica:string;
    estadoFsico:string;
    }

  export interface ClaveModel {
    clave:string;
    descripcíon:string;
  }

  export interface LosOption {
    label: string;
    value: string;
  }




  // terceros-relacionados



  /**
 * Interfaz que representa los datos de una fila de la tabla.
 * 
 * @interface tableData
 * @description Esta interfaz se utiliza para definir la estructura de los datos que se mostrarán en una fila de la tabla.
 * Cada fila contiene un conjunto de datos representado por un arreglo de cadenas (`string[]`).
 * 
 * @example
 * const fila: tableData = { 
 *   tbodyData: ['dato1', 'dato2', 'dato3']
 * };
 */
export interface tableData {
  /**
   * Datos de la fila representados por un arreglo de cadenas.
   * 
   * @property {string[]} tbodyData - Datos de la fila que se mostrarán en la tabla.
   */
  tbodyData: string[];
}

/**
 * Interfaz que representa los datos de una fila seleccionada de la tabla.
 * 
 * @interface selectedRowData
 * @description Esta interfaz extiende la interfaz `tableData` y agrega un campo adicional para controlar si la fila está seleccionada o no.
 * 
 * @example
 * const filaSeleccionada: selectedRowData = { 
 *   checked: true, 
 *   tbodyData: ['dato1', 'dato2', 'dato3']
 * };
 */
export interface selectedRowData extends tableData {
  /**
   * Indica si la fila está seleccionada o no.
   * 
   * @property {boolean} checked - Estado de selección de la fila.
   */
  checked: boolean;
}