import { Store, StoreConfig } from '@datorama/akita';

import {
  DatosDelEstablecimientoFormState,
  DomicilioDelEstablecimientoFormState,
  ManiFiestosFormState,
  PreOperativeFormState,
  RepresentanteLegalFormState,
} from '../../model/solicitud-permiso.model';
import { Injectable } from '@angular/core';

/**
 * SolicitudPermisoState
 * Representa el estado de la solicitud de permiso en el sistema.
 *
 * @property {string} [claveDeReferencia] La clave de referencia asociada con la solicitud.
 * @property {string} [cadenaPagoDependencia] La cadena de pago proporcionada por la dependencia.
 * @property {string} [bancoClave] La clave del banco utilizada para el pago.
 * @property {string} [llaveDePago] La llave de pago única asociada con la transacción.
 * @property {string} [fecPago] La fecha en que se realizó el pago.
 * @property {string} [impPago] El importe del pago realizado.
 * @property {PreOperativeFormState} preOperativFormState Estado del formulario preoperativo.
 * @property {DatosDelEstablecimientoFormState} datosDelEstablecimientoFormState Estado del formulario de datos del establecimiento.
 * @property {ManiFiestosFormState} manifiestosFormState Estado del formulario de manifiestos.
 * @property {RepresentanteLegalFormState} representanteLegalFormState Estado del formulario del representante legal.
 * @property {DomicilioDelEstablecimientoFormState} domicilloDelEstablecimientoFormState Estado del formulario del domicilio del establecimiento.
 */
export interface SolicitudPermisoState {
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
   * Estado del formulario preoperativo.
   */
  preOperativFormState: PreOperativeFormState;
  /**
   * Estado del formulario de datos del establecimiento.
   */
  datosDelEstablecimientoFormState: DatosDelEstablecimientoFormState;
  /**
   * Estado del formulario de manifiestos.
   */
  manifiestosFormState: ManiFiestosFormState;
  /**
   * Estado del formulario del representante legal.
   */
  representanteLegalFormState: RepresentanteLegalFormState;
  /**
   * Estado del formulario del domicilio del establecimiento.
   */
  domicilloDelEstablecimientoFormState: DomicilioDelEstablecimientoFormState;
}

/**
 * Crea el estado inicial para la interfaz de SolicitudPermisoState.
 * El estado inicial de tipo SolicitudPermisoState.
 *
 * @returns {SolicitudPermisoState} El estado inicial de la solicitud de permiso.
 */
export function createInitialState(): SolicitudPermisoState {
  return {
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
     * Estado del formulario preoperativo.
     */
    preOperativFormState: {
      ideGenerica1: '',
      observaciones: '',
    },
    /**
     * Estado del formulario de datos del establecimiento.
     */
    datosDelEstablecimientoFormState: {
      razonSocial: '',
      correoElectronico: '',
    },
    /**
     * Estado del formulario de manifiestos.
     */
    manifiestosFormState: {
      seleccionadaManifiesto: [false],
      informacionConfidencial: '',
    },
    /**
     * Estado del formulario del representante legal.
     */
    representanteLegalFormState: {
      rfc: '',
      nombreOrazonsocial: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
    },
    /**
     * Estado del formulario del domicilio del establecimiento.
     */
    domicilloDelEstablecimientoFormState: {
      codigoPostal: '',
      estado: '',
      descripcionMunicipio: '',
      informacionExtra: '',
      descripcionColonia: '',
      calle: '',
      lada: '',
      telefono: '',
      funcionamiento: '',
      licencia: '',
      regimen: '',
      aduana: '',
    },
  };
}

/**
 * Clase que representa el estado del trámite 260703.
 * Gestiona y actualiza el estado de la solicitud de permiso en el store.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitudpermisoprocedure', resettable: true })
export class Tramite260703Store extends Store<SolicitudPermisoState> {
  /**
   * Constructor de la clase Tramite260703Store.
   * Inicializa el estado del store con el estado inicial definido.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del formulario preoperativo en el store.
   * @param valores Objeto parcial con los valores a actualizar en el formulario preoperativo.
   */
  actualizarEstadoFormularioPreOperativo(
    valores: Partial<SolicitudPermisoState['preOperativFormState']>
  ): void {
    this.update((state) => ({
      ...state,
      preOperativFormState: {
        ...state.preOperativFormState,
        ...valores,
      },
    }));
  }

  /**
   * Actualiza los datos del formulario del establecimiento en el store.
   * @param valores Objeto parcial con los valores a actualizar en el formulario del establecimiento.
   */
  actualizarDatosDelFormularioDelEstablecimiento(
    valores: Partial<SolicitudPermisoState['datosDelEstablecimientoFormState']>
  ): void {
    this.update((state) => ({
      ...state,
      datosDelEstablecimientoFormState: {
        ...state.datosDelEstablecimientoFormState,
        ...valores,
      },
    }));
  }

  /**
   * Actualiza el estado del formulario del domicilio del establecimiento en el store.
   * @param valores Objeto parcial con los valores a actualizar en el formulario del domicilio.
   */
  actualizarEstadoFormularioDomicilioDelEstablecimiento(
    valores: Partial<
      SolicitudPermisoState['domicilloDelEstablecimientoFormState']
    >
  ): void {
    this.update((state) => ({
      ...state,
      domicilloDelEstablecimientoFormState: {
        ...state.domicilloDelEstablecimientoFormState,
        ...valores,
      },
    }));
  }

  /**
   * Actualiza el estado del formulario de manifiestos en el store.
   * @param valores Objeto parcial con los valores a actualizar en el formulario de manifiestos.
   */
  actualizarEstadoFormularioManifiestos(
    valores: Partial<SolicitudPermisoState['manifiestosFormState']>
  ): void {
    this.update((state) => ({
      ...state,
      manifiestosFormState: {
        ...state.manifiestosFormState,
        ...valores,
      },
    }));
  }

  /**
   * Actualiza el estado del formulario del representante legal en el store.
   * @param valores Objeto parcial con los valores a actualizar en el formulario del representante legal.
   */
  actualizarEstadoFormularioRepresentanteLegal(
    valores: Partial<SolicitudPermisoState['representanteLegalFormState']>
  ): void {
    this.update((state) => ({
      ...state,
      representanteLegalFormState: {
        ...state.representanteLegalFormState,
        ...valores,
      },
    }));
  }

  /**
   * Actualiza el estado completo del store con los valores proporcionados.
   * @param valores Objeto parcial de SolicitudPermisoState con los valores a actualizar.
   */
  public actualizarEstado(valores: Partial<SolicitudPermisoState>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}