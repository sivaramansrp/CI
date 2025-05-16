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
 * Este archivo contiene la definición de la clase `Tramite260104Store`, que extiende la funcionalidad
 * de la clase `Store` para gestionar el estado de un trámite específico en la aplicación.
 * 
 * Proporciona métodos para actualizar y modificar diferentes partes del estado, como listas de fabricantes,
 * destinatarios finales y el estado del formulario de pago de derechos. También incluye métodos para eliminar
 * elementos específicos de las listas en el estado.
 * 
 * @remarks
 * La clase utiliza decoradores de Angular y Akita para configurar el store y definir su comportamiento.
 */
@Injectable({
  providedIn: 'root',
})


@StoreConfig({ name: 'Tramite260104', resettable: true })

export class Tramite260104Store extends Store<Tramite260104State> {
  
  
  /**
   * Constructor de la clase `Tramite260104Store`.
   * 
   * Inicializa el estado del store utilizando el estado inicial definido
   * mediante la función `createInitialState`.
   */
  constructor() {
    // Inicializa el estado del store con el estado inicial definido.
    super(createInitialState());
  }

  
  /**
   * Actualiza la lista de fabricantes en la tabla de datos del estado.
   * 
   * @param newFabricantes - Un arreglo de objetos de tipo `Fabricante` que se agregarán
   *                         a la lista existente de `fabricanteTablaDatos`.
   */
  public updateFabricanteTablaDatos(newFabricantes: Fabricante[]): void {
    this.update((state) => ({
      ...state,
      fabricanteTablaDatos: [...state.fabricanteTablaDatos, ...newFabricantes],
    }));
  }

 
  /**
   * Actualiza la lista de destinatarios finales en la tabla de datos.
   * 
   * Este método agrega nuevos destinatarios a la lista existente de 
   * `destinatarioFinalTablaDatos` en el estado actual de la tienda.
   * 
   * @param newDestinatarios - Un arreglo de objetos `Destinatario` que 
   * se agregarán a la lista existente de destinatarios finales.
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
   * Actualiza el estado de `pagoDerechos` con un nuevo valor proporcionado.
   *
   * @param nuevoPagoDerechos - El nuevo estado del formulario de pago de derechos 
   * que se utilizará para actualizar el estado actual.
   */
  public updatePagoDerechos(nuevoPagoDerechos: PagoDerechosFormState): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: nuevoPagoDerechos,
    }));
  }

 
  /**
   * Modifica la lista de destinatarios finales en la tabla de datos.
   *
   * @param Destinatarios - Un arreglo de objetos de tipo `Destinatario` que representa
   * los destinatarios finales que se establecerán en el estado.
   */
  public modifyDestinatarioFinalTablaDatos(Destinatarios: Destinatario[]): void {
    this.update((state) => ({
      ...state,
      destinatarioFinalTablaDatos: Destinatarios,
    }));
  }

  /**
   * Elimina un destinatario específico de la lista `destinatarioFinalTablaDatos` en el estado.
   *
   * @param destino - El objeto `Destinatario` que se desea eliminar de la lista.
   *
   * El método busca el índice del destinatario en la lista comparando todas las propiedades
   * del objeto proporcionado con los elementos existentes. Si encuentra una coincidencia,
   * elimina el destinatario de la lista y actualiza el estado con una nueva referencia
   * para garantizar la reactividad.
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
   * Elimina un fabricante de la lista `fabricanteTablaDatos` en el estado del store.
   * 
   * @param fabricante - El objeto `Fabricante` que se desea eliminar. 
   *                     Se compara cada propiedad del objeto para encontrar una coincidencia exacta en la lista.
   * 
   * @remarks
   * Si se encuentra un fabricante que coincide con todas las propiedades del objeto proporcionado,
   * se elimina de la lista `fabricanteTablaDatos`. Posteriormente, se actualiza el estado con una nueva
   * referencia de la lista para garantizar la reactividad.
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


