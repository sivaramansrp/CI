import { Store, StoreConfig } from '@datorama/akita';
import { Destinatario } from '../../tramites/261401/enums/destinatario.enum';
import { Injectable } from '@angular/core';
/**
 * Interfaz que representa el estado de la Solicitud261401.
 */
export interface Solicitud261401State {
    observaciones: string;
    destinatarioDatos: Destinatario[];
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
 * Función para crear el estado inicial de la Solicitud261401.
 * @returns {Solicitud261401State} El estado inicial.
 */
export function createInitialState(): Solicitud261401State {
  return {
    observaciones: '',
    destinatarioDatos: [],
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
@StoreConfig({ name: 'tramite261401', resettable: true })
export class Tramite261401Store extends Store<Solicitud261401State> {
  /**
   * Crea una instancia de Tramite261401Store.
   * @constructor
   */
  constructor() {
    super(createInitialState());
  }
  public establecerDatos(values: Partial<Solicitud261401State>): void {
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }
  public setDestinatarioDatos(destinatarioDatos: Destinatario[]): void {
      this.update((state) => ({
        ...state,
        destinatarioDatos,
      }));
    }
    public actualizarEstado(valores: Partial<Solicitud261401State>): void {
      this.update((state) => ({
        ...state,
        ...valores
      }));
    }
}