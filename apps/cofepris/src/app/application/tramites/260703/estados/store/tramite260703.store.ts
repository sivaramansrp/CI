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
 * {string} [claveDeReferencia] - La clave de referencia asociada con la solicitud.
 * {string} [cadenaPagoDependencia] - La cadena de pago proporcionada por la dependencia.
 * {string} [bancoClave] - La clave del banco utilizada para el pago.
 * {string} [llaveDePago] - La llave de pago única asociada con la transacción.
 * {string} [fecPago] - La fecha en que se realizó el pago.
 * {string} [impPago] - El importe del pago realizado.
 * {PreOperativeFormState} preOperativFormState - Estado del formulario preoperativo.
 * {DatosDelEstablecimientoFormState} datosDelEstablecimientoFormState - Estado del formulario de datos del establecimiento.
 * {ManiFiestosFormState} manifiestosFormState - Estado del formulario de manifiestos.
 * {RepresentanteLegalFormState} representanteLegalFormState - Estado del formulario del representante legal.
 * {DomicilioDelEstablecimientoFormState} domicilloDelEstablecimientoFormState - Estado del formulario del domicilio del establecimiento.
 */
export interface SolicitudPermisoState {
  claveDeReferencia?: string;
  cadenaPagoDependencia?: string;
  bancoClave?: string;
  llaveDePago?: string;
  fecPago?: string;
  impPago?: string;
  preOperativFormState: PreOperativeFormState;
  datosDelEstablecimientoFormState: DatosDelEstablecimientoFormState;
  manifiestosFormState: ManiFiestosFormState;
  representanteLegalFormState: RepresentanteLegalFormState;
  domicilloDelEstablecimientoFormState: DomicilioDelEstablecimientoFormState;
}

/**
 * Crea el estado inicial para la interfaz de SolicitudPermisoState.
 * El estado inicial de tipo SolicitudPermisoState.
 */
export function createInitialState(): SolicitudPermisoState {
  return {
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    bancoClave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
    preOperativFormState: {
      ideGenerica1: '',
      observaciones: '',
    },
    datosDelEstablecimientoFormState: {
      razonSocial: '',
      correoElectronico: '',
    },
    manifiestosFormState: {
      seleccionadaManifiesto: [false],
      informacionConfidencial: '',
    },
    representanteLegalFormState: {
      rfc: '',
      nombreOrazonsocial: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
    },
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
   * valores Objeto parcial con los valores a actualizar en el formulario preoperativo.
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
   * valores Objeto parcial con los valores a actualizar en el formulario del establecimiento.
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
   * valores Objeto parcial con los valores a actualizar en el formulario del domicilio.
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
   * valores Objeto parcial con los valores a actualizar en el formulario de manifiestos.
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
   * valores Objeto parcial con los valores a actualizar en el formulario del representante legal.
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
   * valores Objeto parcial de SolicitudPermisoState con los valores a actualizar.
   */
  public actualizarEstado(valores: Partial<SolicitudPermisoState>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}
