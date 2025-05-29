import { Store, StoreConfig } from '@datorama/akita';
import { Destinatario } from '../../tramites/261401/enums/destinatario.enum';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado de la Solicitud261401.
 * Contiene los datos relacionados con la solicitud, como observaciones, destinatarios y detalles de pago.
 */
export interface Solicitud261401State {
  /**
   * Observaciones relacionadas con la solicitud.
   */
  observaciones: string;

  /**
   * Lista de destinatarios asociados a la solicitud.
   */
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

  /**
 * Tipo de persona (física o moral) asociada a la solicitud.
 * Puede ser 'fisica' o 'moral'.
 */
  tipoPersona: string;
  /**
 * Nombre(s) de la persona física destinataria.
 */
  nombre: string;

  /**
 * Primer apellido de la persona física destinataria.
 */
  primerApellido: string;

  /** Segundo apellido de la persona */
  segundoApellido: string;

  /** País de residencia */
  pais: string;

  /** Domicilio de la persona o entidad */
  domicilio: string;

  /** Número exterior del domicilio */
  numeroExterior: string;

  /** Número interior del domicilio */
  numeroInterior: string;

  /** Correo electrónico de contacto */
  correoElectronico: string;
    /**
   * Estado o provincia de residencia.
   */
  estado: string;
    /**
   * Código postal o equivalente del domicilio.
   */
  codigopostal: string;
    /**
   * Calle del domicilio.
   */
  calle: string;
    /**
   * Lada telefónica nacional o internacional.
   */
  lada: number;
  /**
   * Número de teléfono de contacto.
   */
  telefono: string;
    /**
   * Denominación o razón social de la persona moral.
   */
  denominacion: string;
}

/**
 * Función para crear el estado inicial de la Solicitud261401.
 * Retorna un objeto con los valores iniciales del estado.
 */
export function createInitialState(): Solicitud261401State {
  return {
          /**
         * Observaciones relacionadas con la solicitud.
         */
        observaciones: '',

        /**
         * Lista de destinatarios asociados a la solicitud.
         */
        destinatarioDatos: [],

        /**
         * La clave de referencia asociada con la solicitud.
         */
        claveDeReferencia: '',

        /**
         * La cadena de pago proporcionada por la dependencia.
         */
        cadenaPagoDependencia: '',

        /**
         * La clave del banco utilizada para el pago.
         */
        bancoClave: '',

        /**
         * La llave de pago única asociada con la transacción.
         */
        llaveDePago: '',

        /**
         * La fecha en que se realizó el pago.
         */
        fecPago: '',

        /**
         * El importe del pago realizado.
         */
        impPago: '',

        /**
         * Tipo de persona (física o moral) asociada a la solicitud.
         * Puede ser 'fisica' o 'moral'.
         */
        tipoPersona: '',

        /**
         * Nombre(s) de la persona física destinataria.
         */
        nombre: '',

        /**
         * Primer apellido de la persona física destinataria.
         */
        primerApellido: '',

        /**
         * Segundo apellido de la persona.
         */
        segundoApellido: '',

        /**
         * País de residencia.
         */
        pais: '',

        /**
         * Domicilio de la persona o entidad.
         */
        domicilio: '',

        /**
         * Número exterior del domicilio.
         */
        numeroExterior: '',

        /**
         * Número interior del domicilio.
         */
        numeroInterior: '',

        /**
         * Correo electrónico de contacto.
         */
        correoElectronico: '',

        /**
         * Estado o provincia de residencia.
         */
        estado: '',

        /**
         * Código postal o equivalente del domicilio.
         */
        codigopostal: '',

        /**
         * Calle del domicilio.
         */
        calle: '',

        /**
         * Lada telefónica nacional o internacional.
         */
        lada: 0,

        /**
         * Número de teléfono de contacto.
         */
        telefono: '',

        /**
         * Denominación o razón social de la persona moral.
         */
        denominacion: '',
    };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite261401', resettable: true })
export class Tramite261401Store extends Store<Solicitud261401State> {
  /**
   * Crea una instancia de Tramite261401Store.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la lista de destinatarios en el estado.
   * Param destinatarioDatos Lista de destinatarios a establecer.
   */
  public setDestinatarioDatos(destinatarioDatos: Destinatario[]): void {
    this.update((state) => ({
      ...state,
      destinatarioDatos,
    }));
  }

  /**
   * Actualiza el estado de la solicitud con los valores proporcionados.
   * Param valores Objeto parcial con los valores a actualizar.
   */
  public actualizarEstado(valores: Partial<Solicitud261401State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}