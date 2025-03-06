import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TableBodyData } from '@libs/shared/data-access-user/src';
import { TableData } from '@libs/shared/data-access-user/src';

/**
 * Crea el estado inicial de la tabla de pagos de línea de captura.
 * 
 * @returns {TableData} El estado inicial con encabezados predefinidos y un cuerpo vacío.
 */
export function createInitialState(): TableData {
  return {
    tableHeader: ['Linea de captura', 'Monto'],
    tableBody: [] as TableBodyData[],
  };
}

/**
 * Store que administra los pagos de la línea de captura.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'PagoLineaDeCaptureStore', resettable: true })
export class PagoLineaDeCaptureStore extends Store<TableData> {
  /**
   * Constructor del store de pagos de línea de captura.
   * Inicializa el estado con valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Agrega un nuevo pago de tarifas a la tabla de pagos.
   * 
   * @param {string} lineaCaptura - La línea de captura asociada al pago.
   * @param {string} valorPago - El monto del pago.
   * @example
   * agregarPagoDeTarifas('123456789', '100.00');
   * // Se agrega un pago con línea de captura '123456789' y monto '100.00'.
   */
  agregarPagoDeTarifas(lineaCaptura: string, valorPago: string): void {
    this.update((state) => ({
      ...state,
      tableBody: [...state.tableBody, { tbodyData: [lineaCaptura, valorPago] }],
    }));
  }

  /**
   * Restablece el estado del store a su estado inicial.
   * 
   * @example
   * resetStore();
   * // El estado de la tienda vuelve a los valores predeterminados.
   */
  resetStore(): void {
    this.reset();
  }
}
