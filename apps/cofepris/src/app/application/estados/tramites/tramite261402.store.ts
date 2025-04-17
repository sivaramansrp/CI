import { Store, StoreConfig } from '@datorama/akita';
//import { Destinatario } from '../../tramites/261402/enums/destinatario.enum';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado de la Solicitud261402.
 * Contiene los datos relacionados con la solicitud, como observaciones, destinatarios y detalles de pago.
 */
export interface Solicitud261402State {
  /**
   * Observaciones relacionadas con la solicitud.
   */
  observaciones: string;

  /**
   * Lista de destinatarios asociados a la solicitud.
   */
  //destinatarioDatos: Destinatario[];

  /**
   * La clave de referencia asociada con la solicitud.
   */
  claveDeReferencia?: string;

  /**
   * La cadena de pago proporcionada por la dependencia.
   */
  cadenaPagoDependencia?: string;

  /**
   * La clave del banco utilizada para el pago.
   */
  bancoClave?: string;

  /**
   * La llave de pago única asociada con la transacción.
   */
  llaveDePago?: string;

  /**
   * La fecha en que se realizó el pago.
   */
  fecPago?: string;

  /**
   * El importe del pago realizado.
   */
  impPago?: string;
}

/**
 * Función para crear el estado inicial de la Solicitud261402.
 * Retorna un objeto con los valores iniciales del estado.
 */
export function createInitialState(): Solicitud261402State {
  return {
    observaciones: '',
    //destinatarioDatos: [],
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    bancoClave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite261402', resettable: true })
export class Tramite261402Store extends Store<Solicitud261402State> {
  /**
   * Crea una instancia de Tramite261402Store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado de la solicitud con los valores proporcionados.
   * Param values Objeto parcial con los valores a actualizar.
   */
  public establecerDatos(values: Partial<Solicitud261402State>): void {
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }

  /**
   * Actualiza la lista de destinatarios en el estado.
   * Param destinatarioDatos Lista de destinatarios a establecer.
   */
  // public setDestinatarioDatos(destinatarioDatos: Destinatario[]): void {
  //   this.update((state) => ({
  //     ...state,
  //     destinatarioDatos,
  //   }));
  // }

  /**
   * Actualiza el estado de la solicitud con los valores proporcionados.
   * Param valores Objeto parcial con los valores a actualizar.
   */
  public actualizarEstado(valores: Partial<Solicitud261402State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}