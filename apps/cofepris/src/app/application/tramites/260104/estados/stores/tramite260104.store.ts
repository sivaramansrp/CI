import { Store,StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

import { Destinatario,Fabricante } from '../../models/terceros-relacionados-destino.model';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';


/**
 * Representa el estado de la tienda para el trámite 260104.
 */
export interface Tramite260104State {
  /**
   * Lista de destinatarios finales en la tabla de datos.
   */
  destinatarioFinalTablaDatos: Destinatario[];

  /**
   * Lista de fabricantes en la tabla de datos.
   */
  fabricanteTablaDatos: Fabricante[];

  /**
   * Información del formulario de pago de derechos.
   */
  pagoDerechos: PagoDerechosFormState;
}

/**
 * Crea el estado inicial para el trámite 260104.
 * 
 * @returns {Tramite260104State} El estado inicial del trámite, que incluye:
 * - `destinatarioFinalTablaDatos`: Un arreglo vacío para los datos de destinatarios finales.
 * - `fabricanteTablaDatos`: Un arreglo vacío para los datos de fabricantes.
 * - `pagoDerechos`: Un objeto que contiene información relacionada con el pago de derechos, incluyendo:
 *   - `claveReferencia`: Clave de referencia del pago (cadena vacía por defecto).
 *   - `cadenaDependencia`: Cadena de dependencia asociada al pago (cadena vacía por defecto).
 *   - `estado`: Estado del pago (cadena vacía por defecto).
 *   - `llavePago`: Llave única del pago (cadena vacía por defecto).
 *   - `fechaPago`: Fecha en la que se realizó el pago (cadena vacía por defecto).
 *   - `importePago`: Importe del pago (cadena vacía por defecto).
 */
export function createInitialState(): Tramite260104State {
  return {
    destinatarioFinalTablaDatos: [],
    fabricanteTablaDatos: [],
    pagoDerechos: {
      claveReferencia: '',
      cadenaDependencia: '',
      estado: '',
      llavePago: '',
      fechaPago: '',
      importePago: '',
    },
  };
}




/**
 * @fileoverview
 * Este archivo contiene la definición del store `Tramite260104Store` para gestionar el estado
 * relacionado con el trámite 260104. Proporciona métodos para actualizar y modificar
 * diferentes partes del estado, como fabricantes, destinatarios finales y pagos de derechos.
 */
@Injectable({
  providedIn: 'root',
})

// Configuración del store con el nombre 'Tramite260104' y habilitando la opción de reinicio.
@StoreConfig({ name: 'Tramite260104', resettable: true })

export class Tramite260104Store extends Store<Tramite260104State> {
  constructor() {
    // Inicializa el estado del store con el estado inicial definido.
    super(createInitialState());
  }

  /**
   * Actualiza la lista de fabricantes en la tabla de datos agregando nuevos fabricantes.
   * @param newFabricantes - Lista de nuevos fabricantes a agregar.
   */
  public updateFabricanteTablaDatos(newFabricantes: Fabricante[]): void {
    this.update((state) => ({
      ...state,
      fabricanteTablaDatos: [...state.fabricanteTablaDatos, ...newFabricantes],
    }));
  }

  /**
   * Actualiza la lista de destinatarios finales en la tabla de datos agregando nuevos destinatarios.
   * @param newDestinatarios - Lista de nuevos destinatarios a agregar.
   */
  public updateDestinatarioFinalTablaDatos(
    newDestinatarios: Destinatario[]
  ): void {
    this.update((state) => ({
      ...state,
      destinatarioFinalTablaDatos: [
        ...state.destinatarioFinalTablaDatos,
        ...newDestinatarios,
      ],
    }));
  }

  /**
   * Actualiza la información del formulario de pago de derechos.
   * @param nuevoPagoDerechos - Nueva información del pago de derechos.
   */
  public updatePagoDerechos(nuevoPagoDerechos: PagoDerechosFormState): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: nuevoPagoDerechos,
    }));
  }

  /**
   * Modifica la lista completa de destinatarios finales en la tabla de datos.
   * @param Destinatarios - Nueva lista de destinatarios finales.
   */
  public modifyDestinatarioFinalTablaDatos(Destinatarios: Destinatario[]): void {
    this.update((state) => ({
      ...state,
      destinatarioFinalTablaDatos: Destinatarios,
    }));
  }
/**
   * @method eliminarDestino
   * @description Elimina un destinatario específico de la lista `destinatarioFinalTablaDatos` en el estado de la tienda.
   * 
   * @param {Destinatario} destino - El destinatario que se desea eliminar de la lista. 
   * Se compara cada propiedad del objeto `destino` con los elementos de la lista para encontrar una coincidencia exacta.
   * 
   * @returns {void}
   * 
   * @example
   * const destinatario: Destinatario = { id: 1, nombre: 'Juan Pérez' };
   * tramite260104Store.eliminarDestino(destinatario);
   * 
   * @remarks
   * Si no se encuentra el destinatario en la lista, no se realiza ninguna modificación.
   *
   */
  
  eliminarDestino(destino: Destinatario): void {
    this.update((state) => {
      const INDICE_BORROR = state.destinatarioFinalTablaDatos.findIndex((ele) =>
        Object.entries(destino).every(([key, value]) => ele[key as keyof Destinatario] === value)
      );

      if (INDICE_BORROR !== -1) {
        state.destinatarioFinalTablaDatos.splice(INDICE_BORROR, 1);
      }

      return {
        ...state,
        destinatarioFinalTablaDatos: [...state.destinatarioFinalTablaDatos],
      };
    });
  }

  
  /**
   * @method eliminarFabricante
   * @description Elimina un fabricante específico de la lista `fabricanteTablaDatos` en el estado de la tienda.
   * 
   * @param {Fabricante} fabricante - El objeto fabricante que se desea eliminar de la lista.
   * 
   * @example
   * const fabricanteAEliminar = { id: 1, nombre: 'Fabricante A' };
   * tramite260104Store.eliminarFabricante(fabricanteAEliminar);
   * 
   * @remarks
   * Este método busca el índice del fabricante en la lista `fabricanteTablaDatos` comparando todas las propiedades
   * del objeto `fabricante` proporcionado. Si encuentra una coincidencia, elimina el fabricante de la lista.
   * 
   * @returns {void}
   */
  eliminarFabricante(fabricante: Fabricante): void {
    this.update((state) => {
      const INDICE_BORROR = state.fabricanteTablaDatos.findIndex((ele) =>
        Object.entries(fabricante).every(([key, value]) => ele[key as keyof Fabricante] === value)
      );

      if (INDICE_BORROR !== -1) {
        state.fabricanteTablaDatos.splice(INDICE_BORROR, 1);
      }

      return {
        ...state,
        fabricanteTablaDatos: [...state.fabricanteTablaDatos],
      };
    });
  }
}


